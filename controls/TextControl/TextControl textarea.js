TextControl.prototype.initTextarea = function()
{
    this.textarea                = createTextarea('textControlTextarea');

    this.textarea.control        = this;
    this.textarea.defPlaceholder = ' . . .';
    this.textarea.placeholder    = this.textarea.defPlaceholder;

    this.textarea.style.height   = defParamHeight;

    this.textarea.savedValue     = this.textarea.value;

    //this.textarea.managing     = false; // undoing or redoing



    this.textarea.addEventListener('pointerdown', e =>
    {
        if (this.param.node.div.style.zIndex < graphView.getTopNodeIndex())
            graphView.putNodeOnTop(this.param.node);


        if (e.button == 1)
        {
            e.preventDefault();
            return;
        }

        e.stopPropagation();
    });
    
    
    
    this.textarea.addEventListener('pointerup', e =>
    {
        e.stopPropagation();

        if (e.button == 2)
        {
            initTextMenu(this.textarea);
            menuText.showAt(e.clientX, e.clientY, false);
        }
    });



    this.textarea.addEventListener('pointermove', e =>
    {
        e.stopPropagation();
    });



    this.textarea.addEventListener('keydown', e =>
    {
        e.stopPropagation();


        if (   e.code == 'KeyX'
            && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand('copy');
            clearSelectedText(this.textarea);
        }

        else if (   e.code == 'KeyC'
            && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand('copy');
        }

        else if (e.code == 'KeyV'
              && getCtrlKey(e)
              && !this.readOnly)
        {
            // let the OS do its thing here
        }
        
        else if (   (      e.code == 'Enter'
                        && getCtrlKey(e)
                     || e.code == 'NumpadEnter')
                 && !this.readOnly)
        {
            this.textarea.keyBlur = true;
            this.textarea.finish(true);
        }

        else if (e.code == 'Escape')
        {
            this.textarea.keyBlur = true;
            this.textarea.finish(true);
        }

        else if (e.code == 'Tab')
        {
            e.preventDefault();
        }

        else if (e.code == 'KeyZ'
              && getCtrlKey(e))
        {
                 if (e.shiftKey && !actionManager.redoing) actionManager.redo();
            else if (              !actionManager.undoing) actionManager.undo();
        }
    });



    this.textarea.addEventListener('input', e =>
    {
        //console.log('this.textarea.managing =', this.textarea.managing);
        this.setValue(
            this.textarea.value, 
            true, //!this.textarea.managing, 
            true);

        //this.textarea.managing = false;

        // if (this.param) this.param.changing = true;
        // if (this.confirmTimer) clearTimeout(this.confirmTimer);
        // this.confirmTimer = setTimeout(() => controlTimer_confirm(this), 400);
    });



    this.textarea.addEventListener('paste', e =>
    {
        e.preventDefault();

        const value = e.clipboardData.getData('text/plain');

        this.textarea.value = 
              this.textarea.value.substring(0, this.textarea.selectionStart)
            + value
            + this.textarea.value.substring(this.textarea.selectionEnd);
    });



    
    this.textarea.addEventListener('focusout', () =>
    {
        if (this.textarea.keyBlur)
            this.textarea.keyBlur = false;


        if (this.savedSuccessOnFocusOut != null)
        {
            this.successOnFocusOut      = this.savedSuccessOnFocusOut;
            this.savedSuccessOnFocusOut = null;
        }


        this.textarea.blur();
        this.clicked = false;
    });
    


    this.textarea.addEventListener('wheel', e =>
    {
        if (this.view.wheelTimer)
            e.preventDefault();

        e.stopPropagation();
        forwardEvent(e, this.div);
    });
    


    this.textarea.finish = (success, focusControl = true) =>
    {
        let   value      = this.textarea.value;
        const savedValue = this.textarea.savedValue;

        value = value.replace(this.suffix, '');


        const e = new CustomEvent('finishedit', { 'detail': {
            'success':         success,
            'value':           value     .replace(this.suffix, ''),
            'oldValue':        savedValue.replace(this.suffix, ''),
            'preventSetValue': false }});

        this.dispatchEvent(e);


        if (!e.preventSetValue)
        {
            if (success) 
            {
                this.setValue(
                    value != NAN_CHAR
                    ? value 
                    : savedValue);
            }
            else
                this.setValue(savedVal);
        }
         
        
        this.textarea.blur();


        if (   this.inFocus
            && focusControl)
            this.div.focus();
    };    
};



TextControl.prototype.showTextarea = function()
{
    this.inFocus = 
           hasFocus(this.div)
        && !this.clicked;

        
    this.focus.style.visibility = 'hidden';
    this.focus.style.opacity    = 0;


    this.textarea.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand)';
    this.textarea.style.outline   = 'none';


    this.updateTextarea();

    
    this.textarea.focus();
    this.textarea.select();
};



TextControl.prototype.updateTextarea = function()
{
    this.textarea.value      = this.value;
    this.textarea.savedValue = this.value;
};
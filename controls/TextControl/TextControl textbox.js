TextControl.prototype.initTextarea = function()
{
    this.textbox                = createTextarea('textControlTextarea');

    this.textbox.control        = this;
    this.textbox.defPlaceholder = ' . . .';
    this.textbox.placeholder    = this.textbox.defPlaceholder;

    this.textbox.style.height   = defParamHeight;

    this.textbox.savedValue     = this.textbox.value;

    //this.textbox.managing     = false; // undoing or redoing



    this.textbox.addEventListener('pointerdown', e =>
    {
        if (this.param.node.div.style.zIndex < graphView.getTopNodeIndex())
            graphView.putNodeOnTop(this.param.node);


        if (!this.canReact(e))
            return;


        //this.textbox.setPointerCapture(e.pointerId);


        if (e.button == 1)
        {
            e.preventDefault();
            return;
        }

        e.stopPropagation();
    });
    
    
    
    this.textbox.addEventListener('pointermove', e =>
    {
        e.stopPropagation();
    });



    this.textbox.addEventListener('pointerup', e =>
    {
        e.stopPropagation();


        if (e.button == 2)
        {
            initTextboxMenu(this.textbox);
            menuTextbox.showAt(e.clientX, e.clientY, false, false);
        }


        //if (this.textbox.hasPointerCapture(e.pointerId))
        //    this.textbox.releasePointerCapture(e.pointerId);
    });



    this.textbox.addEventListener('keydown', e =>
    {
        e.stopPropagation();


        if (   e.code == 'KeyX'
            && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand('copy');
            clearSelectedText(this.textbox);

            this.setValue(this.textbox.value, true);
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
            this.textbox.keyBlur = true;
            this.textbox.finish(true);
        }

        else if (e.code == 'Escape')
        {
            this.textbox.keyBlur = true;
            this.textbox.finish(true);
        }

        else if (e.code == 'Tab')
        {
            e.preventDefault();
        }

        else if (e.code == 'KeyZ'
              && getCtrlKey(e))
        {
            //      if (e.shiftKey && !actionManager.redoing) actionManager.redo();
            // else if (              !actionManager.undoing) actionManager.undo();
        }
    });



    this.textbox.addEventListener('input', e =>
    {
        //console.log('this.textbox.managing =', this.textbox.managing);
        this.setValue(
            this.textbox.value, 
            true, //!this.textbox.managing, 
            true);

        //this.textbox.managing = false;

        // if (this.param) this.param.changing = true;
        // if (this.confirmTimer) clearTimeout(this.confirmTimer);
        // this.confirmTimer = setTimeout(() => controlTimer_confirm(this), 400);
    });



    this.textbox.addEventListener('paste', e =>
    {
        e.preventDefault();

        const value = e.clipboardData.getData('text/plain');

        this.textbox.value = 
              this.textbox.value.substring(0, this.textbox.selectionStart)
            + value
            + this.textbox.value.substring(this.textbox.selectionEnd);

        this.setValue(
            this.textbox.value, 
            true, //!this.textbox.managing, 
            true);
    });



    
    this.textbox.addEventListener('focus', () =>
    {
        hideAllMenus();

        if (currentTooltip) 
            hideTooltip(currentTooltip);
    });
    


    this.textbox.addEventListener('focusout', () =>
    {
        if (this.textbox.keyBlur)
            this.textbox.keyBlur = false;


        if (this.savedSuccessOnFocusOut != null)
        {
            this.successOnFocusOut      = this.savedSuccessOnFocusOut;
            this.savedSuccessOnFocusOut = null;
        }


        this.textbox.blur();
        this.clicked = false;
    });
    


    this.textbox.addEventListener('wheel', e =>
    {
        if (this.view.wheelTimer)
            e.preventDefault();

        e.stopPropagation();
        forwardEvent(e, this.div);

        this.updateCursor();
    });
    


    this.textbox.finish = (success, focusControl = true) =>
    {
        let   value      = this.textbox.value;
        const savedValue = this.textbox.savedValue;

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
         
        
        this.textbox.blur();


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


    this.textbox.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand)';
    this.textbox.style.outline   = 'none';


    this.updateTextarea();

    
    this.textbox.focus();
    this.textbox.select();
};



TextControl.prototype.updateTextarea = function()
{
    this.textbox.value      = this.value;
    this.textbox.savedValue = this.value;
};



TextControl.prototype.getTextAlignment = function()
{
    const style = getComputedStyle(this.textbox);

    switch (style.textAlign)
    {
    case '': 
    case 'start': 
    case 'left':    return 'left';
    case 'center':  return 'center';
    case 'right':   return 'right';
    case 'justify': return 'justify';
    }
};
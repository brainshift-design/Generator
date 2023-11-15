TextControl.prototype.initTextarea = function(textbox)
{
    this.textbox                 = textbox;

    this.textbox.control         = this;
    this.textbox.defPlaceholder  = '...';//' . . .';
    this.textbox.placeholder     = this.textbox.defPlaceholder;

    this.textbox.style.height    = defParamHeight;
    this.textbox.style.textAlign = 'center';

    this.textbox.savedValue      = this.textbox.value;



    this.textbox.addEventListener('pointerdown', e =>
    {
        if (this.param.node.div.style.zIndex < graphView.getTopNodeIndex())
            graphView.putNodeOnTop(this.param.node);


        hideAllMenus();


        if (      graphView.overOutput 
               && graphView.overOutput == this.param.output
            ||    graphView.overInput  
               && graphView.overInput  == this.param.input )
        {
            e.preventDefault();
            return;
        }


        if (e.button == 1)
        {
            e.preventDefault();
            return;
        }


        if (this.readOnly)
        {
            e.preventDefault();
            e.stopPropagation();
            return;
        }


        if (!this.canReact(e))
            return;


        if (e.button == 2)
        {
            e.preventDefault();
            e.stopPropagation();

            initTextboxMenu(this.textbox);
            menuTextbox.showAt(e.clientX, e.clientY, false, false);
        }
        else    
            e.stopPropagation();
    });
    
    
    
    // this.textbox.addEventListener('pointermove', e =>
    // {
    //     //e.preventDefault();
    //     //e.stopPropagation();
    // });



    // this.textbox.addEventListener('pointerup', e =>
    // {
    //     // e.stopPropagation();


    //     if (e.button == 2)
    //     {
    //         initTextboxMenu(this.textbox);
    //         menuTextbox.showAt(e.clientX, e.clientY, false, false);
    //     }
    // });



    // this.textbox.addEventListener('dblclick', e =>
    // {
    //     e.stopPropagation();
    // });



    this.textbox.addEventListener('keydown', e =>
    {
        e.stopPropagation();


        if (   (      e.code == 'Enter'
                   && (   getCtrlKey(e) 
                       ||    !this.requireFinishCtrl
                          && !e.shiftKey)
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

            const tab = Array(this.tabSize + 1).join(' ');

            const selStart = this.textbox.selectionStart;
            const selEnd   = this.textbox.selectionEnd;

            this.textbox.value = 
                  this.textbox.value.slice(0, selStart)
                + tab
                + this.textbox.value.slice(selEnd);

            this.textbox.selectionStart = 
            this.textbox.selectionEnd   = selStart + this.tabSize;
        }
    });



    // this.textbox.addEventListener('input', e =>
    // {
    //     this.setValue(this.textbox.value, true, true);
    // });



    this.textbox.addEventListener('focus', () =>
    {
        hideAllMenus();

        if (currentTooltip) 
            hideTooltip(currentTooltip);

        this.updateCursor();
    });
    


    this.textbox.addEventListener('focusout', () =>
    {
        if (this.textbox.keyBlur)
            this.textbox.keyBlur = false;

            
        this.textbox.finish(true);


        if (this.savedSuccessOnFocusOut != null)
        {
            this.successOnFocusOut      = this.savedSuccessOnFocusOut;
            this.savedSuccessOnFocusOut = null;
        }


        this.textbox.blur();
        this.clicked = false;

        this.updateCursor();


        window.getSelection().removeAllRanges();
    });
    


    this.textbox.addEventListener('wheel', e =>
    {
        if (graphView.wheelTimer)
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
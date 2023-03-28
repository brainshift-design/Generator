TextControl.prototype.initTextarea = function()
{
    this.textarea = createTextarea('textControlTextarea');

    this.textarea.control     = this;
    this.textarea.placeholder = '. . .';

    this.textarea.style.height = 20;



    this.textarea.addEventListener('pointerdown', e =>
    {
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
        this.textarea.style.cursor = 'default';
    });



    this.textarea.addEventListener('keydown', e =>
    {
        e.stopPropagation();


        // if (   e.code == 'KeyX'
        //     && getCtrlKey(e))
        // {
        //     e.preventDefault();
        //     document.execCommand('copy');
        //     clearSelectedText(this.textarea);
        // }

        // else if (   e.code == 'KeyC'
        //     && getCtrlKey(e))
        // {
        //     e.preventDefault();
        //     document.execCommand('copy');
        // }

        // else if (e.code == 'KeyV'
        //       && getCtrlKey(e)
        //       && !this.readOnly)
        // {
        //     // let the OS do its thing here
        // }
        
        // else if (   (   e.code == 'Enter'
        //              || e.code == 'NumpadEnter')
        //          && !this.readOnly)
        // {
        //     this.textarea.keyBlur = true;
        //     this.textarea.finish(true);
        // }

        // else if (e.code == 'Escape')
        // {
        //     this.textarea.keyBlur = true;
        //     this.textarea.finish(false);
        // }
        // else if (e.code == 'Tab')
        // {
        //     e.preventDefault();
        //     e.stopPropagation();
            
        //     if (this.param)
        //     {
        //         const params = this.param.node.params;
        //         let   index  = this.param.index;

        //         this.textarea.keyBlur = true;
        //         this.textarea.finish(true, false);

        //         if (   e.shiftKey 
        //             && index > 0)
        //         {
        //             while (params[--index].controls[0].readOnly);
        //             params[index].controls[0].showTextarea();
        //         }
        //         else if (!e.shiftKey 
        //               && index < params.length-1) 
        //         {
        //             while (params[++index].controls[0].readOnly);
        //             params[index].controls[0].showTextarea();
        //         }
        //     }

        //     // let tabs  = document.querySelectorAll('.numberControl, .selectControl, .select, .menuSelect, button, .menuButton');
        //     // let index = this.tabIndex;

        //     // for (let i = 0; i < tabs.length; i++) 
        //     // {
        //     //     if (   e.shiftKey && tabs[i].tabIndex == index - 1
        //     //         ||               tabs[i].tabIndex == index + 1) 
        //     //     {
        //     //         if (tabs[i].className == 'slider')
        //     //             tabs[i].showTextarea();
        //     //         else 
        //     //         {
        //     //             document.activeElement.blur();
        //     //             tabs[i].focus();
        //     //         }

        //     //         break;
        //     //     }
        //     // }
        // }

        // else if ((   e.key == 'ArrowUp'
        //           || e.key == 'ArrowDown')
        //       && !this.readOnly)
        // {
        //     e.preventDefault();

        //     let text = this.textarea.value;

        //     if (   this.valueCanContainSuffix   
        //         && text.length >= this.suffix.length
        //         && text.substring(text.length - this.suffix.length) == this.suffix)
        //         text = text.substring(0, text.length - this.suffix.length);


        //     if (this.textarea.selectionStart != this.textarea.selectionEnd)
        //         this.textarea.selectionStart =  this.textarea.selectionEnd;

        //     const pos = Math.min(
        //         this.textarea.selectionStart,
        //         text.length);

        //     const revPos = text.length - pos;

        //     const val  = parseFloat(text);
        //     const sign = e.key == 'ArrowUp' ? 1 : -1;

        //     let decIndex = text.indexOf('.');
        //     if (decIndex < 0) decIndex = text.indexOf(',');
            
        //     if (   text[0] != '-'
        //         || pos > 0)
        //     {
        //         if (decIndex < 0) // integer
        //         {
        //             let dec = Math.pow(10, revPos);

        //             if (e.shiftKey) 
        //                 dec *= 10;

        //             this.setValue((val + sign * dec) / this.valueScale);
        //             this.updateTextarea();
        //         }
        //         else // floating point
        //         {
        //             const _edit = pos - decIndex - 1;

        //             let  dec  = 
        //                 _edit < 0
        //                 ?     Math.pow(10, -_edit - 1)
        //                 : 1 / Math.pow(10,  _edit    );

        //             if (e.shiftKey) 
        //                 dec *= 10;

        //             this.displayDec = text.length-1 - decIndex;
        //             this.setValue((val + sign * dec) / this.valueScale);
        //             this.updateTextarea();
        //         }

        //         this.textarea.selectionStart =
        //         this.textarea.selectionEnd   = this.textarea.savedValue.length - revPos - this.suffix.length;


        //         if (this.param) this.param.changing = true;
        //         if (this.confirmTimer) clearTimeout(this.confirmTimer);
        //         this.confirmTimer = setTimeout(() => numberControl_confirm(this), 400);
        //     }
        // }
        // else if (e.code == 'KeyZ'
        //       && getCtrlKey(e))
        // {
        //          if (e.shiftKey && !actionManager.redoing) actionManager.redo();
        //     else if (              !actionManager.undoing) actionManager.undo();
            
        //     this.updateTextarea();
        // }
        // else 
        // {
        //     let curVal = this.textarea.value;

        //     if (      e.key.length == 1
        //            && !isDigit(e.key)
        //            && e.key != NAN_CHAR
        //            && (   !this.valueCanContainSuffix
        //                || !this.suffix.includes(e.key))
        //            && (   !this.showHex 
        //                || !isHexDigit(e.key))
        //            && (   this.showHex
        //                ||    e.key != '.'
        //                   && e.key != ',')
        //            && !(   ((      e.code == 'Minus'
        //                         || e.code == 'NumpadSubtract')
        //                      && !curVal.includes('-'))
        //                 && this.min < 0)
        //         ||     this.readOnly
        //            && !isArrowKey(e.code))
        //         e.preventDefault();

        //     if (    e.key == '.'
        //         &&  this.dec == 0
        //         && !this.allowEditDecimals)
        //         e.preventDefault();
                
                    
        //     curVal =
        //            curVal ==     NAN_DISPLAY
        //         || curVal == UNKNOWN_DISPLAY
        //         ? ''
        //         :   curVal.substring(0, this.textarea.selectionStart) 
        //           + curVal.substring(this.textarea.selectionEnd, curVal.length);

                  
        //     const nextVal = parseFloat(curVal + e.key);

        //     if (   nextVal < this.min - 0.001
        //         || nextVal > this.max)
        //         e.preventDefault();            
        // }
    });



    this.textarea.addEventListener('paste', e =>
    {
        e.preventDefault();

        const str = e.clipboardData.getData('text/plain');

        let val = 
            this.showHex
            ? parseInt(str, 16)
            : parseFloat(str);

        val = Math.min(Math.max(this.min, val), this.max);

        this.textarea.value = isNaN(val) ? '' : val;
    });



    
    this.textarea.addEventListener('focusout', () =>
    {
        if (!this.textarea.keyBlur) this.textarea.finish(this.textarea.value.trim() != '');
        else                        this.textarea.keyBlur = false;


        if (this.savedSuccessOnFocusOut != null)
        {
            this.successOnFocusOut      = this.savedSuccessOnFocusOut;
            this.savedSuccessOnFocusOut = null;
        }


        //this.div.parentNode.removeChild(this.textarea);
        this.textarea.blur();
        this.clicked = false;
    });
    


    this.textarea.addEventListener('wheel', e =>
    {
        e.stopPropagation();
        forwardEvent(e, this.div);
    });
    


    this.textarea.finish = (success, focusControl = true) =>
    {
        let   value      = this.textarea.value;
        const savedValue = this.textarea.savedValue;

        value = value.replace(this.suffix, '');
        
        
        let val = 
            value.trim() == NAN_CHAR 
            ? NAN_CHAR
            : value;

        let savedVal = 
            savedValue.trim() == NAN_CHAR  
            ? NAN_CHAR
            : savedValue;

        
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
                    value.trim() != NAN_CHAR
                    ? val 
                    : savedVal);
            }
            else
                this.setValue(savedVal);
        }
         
        
        this.textarea.blur();


        // this.focus.style.visibility = 'hidden';
        // this.focus.style.opacity    = 0;


        this.textarea.style.boxShadow = 'none';


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
    //this.textarea.style.textAlign = 'center';

    this.updateTextarea();

    
    this.textarea.focus();
    this.textarea.select();
};



TextControl.prototype.updateTextarea = function()
{
    this.textarea.value = this.value;
    // this.textarea.value =
    //     this.value == NAN_CHAR
    //     ? NAN_DISPLAY
    //     : this.value;
        
    this.textarea.savedValue = this.textarea.value;
};
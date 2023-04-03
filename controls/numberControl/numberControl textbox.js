NumberControl.prototype.initTextbox = function()
{
    this.textbox = createTextbox('numberControlTextbox');
    this.textbox.control = this;
    


    this.textbox.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();
    });
    
    
    
    this.textbox.addEventListener('pointerup', e =>
    {
        e.stopPropagation();

        if (e.button == 2)
        {
            initTextMenu(this.textbox);
            menuText.showAt(e.clientX, e.clientY, false);
        }
    });



    this.textbox.addEventListener('pointermove', e =>
    {
        e.stopPropagation();
        this.textbox.style.cursor = 'default';
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
        
        else if (   (   e.code == 'Enter'
                     || e.code == 'NumpadEnter')
                 && !this.readOnly)
        {
            this.textbox.keyBlur = true;
            this.textbox.finish(true);
        }

        else if (e.code == 'Escape')
        {
            this.textbox.keyBlur = true;
            this.textbox.finish(false);
        }
        else if (e.code == 'Tab')
        {
            e.preventDefault();
            
            if (this.param)
            {
                const params = this.param.node.getTabParams();
                let   index  = params.indexOf(this.param);

                this.textbox.keyBlur = true;
                this.textbox.finish(true, false);

                if (   e.shiftKey 
                    && index > 0)
                {
                    while (params[--index].controls[0].readOnly); // ; on purpose
                    params[index].controls[0].showTextbox();
                }
                else if (!e.shiftKey 
                      && index < params.length-1) 
                {
                    while (params[++index].controls[0].readOnly); // ; on purpose
                    params[index].controls[0].showTextbox();
                }
            }

            // let tabs  = document.querySelectorAll('.numberControl, .selectControl, .select, .menuSelect, button, .menuButton');
            // let index = this.tabIndex;

            // for (let i = 0; i < tabs.length; i++) 
            // {
            //     if (   e.shiftKey && tabs[i].tabIndex == index - 1
            //         ||               tabs[i].tabIndex == index + 1) 
            //     {
            //         if (tabs[i].className == 'slider')
            //             tabs[i].showTextbox();
            //         else 
            //         {
            //             document.activeElement.blur();
            //             tabs[i].focus();
            //         }

            //         break;
            //     }
            // }
        }

        else if ((   e.key == 'ArrowUp'
                  || e.key == 'ArrowDown')
              && !this.readOnly)
        {
            e.preventDefault();

            let text = this.textbox.value;

            if (   this.valueCanContainSuffix   
                && text.length >= this.suffix.length
                && text.substring(text.length - this.suffix.length) == this.suffix)
                text = text.substring(0, text.length - this.suffix.length);


            if (this.textbox.selectionStart != this.textbox.selectionEnd)
                this.textbox.selectionStart =  this.textbox.selectionEnd;

            const pos = Math.min(
                this.textbox.selectionStart,
                text.length);

            const revPos = text.length - pos;

            const val  = parseFloat(text);
            const sign = e.key == 'ArrowUp' ? 1 : -1;

            let decIndex = text.indexOf('.');
            if (decIndex < 0) decIndex = text.indexOf(',');
            
            if (   text[0] != '-'
                || pos > 0)
            {
                if (decIndex < 0) // integer
                {
                    let dec = Math.pow(10, revPos);

                    if (e.shiftKey) 
                        dec *= 10;

                    this.setValue((val + sign * dec) / this.valueScale);
                    this.updateTextbox();
                }
                else // floating point
                {
                    const _edit = pos - decIndex - 1;

                    let  dec  = 
                        _edit < 0
                        ?     Math.pow(10, -_edit - 1)
                        : 1 / Math.pow(10,  _edit    );

                    if (e.shiftKey) 
                        dec *= 10;

                    this.displayDec = text.length-1 - decIndex;
                    this.setValue((val + sign * dec) / this.valueScale);
                    this.updateTextbox();
                }

                this.textbox.selectionStart =
                this.textbox.selectionEnd   = this.textbox.savedValue.length - revPos - this.suffix.length;


                if (this.param) this.param.changing = true;
                if (this.confirmTimer) clearTimeout(this.confirmTimer);
                this.confirmTimer = setTimeout(() => controlTimer_confirm(this), 400);
            }
        }
        else if (e.code == 'KeyZ'
              && getCtrlKey(e))
        {
                 if (e.shiftKey && !actionManager.redoing) actionManager.redo();
            else if (              !actionManager.undoing) actionManager.undo();
            
            this.updateTextbox();
        }
        else 
        {
            let curVal = this.textbox.value;

            if (      e.key.length == 1
                   && !isDigit(e.key)
                   && e.key != NAN_DISPLAY
                   && (   !this.valueCanContainSuffix
                       || !this.suffix.includes(e.key))
                   && (   !this.showHex 
                       || !isHexDigit(e.key))
                   && (   this.showHex
                       ||    e.key != '.'
                          && e.key != ',')
                   && !(   ((      e.code == 'Minus'
                                || e.code == 'NumpadSubtract')
                             && !curVal.includes('-'))
                        && this.min < 0)
                ||     this.readOnly
                   && !isArrowKey(e.code))
                e.preventDefault();

            if (    e.key == '.'
                &&  this.dec == 0
                && !this.allowEditDecimals)
                e.preventDefault();
                
                    
            curVal =
                   curVal ==     NAN_DISPLAY
                || curVal == UNKNOWN_DISPLAY
                ? ''
                :   curVal.substring(0, this.textbox.selectionStart) 
                  + curVal.substring(this.textbox.selectionEnd, curVal.length);

                  
            const nextVal = parseFloat(curVal + e.key);

            if (   nextVal < this.min - 0.001
                || nextVal > this.max)
                e.preventDefault();            
        }
    });



    this.textbox.addEventListener('paste', e =>
    {
        e.preventDefault();

        const str = e.clipboardData.getData('text/plain');

        let val = 
            this.showHex
            ? parseInt(str, 16)
            : parseFloat(str);

        val = Math.min(Math.max(this.min, val), this.max);

        this.textbox.value = isNaN(val) ? '' : val;
    });



    
    this.textbox.addEventListener('focusout', () =>
    {
        if (!this.textbox.keyBlur) this.textbox.finish(this.textbox.value.trim() != '');
        else                       this.textbox.keyBlur = false;


        if (this.savedSuccessOnFocusOut != null)
        {
            this.successOnFocusOut      = this.savedSuccessOnFocusOut;
            this.savedSuccessOnFocusOut = null;
        }


        this.div.parentNode.removeChild(this.textbox);
        this.clicked = false;
    });
    


    this.textbox.addEventListener('wheel', e =>
    {
        e.stopPropagation();
        forwardEvent(e, this.div);
    });
    


    this.textbox.finish = (success, focusControl = true) =>
    {
        let   value      = this.textbox.value;
        const savedValue = this.textbox.savedValue;

        value = value.replace(this.suffix, '');
        
        
        let val = 
            value.trim() == NAN_DISPLAY 
            ? Number.NaN 
            : (this.showHex 
               ? parseInt(value, 16) 
               : parseFloat(value));


        let savedVal = 
            savedValue.trim() == NAN_DISPLAY  
            ? Number.NaN 
            : (this.showHex 
               ? parseInt(savedValue, 16) 
               : parseFloat(savedValue));

        
        if (!isNaN(val))
            val /= this.valueScale;

       
        const e = new CustomEvent('finishedit', { 'detail': {
            'success':         success,
            'value':           val,
            'oldValue':        savedVal,
            'valueString':     value     .replace(this.suffix, ''),
            'oldValueString':  savedValue.replace(this.suffix, ''),
            'preventSetValue': false }});

        this.dispatchEvent(e);


        if (!e.preventSetValue)
        {
            if (success) 
            {
                this.setValue(
                       value.trim() != '' 
                    && value.trim() != NAN_DISPLAY
                    ? val 
                    : savedVal);
            }
            else
                this.setValue(savedVal);
        }
         
        
        this.textbox.blur();

        this.text.style.display = 'block';

        if (   this.inFocus
            && focusControl)
            this.div.focus();
    };    
};



NumberControl.prototype.showTextbox = function()
{
    this.text.style.display = 'none';

    this.inFocus = 
           hasFocus(this.div)
        && !this.clicked;

        
    // this.textbox.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand)';
    // this.textbox.style.outline   = 'none';
    this.textbox.style.textAlign = 'center';


    this.updateTextbox();
    
    this.div.parentNode.appendChild(this.textbox);
    
    this.textbox.focus();
    this.textbox.select();

    this.textbox.style.cursor = 'default';
};



NumberControl.prototype.updateTextbox = function()
{
    this.textbox.value =
        (   isNaN(this.value)
            ? NAN_DISPLAY
            : numToString(
                  this.value * this.valueScale, 
                  this.displayDec, 
                  this.showHex
              ).toUpperCase())
         + (  !isNaN(this.value)
            && this.valueCanContainSuffix 
            ? this.suffix 
            : '');
        
    this.textbox.savedValue = this.textbox.value;
};
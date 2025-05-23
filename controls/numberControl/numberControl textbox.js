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
            menuText.showAt(e.clientX, e.clientY, false, false);
        }
    });



    this.textbox.addEventListener('dblclick', e =>
    {
        e.stopPropagation();
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
            && getCtrlKey(e)
            && !this.readOnly)
        {
            //
        }

        else if (   e.code == 'KeyC'
            && getCtrlKey(e))
        {
            //
        }

        else if (e.code == 'KeyV'
              && getCtrlKey(e)
              && !this.readOnly)
        {
            //
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
                    while (index > 0
                        && params[--index].controls[0].readOnly); // ; on purpose

                    if (   index >= 0
                        && params[index].controls[0].showTextbox
                        && params[index].controls[0].param.div.parentNode)
                        params[index].controls[0].showTextbox();
                    else
                        findParamAbove(this.param.node);
                }
                else if (e.shiftKey 
                      && index == 0)
                {
                    findParamAbove(this.param.node);
                }
                else if (!e.shiftKey 
                      && index < params.length-1) 
                {
                    while (index < params.length-1
                        && params[++index].controls[0].readOnly); // ; on purpose

                    if (   index < params.length
                        && params[index].controls[0].showTextbox
                        && params[index].controls[0].param.div.parentNode)
                        params[index].controls[0].showTextbox();
                    else
                        findParamBelow(this.param.node);
                }
                else if (!e.shiftKey 
                      && index == params.length-1) 
                {
                    findParamBelow(this.param.node);
                }
            }
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

            const revPos = 0;//text.length - pos;
            const sign   = e.key == 'ArrowUp' ? 1 : -1;


            if (this.showHex)
            {
                const val = parseInt(text, 16);

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

                        this.setValue((val + sign * dec) / this.valueScale, this.decimals);
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
                        this.setValue((val + sign * dec) / this.valueScale, this.decimals);
                        this.updateTextbox();
                    }

                    this.textbox.selectionStart =
                    this.textbox.selectionEnd   = this.textbox.savedValue.length - revPos - this.suffix.length;


                    if (this.param) this.param.changing = true;
                    if (this.confirmTimer) clearTimeout(this.confirmTimer);
                    this.confirmTimer = setTimeout(() => controlTimer_confirm(this), 400);
                }
            }
            else
            {
                const val = parseFloat(text);

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

                        this.setValue((val + sign * dec) / this.valueScale, this.decimals);
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
                        this.setValue((val + sign * dec) / this.valueScale, this.decimals);
                        this.updateTextbox();
                    }

                    this.textbox.selectionStart =
                    this.textbox.selectionEnd   = this.textbox.savedValue.length - revPos - this.suffix.length;


                    if (this.param) this.param.changing = true;
                    if (this.confirmTimer) clearTimeout(this.confirmTimer);
                    this.confirmTimer = setTimeout(() => controlTimer_confirm(this), 400);
                }
            }
        }
        // else if (e.code == 'KeyZ'
        //       && getCtrlKey(e))
        // {
        //     // e.preventDefault();
        //     //e.stopImmediatePropagation();

        //     //      if (e.shiftKey && !actionManager.redoing) actionManager.redo();
        //     // else if (              !actionManager.undoing) actionManager.undo();
            
        //     // this.updateTextbox();
        // }
        else if (this.readOnly)
            e.preventDefault();
        //{
        //     let curVal = this.textbox.value;

        //     if (      e.key.length == 1
        //            && !isDigit(e.key)
        //            && e.key != NAN_DISPLAY
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
        //         &&  this.decimals == 0
        //         && !this.allowEditDecimals)
        //         e.preventDefault();
                
                    
        //     curVal =
        //            curVal ==     NAN_DISPLAY
        //         || curVal == UNKNOWN_DISPLAY
        //         ? ''
        //         :   curVal.substring(0, this.textbox.selectionStart) 
        //           + curVal.substring(this.textbox.selectionEnd, curVal.length);

                  
        //     const nextVal = parseFloat(curVal + e.key);

        //     if (   nextVal < this.min - 0.001
        //         || nextVal > this.max)
        //         e.preventDefault();            
        //}
    });



    // this.textbox.addEventListener('paste', e =>
    // {
    //     //e.preventDefault();
    //     //e.stopPropagation();
        

    //     // const str = e.clipboardData.getData('text/plain');

    //     // let val = 
    //     //     this.showHex
    //     //     ? parseInt(str, 16)
    //     //     : parseFloat(str);

    //     // val = Math.min(Math.max(this.min, val), this.max);
        
    //     // const strVal = isNaN(val) ? '' : val;

    //     // this.textbox.value = 
    //     //       this.textbox.value.substring(0, this.textbox.selectionStart)
    //     //     + strVal
    //     //     + this.textbox.value.substring(this.textbox.selectionEnd);

    //     // this.setValue(
    //     //     parseFloat(this.textbox.value), 
    //     //     true, //!this.textbox.managing, 
    //     //     true);
    // });



    
    this.textbox.addEventListener('focus', () =>
    {
        if (currentTooltip) 
            hideTooltip(currentTooltip);
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


        this.param.div.parentNode.removeChild(this.textbox);
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


        let val, savedVal, isHex;
        

        const valueIndex = this.textValues.findIndex(v => 
        {
            for (let i = 1; i < v.length; i++)
                if (v[i].toLowerCase() == value.trim().toLowerCase())
                    return true;

            return false;
        });


        if (valueIndex > -1)
        {
            val   = this.textValues[valueIndex][0];
            isHex = false;
        }

        else
        {
            value = value.replace(this.suffix, '');

            value = replaceLast(value, ',', '.');
            value = replaceLast(value, '٫', '.');


            let sepCount = 0;

            for (let i = 0; i < value.length; i++)
            {
                if (   value[i] == '.'
                    || value[i] == ','
                    || value[i] == '٫')
                    sepCount++;
            }

            if (sepCount > 1)
                success = false;
                    
            
            isHex = this.showHex;

            if (   value.length >= 2
                && value.substring(0, 2) == '0x')
            {
                isHex = true;
                value = value.substring(2);   
            }

            
            val = 
                value.trim() == NAN_DISPLAY 
                ? Number.NaN 
                : (isHex
                ? parseInt(value, 16) 
                : parseFloat(value));

            if (!isNaN(val))
                val /= this.valueScale;
        }


        savedVal = 
            savedValue.trim() == NAN_DISPLAY  
            ? Number.NaN 
            : (isHex
               ? parseInt(savedValue, 16) 
               : parseFloat(savedValue));


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
                    ? val
                    : savedVal);
            }
            else
                this.setValue(savedVal);
        }
         
        
        this.textbox.blur();

        this.divValue.style.display = 'block';

        if (   this.inFocus
            && focusControl)
            this.param.div.focus();
    };
};



NumberControl.prototype.showTextbox = function()
{
    this.divValue.style.display = 'none';

    this.inFocus = 
            hasFocus(this.param.div)
        && !this.clicked;


    this.param.formatControlTextbox(this);

    this.updateTextbox();

    
    this.param.div.parentNode.appendChild(this.textbox);
    
    this.textbox.focus();
    this.textbox.select();

    this.textbox.style.fontStyle = this.readOnly ? 'italic' : 'normal';
    this.textbox.style.cursor    = 'default';
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



function findParamAbove(node)
{
    const nodeAbove = findNodeAbove(node);

    if (nodeAbove)
    {
        let index = nodeAbove.params.length;

        while (index > 0
            && nodeAbove.params.length > 0 
            && nodeAbove.params[--index].controls[0].readOnly); // ; on purpose

        if (   index >= 0
            && nodeAbove.params[index].controls[0].showTextbox
            && nodeAbove.params[index].controls[0].param.div.parentNode)
            nodeAbove.params[index].controls[0].showTextbox();
    }
}



function findParamBelow(node)
{
    const nodeBelow = findNodeBelow(node);

    if (nodeBelow)
    {
        let index = -1;

        while (index < nodeBelow.params.length-1
            && nodeBelow.params.length > 0
            && nodeBelow.params[++index].controls[0].readOnly); // ; on purpose

        if (   index < nodeBelow.params.length
            && nodeBelow.params[index].controls[0].showTextbox
            && nodeBelow.params[index].controls[0].param.div.parentNode)
            nodeBelow.params[index].controls[0].showTextbox();
    }
}
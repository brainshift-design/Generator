ColorControl.prototype.initTextbox = function()
{
    this.textbox = createTextbox('colorControlTextbox');
    this.textbox.control = this;
    this.textbox.shown   = false;
    


    this.textbox.addEventListener('pointerdown', e =>
    {
        e.stopImmediatePropagation();
    });



    this.textbox.addEventListener('pointerup', e =>
    {
        e.stopPropagation();

        if (e.button == 0)
        {
            if (!this.textbox.shown)
                this.textbox.select();
    
            this.textbox.shown = true;
        }
        else if (e.button == 2)
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



    this.textbox.addEventListener('focus', e =>
    {
        if (   this.textbox.value ==     NAN_DISPLAY
            || this.textbox.value == UNKNOWN_DISPLAY)
            this.textbox.value = NAN_DISPLAY;
    });



    this.textbox.addEventListener('keydown', e =>
    {
        e.stopPropagation();


        if (   e.code == 'KeyC'
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
            e.stopPropagation();
            
            if (this.param)
            {
                const params = this.param.node.getTabParams();
                let   index  = params.indexOf(this.param);

                this.textbox.keyBlur = true;
                this.textbox.finish(true, false);

                if (   e.shiftKey 
                    && index > 0)
                {
                    while (params[--index].controls[0].readOnly);
                    params[index].controls[0].showTextbox();
                }
                else if (!e.shiftKey 
                      && index < params.length-1) 
                {
                    while (params[++index].controls[0].readOnly);
                    params[index].controls[0].showTextbox();
                }
            }
        }

        else if ((   e.key == 'ArrowUp'
                  || e.key == 'ArrowDown')
              && !this.readOnly)
        {
            e.preventDefault();

            // let text = this.textbox.value;

            if (   this.textbox.selectionStart == this.textbox.selectionEnd
                && this.textbox.selectionStart % 2 == 0
                && this.textbox.selectionStart > 0)
                this.textbox.selectionStart--;

            const iStart =  Math.floor(this.textbox.selectionStart / 2);
            let   iEnd   =  Math.ceil (this.textbox.selectionEnd   / 2);

            if (iStart == iEnd) iEnd++;


            const rgb = scaleRgb(validHex2rgb(this.textbox.value));
            
            for (let i = iStart; i < iEnd; i++)
                rgb[i] = Math.min(Math.max(0, rgb[i] + (e.key == 'ArrowUp' ? 1 : -1)), 0xff);


            this.setValue(ColorValue.fromRgb(rgb));
            this.updateTextbox();


            this.textbox.selectionStart = iStart * 2;
            this.textbox.selectionEnd   = iEnd   * 2;


            if (this.param) this.param.changing = true;
            if (this.confirmTimer) clearTimeout(this.confirmTimer);
            this.confirmTimer = setTimeout(() => controlTimer_confirm(this), 400);
        }
        else if (e.code == 'KeyZ'
              && getCtrlKey(e))
        {
                 if (e.shiftKey && !actionManager.redoing) actionManager.redo();
            else if (              !actionManager.undoing) actionManager.undo();
            
            this.updateTextbox();
        }
        // else 
        // {
        //     let curVal = this.textbox.value;

        //     if (      e.key.length == 1
        //            && e.key != NAN_DISPLAY
        //            && !isDigit(e.key)
        //            && !isSimpleLatinLetter(e.key)
        //         ||     this.readOnly
        //            && !isArrowKey(e.code))
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
        // }
    });



    this.textbox.addEventListener('paste', e =>
    {
        e.preventDefault();


        const oldValue = this.value.copy();


        let str = e.clipboardData.getData('text/plain');

        const rgb = hex2rgb(
              this.textbox.value.substring(0, this.textbox.selectionStart)
            + str
            + this.textbox.value.substring(this.textbox.selectionEnd));

        const value = ColorValue.fromRgb(scaleRgb(rgb));


        this.textbox.value = rgb2hex(rgb);


        this.setValue(
            value, 
            true, //!this.textbox.managing, 
            true);
    });



    this.textbox.addEventListener('focusout', () =>
    {
        //console.log('this.successOnFocusOut', this.successOnFocusOut);

        if (!this.textbox.keyBlur) this.textbox.finish(true);
        else                          this.textbox.keyBlur = false;

        if (this.savedSuccessOnFocusOut != null)
        {
            this.successOnFocusOut      = this.savedSuccessOnFocusOut;
            this.savedSuccessOnFocusOut = null;
        }

        if (this.div.parentNode.contains(this.textbox))
            this.div.parentNode.removeChild(this.textbox);

        this.textbox.shown = false;

        
        this.clicked = false;
    });
    


    this.textbox.addEventListener('pointerdown', e =>
    {
        forwardEvent(e, this.div);

        if (e.button == 1)
        {
            e.preventDefault();
            return;
        }

        e.stopPropagation();
    });



    this.textbox.finish = (success, focusControl = true) =>
    {
        let   value      = this.textbox.value;
        const savedValue = this.textbox.savedValue;

        
        const e = new CustomEvent('finishedit', { 'detail': {
            'success':         success,
            'value':           value,
            'oldValue':        savedValue,
            'preventSetValue': false }});
            
        this.dispatchEvent(e);
            
        
        // const webColor = webColors.find(wc => wc.name.toLowerCase() == e.detail.value.toLowerCase());

        // const rgb = validHex2rgb(webColor ? webColor.color : e.detail.value);
        // const val = ColorValue.fromRgb(scaleRgb(rgb));


        let rgb      = validHex2rgb(value);
        let savedRgb = validHex2rgb(savedValue);
        

        if (!e.preventSetValue)
        {
            if (success) 
            {
                this.setValue(
                      value.trim() != '' 
                    ? ColorValue.fromRgb(scaleRgb(rgb     )) 
                    : ColorValue.fromRgb(scaleRgb(savedRgb)));
            }
            else
                this.setValue(ColorValue.fromRgb(scaleRgb(savedRgb)));
        }
        // else
        //     this.setValue(ColorValue.fromRgb(scaleRgb(savedRgb)));

        
        this.textbox.blur();

        this.text.style.display = 'block';

        if (   this.inFocus
            && focusControl)
            this.div.focus();
    };    
};



ColorControl.prototype.showTextbox = function()
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
    // this.textbox.select();

    this.textbox.style.cursor = 'default';
};



ColorControl.prototype.updateTextbox = function()
{
    const rgb = this.value.toRgb();

    this.textbox.value =
        !this.value.isValid()
        ? UNKNOWN_CHAR
        : rgbIsValid(rgb)
          ? rgb2hex(rgb).toUpperCase()
          : UNKNOWN_CHAR;
    
    this.textbox.savedValue = this.textbox.value;
};

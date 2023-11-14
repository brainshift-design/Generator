ColorControl.prototype.initTextbox = function()
{
    this.textbox         = createTextbox('colorControlTextbox');
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



    this.textbox.addEventListener('focus', e =>
    {
        if (   this.textbox.value ==     NAN_DISPLAY
            || this.textbox.value == UNKNOWN_DISPLAY)
            this.textbox.value = NAN_DISPLAY;
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
            //e.stopPropagation();
            
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
            if (e.shiftKey)
            {
                if (  !isEmpty(actionManager.redoActions)
                    && actionManager.redoActions.at(-1).type == SET_PARAM_VALUE_ACTION
                    && actionManager.redoActions.at(-1).param == this.param)
                    actionManager.redo();
                else
                {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
            else
            {
                if (  !isEmpty(actionManager.actions)
                    && actionManager.actions.at(-1).type == SET_PARAM_VALUE_ACTION
                    && actionManager.actions.at(-1).param == this.param)
                    actionManager.undo();
                else
                {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        }

        else if (this.readOnly)
            e.preventDefault();

        else if (e.key != 'Control'
              && e.key != 'Shift'
              && e.key != 'Alt')           
            actionManager.redoActions = [];
    });



    // this.textbox.addEventListener('paste', e =>
    // {
    //     e.preventDefault();


    //     const oldValue = this.value.copy();


    //     let str = e.clipboardData.getData('text/plain');

    //     const rgb = hex2rgb(
    //           this.textbox.value.substring(0, this.textbox.selectionStart)
    //         + str
    //         + this.textbox.value.substring(this.textbox.selectionEnd));

    //     const value = ColorValue.fromRgb(scaleRgb(rgb));


    //     this.textbox.value = rgb2hex(rgb);


    //     this.setValue(
    //         value, 
    //         true, //!this.textbox.managing, 
    //         true);
    // });



    this.textbox.addEventListener('focus', () =>
    {
        if (currentTooltip) 
            hideTooltip(currentTooltip);
    });
    


    this.textbox.addEventListener('focusout', () =>
    {
        //console.log('this.successOnFocusOut', this.successOnFocusOut);

        if (   !this.textbox.keyBlur
            && !this.readOnly) this.textbox.finish(true);
        else                   this.textbox.keyBlur = false;

        if (this.savedSuccessOnFocusOut != null)
        {
            this.successOnFocusOut      = this.savedSuccessOnFocusOut;
            this.savedSuccessOnFocusOut = null;
        }

        if (this.param.div.parentNode.contains(this.textbox))
            this.param.div.parentNode.removeChild(this.textbox);

        this.textbox.shown = false;

        this.divValue.style.display = 'block';
        
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



    this.textbox.addEventListener('wheel', e =>
    {
        e.stopPropagation();
        forwardEvent(e, this.div);
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

                // if (this.param)
                //     addMetricsEvent(METRICS_PARAM_VALUE, this.param.name);
            }
            else
            {
                this.setValue(ColorValue.fromRgb(scaleRgb(savedRgb)));
            }
        }

        
        this.textbox.blur();

        this.divValue.style.display = 'block';

        if (   this.inFocus
            && focusControl)
            this.div.focus();


        actionManager.redoActions = [];
    };    
};



ColorControl.prototype.showTextbox = function()
{
    this.divValue.style.display = 'none';

    this.inFocus = 
           hasFocus(this.div)
        && !this.clicked;

    // this.textbox.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand)';
    // this.textbox.style.outline   = 'none';


    this.param.formatControlTextbox(this);

    this.updateTextbox();

    
    this.param.div.parentNode.appendChild(this.textbox);
    
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

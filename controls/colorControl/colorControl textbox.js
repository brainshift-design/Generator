function initColorControlTextbox(control)
{
    control.textbox = createTextbox('colorControlTextbox');
    control.textbox.slider = control;
    


    control.textbox.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();
    });



    control.textbox.addEventListener('pointermove', e =>
    {
        e.stopPropagation();
        control.textbox.style.cursor = 'default';
    });



    control.textbox.addEventListener('focus', e =>
    {
        if (control.textbox.value == DISPLAY_INVALID)
            control.textbox.value = INVALID;
    });



    control.textbox.addEventListener('keydown', e =>
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
              && !control.readOnly)
        {
            // let the OS do its thing here
        }
        
        else if (   (   e.code == 'Enter'
                     || e.code == 'NumpadEnter')
                 && !control.readOnly)
        {
            control.textbox.keyBlur = true;
            control.textbox.finish(true);
        }

        else if (e.code == 'Escape')
        {
            control.textbox.keyBlur = true;
            control.textbox.finish(false);
        }
        else if (e.code == 'Tab')
        {
            e.preventDefault();
            e.stopPropagation();
            
            if (control.param)
            {
                const params = control.param.node.params;
                let   index  = control.param.index;

                control.textbox.keyBlur = true;
                control.textbox.finish(true, false);

                if (   e.shiftKey 
                    && index > 0)
                {
                    while (params[--index].control.readOnly);
                    params[index].control.showTextbox();
                }
                else if (!e.shiftKey 
                      && index < params.length-1) 
                {
                    while (params[++index].control.readOnly);
                    params[index].control.showTextbox();
                }
            }
        }

        else if ((   e.key == 'ArrowUp'
                  || e.key == 'ArrowDown')
              && !control.readOnly)
        {
            e.preventDefault();

            // let text = control.textbox.value;

            if (   control.textbox.selectionStart == control.textbox.selectionEnd
                && control.textbox.selectionStart % 2 == 0)
                control.textbox.selectionStart--;

            const iStart =  Math.floor(control.textbox.selectionStart / 2);
            let   iEnd   =  Math.ceil (control.textbox.selectionEnd   / 2);

            if (iStart == iEnd) iEnd++;


            const rgb = scaleRgb(validHex2rgb(control.textbox.value));
            
            for (let i = iStart; i < iEnd; i++)
                rgb[i] = Math.min(Math.max(0, rgb[i] + (e.key == 'ArrowUp' ? 1 : -1)), 0xff);


            control.setValue(ColorValue.fromRgb(rgb));
            control.updateTextbox();


            control.textbox.selectionStart = iStart * 2;
            control.textbox.selectionEnd   = iEnd   * 2;

        }
        else 
        {
            let curVal = control.textbox.value;

            if (      e.key.length == 1
                   && e.key != '?'
                   && !isDigit(e.key)
                   && !isHexDigit(e.key)
                ||     control.readOnly
                   && !isArrowKey(e.code))
                e.preventDefault();

            curVal =
                curVal == INVALID
                ? ''
                :   curVal.substring(0, control.textbox.selectionStart) 
                  + curVal.substring(control.textbox.selectionEnd, curVal.length);

                  
            const nextVal = parseFloat(curVal + e.key);

            if (   nextVal < control.min - 0.001
                || nextVal > control.max)
                e.preventDefault();            
        }
    });



    control.textbox.addEventListener('paste', function(e)
    {
        e.preventDefault();

        const str = e.clipboardData.getData('text/plain');

        let val = 
            control.showHex
            ? parseInt(str, 16)
            : parseFloat(str);

        val = Math.min(Math.max(control.min, val), control.max);

        control.textbox.value = isNaN(val) ? '' : val;
    });



    control.textbox.addEventListener('focusout', function()
    {
        //console.log('control.successOnFocusOut', control.successOnFocusOut);

        if (!control.textbox.keyBlur) control.textbox.finish(true);
        else                          control.textbox.keyBlur = false;

        if (control.savedSuccessOnFocusOut != null)
        {
            control.successOnFocusOut      = control.savedSuccessOnFocusOut;
            control.savedSuccessOnFocusOut = null;
        }

        control.parentNode.removeChild(control.textbox);
        control.clicked = false;
    });
    


    control.textbox.finish = function(success, focusControl = true)
    {
        let   value      = control.textbox.value;
        const savedValue = control.textbox.savedValue;

        let rgb      = validHex2rgb(value     );
        let savedRgb = validHex2rgb(savedValue);

        const e = new CustomEvent('finishedit', { 'detail': {
            'success':         success,
            'value':           value,
            'oldValue':        savedValue,
            'preventSetValue': false }});

        control.dispatchEvent(e);

        
        if (!e.preventSetValue)
        {
            if (success) 
            {
                control.setValue(
                      value.trim() != '' 
                    ? ColorValue.fromRgb(scaleRgb(rgb     )) 
                    : ColorValue.fromRgb(scaleRgb(savedRgb)));
            }
            else
                control.setValue(ColorValue.fromRgb(scaleRgb(savedRgb)));
        }
         
        
        control.textbox.blur();

        control.text.style.display = 'block';

        if (   control.inFocus
            && focusControl)
            control.focus();
    };    
    
    

    control.showTextbox = function()
    {
        control.text.style.display = 'none';

        control.inFocus = 
               hasFocus(control)
            && !control.clicked;
    
        // control.textbox.style.position  = 'absolute';
        // control.textbox.style.left      = '50%';
        // control.textbox.style.transform = 'translate(-50%)';
        // control.textbox.style.top       = control.offsetTop    + 1;
        // control.textbox.style.width     = control.offsetWidth  - 2;
        // control.textbox.style.height    = control.offsetHeight - 2;
        control.textbox.style.boxShadow = '0 0 0 1px var(--figma-color-bg-brand)';
        control.textbox.style.outline   = 'none';
        control.textbox.style.textAlign = 'center';
        control.textbox.style.color     = isDarkMode() ? 'white' : 'black';


        const isConnected =    
               control.param != null
            && control.param.input
            && control.param.input.connected;

        enableElementText(
            control.textbox, 
               !control.readOnly
            && !isConnected);

        control.updateTextbox();
        
        control.parentNode.appendChild(control.textbox);
        
        control.textbox.focus();
        control.textbox.select();

        control.textbox.style.cursor = 'default';
    }



    control.updateTextbox = function()
    {
        const rgb = control.value.toRgb();

        control.textbox.value =
            !control.value.isValid()
            ? DISPLAY_INVALID
            : rgb2hex(rgb).toUpperCase();
                           
        control.textbox.savedValue = control.textbox.value;

        control.textbox.style.color = 
                isDark(rgb) 
            || !isValidRgb(rgb) 
            ? '#fff' 
            : '#000'
    };
}
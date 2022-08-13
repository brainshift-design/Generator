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
            // by doing nothing here I let the OS do its thing
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

            // let tabs  = document.querySelectorAll('.numberControl, .selectControl, .select, .menuSelect, button, .menuButton');
            // let index = slider.tabIndex;

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
              && !control.readOnly)
        {
            e.preventDefault();

            let text = control.textbox.value;

            if (control.textbox.selectionStart != control.textbox.selectionEnd)
                control.textbox.selectionStart =  control.textbox.selectionEnd;

            const pos = Math.min(
                control.textbox.selectionStart,
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

                    control.setValue((val + sign * dec) / control.valueScale);
                    control.updateTextbox();
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

                    control.displayDec = text.length-1 - decIndex;
                    control.setValue((val + sign * dec) / control.valueScale);
                    control.updateTextbox();
                }

                control.textbox.selectionStart =
                control.textbox.selectionEnd   = control.textbox.savedValue.length - revPos;
            }
        }
        else 
        {
            let curVal = control.textbox.value;

            if (      e.key.length == 1
                   && e.key != '?'
                   && !isDigit(e.key)
                   && !isHexDigit(e.key)
                   && !(   ((      e.code == 'Minus'
                                || e.code == 'NumpadSubtract')
                             && !curVal.includes('-'))
                        && control.min < 0)
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
        else                         control.textbox.keyBlur = false;

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
            const _rgb = scaleColor(rgb, 'rgb');

            if (success) 
            {
                control.setValue(
                      value.trim() != '' 
                    ? GColorValue.createFromRgb(_rgb) 
                    : GColorValue.createFromRgb(savedRgb));
            }
            else
                control.setValue(savedRgb);
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
    
        control.textbox.style.position  = 'absolute';
        control.textbox.style.left      = '50%';
        control.textbox.style.transform = 'translate(-50%)';
        control.textbox.style.top       = control.offsetTop    + 1;
        control.textbox.style.width     = control.offsetWidth  - 2;
        control.textbox.style.height    = control.offsetHeight - 2;
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
        const rgb = dataColor2rgb(control.value.toDataColor());

        control.textbox.value =
            !control.value.isValid()
            ? DISPLAY_INVALID
            : rgb2hex(rgb).toUpperCase();
                           
        control.textbox.savedValue  = control.textbox.value;

        control.textbox.style.color = isDark(rgb) ? '#fff' : '#000'
    };
}
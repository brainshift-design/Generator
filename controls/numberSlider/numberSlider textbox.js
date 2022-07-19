function initNumberSliderTextbox(slider)
{
    slider.textbox = createTextbox('numberSliderTextbox');
    slider.textbox.slider = slider;
    


    slider.textbox.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();
    });



    slider.textbox.addEventListener('pointermove', e =>
    {
        e.stopPropagation();
        slider.textbox.style.cursor = 'default';
    });



    slider.textbox.addEventListener('keydown', e =>
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
              && !slider.readOnly)
        {
            // by doing nothing here I let the OS do its thing
        }
        
        else if (   (   e.code == 'Enter'
                     || e.code == 'NumpadEnter')
                 && !slider.readOnly)
        {
            slider.textbox.keyBlur = true;
            slider.textbox.finish(true);
        }

        else if (e.code == 'Escape')
        {
            slider.textbox.keyBlur = true;
            slider.textbox.finish(false);
        }
        else if (e.code == 'Tab')
        {
            e.preventDefault();
            e.stopPropagation();
            
            if (slider.param)
            {
                const params = slider.param.node.params;
                let   index  = slider.param.index;

                slider.textbox.keyBlur = true;
                slider.textbox.finish(true, false);

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

            // let tabs  = document.querySelectorAll('.numberSlider, .selectSlider, .select, .menuSelect, button, .menuButton');
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
              && !slider.readOnly)
        {
            e.preventDefault();

            let text = slider.textbox.value;

            if (   slider.valueCanContainSuffix   
                && text.length >= slider.suffix.length
                && text.substring(text.length - slider.suffix.length) == slider.suffix)
                text = text.substring(0, text.length - slider.suffix.length);


            if (slider.textbox.selectionStart != slider.textbox.selectionEnd)
                slider.textbox.selectionStart =  slider.textbox.selectionEnd;

            const pos = Math.min(
                slider.textbox.selectionStart,
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

                    slider.setValue((val + sign * dec) / slider.valueScale);
                    slider.updateTextbox();
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

                    slider.displayDec = text.length-1 - decIndex;
                    slider.setValue((val + sign * dec) / slider.valueScale);
                    slider.updateTextbox();
                }

                slider.textbox.selectionStart =
                slider.textbox.selectionEnd   = slider.textbox.savedValue.length - revPos - slider.suffix.length;
            }
        }
        else 
        {
            let curVal = slider.textbox.value;

            if (      e.key.length == 1
                   && !isDigit(e.key)
                   && e.key != '?'
                   && (   !slider.valueCanContainSuffix
                       || !slider.suffix.includes(e.key))
                   && (   !slider.showHex 
                       || !isHexDigit(e.key))
                   && (   slider.showHex
                       ||    e.key != '.'
                          && e.key != ',')
                   && !(   ((      e.code == 'Minus'
                                || e.code == 'NumpadSubtract')
                             && !curVal.includes('-'))
                        && slider.min < 0)
                ||     slider.readOnly
                   && !isArrowKey(e.code))
                e.preventDefault();

            curVal =
                curVal == '?'
                ? ''
                :   curVal.substring(0, slider.textbox.selectionStart) 
                  + curVal.substring(slider.textbox.selectionEnd, curVal.length);

                  
            const nextVal = parseFloat(curVal + e.key);

            if (   nextVal < slider.min - 0.001
                || nextVal > slider.max)
                e.preventDefault();            
        }
    });



    slider.textbox.addEventListener('paste', function(e)
    {
        e.preventDefault();

        const str = e.clipboardData.getData('text/plain');

        let val = 
            slider.showHex
            ? parseInt(str, 16)
            : parseFloat(str);

        val = Math.min(Math.max(slider.min, val), slider.max);

        slider.textbox.value = isNaN(val) ? '' : val;
    });



    slider.textbox.addEventListener('focusout', function()
    {
        //console.log('slider.successOnFocusOut', slider.successOnFocusOut);

        if (!slider.textbox.keyBlur) slider.textbox.finish(true);
        else                         slider.textbox.keyBlur = false;

        if (slider.savedSuccessOnFocusOut != null)
        {
            slider.successOnFocusOut      = slider.savedSuccessOnFocusOut;
            slider.savedSuccessOnFocusOut = null;
        }

        slider.parentNode.removeChild(slider.textbox);
        slider.clicked = false;
    });
    


    slider.textbox.finish = function(success, focusSlider = true)
    {
        let   value      = slider.textbox.value;
        const savedValue = slider.textbox.savedValue;

        value = value.replace(slider.suffix, '');
        
        
        let val      = value     .indexOf('?') > -1 ? Number.NaN : (slider.showHex ? parseInt(value,      16) : parseFloat(value     ));
        let savedVal = savedValue.indexOf('?') > -1 ? Number.NaN : (slider.showHex ? parseInt(savedValue, 16) : parseFloat(savedValue));

        if (!isNaN(val))
            val /= slider.valueScale;

       
        const e = new CustomEvent('finishedit', { 'detail': {
            'success':         success,
            'value':           value,
            'oldValue':        savedValue,
            'preventSetValue': false }});

        slider.dispatchEvent(e);


        if (!e.preventSetValue)
        {
            if (success) 
            {
                slider.setValue(
                       value.trim() != '' 
                    && value.trim() != '-'
                    ? val 
                    : savedVal);
            }
            else
                slider.setValue(savedVal);
        }
         
        
        slider.textbox.blur();

        slider.text.style.display = 'block';

        if (   slider.inFocus
            && focusSlider)
            slider.focus();
    };    
    
    

    slider.showTextbox = function()
    {
        slider.text.style.display = 'none';

        slider.inFocus = 
               hasFocus(slider)
            && !slider.clicked;
    
        slider.textbox.style.position  = 'absolute';
        slider.textbox.style.left      = '50%';
        slider.textbox.style.transform = 'translate(-50%)';
        slider.textbox.style.top       = slider.offsetTop    + 1;
        slider.textbox.style.width     = slider.offsetWidth  - 2;
        slider.textbox.style.height    = slider.offsetHeight - 2;
        slider.textbox.style.boxShadow = '0 0 0 1px ' + colorStyleRgb(rgbActiveObject);
        slider.textbox.style.outline   = 'none';
        slider.textbox.style.textAlign = 'center';

        const isConnected =    
               slider.param != null
            && slider.param.input
            && slider.param.input.connected;

        enableElementText(
            slider.textbox, 
               !slider.readOnly
            && !isConnected);

        slider.updateTextbox();
        
        slider.parentNode.appendChild(slider.textbox);
        
        slider.textbox.focus();
        slider.textbox.select();

        slider.textbox.style.cursor = 'default';
    }



    slider.updateTextbox = function()
    {
        slider.textbox.value =
            (isNaN(slider.value)
             ? '?'
             : numToString(
                   slider.value * slider.valueScale, 
                   slider.displayDec, 
                   slider.showHex
               ).toUpperCase())
            + (slider.valueCanContainSuffix ? slider.suffix : '');
            
        slider.textbox.savedValue = slider.textbox.value;
    };
}
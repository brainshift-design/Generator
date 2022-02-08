function initNumberSliderTextbox(slider)
{
    slider.textbox = createTextbox('numberSliderTextbox');
    


    slider.textbox.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();
    });

    slider.textbox.addEventListener('pointermove', e =>
    {
        e.stopPropagation();
        slider.textbox.style.cursor = 'text';
    });



    slider.textbox.addEventListener('keydown', e =>
    {
        e.stopPropagation();


        if (   e.code == 'KeyC'
            && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand("copy");
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
            slider.textbox.finish(true);

        else if (e.code == 'Escape')
            slider.textbox.finish(false);

        else if (e.code == 'Tab')
        {
            e.preventDefault();
            e.stopPropagation();
            
            if (slider.param)
            {
                const params = slider.param.op.params;
                let   index  = params.indexOf(slider.param);

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

        else 
        {
            if (      e.key.length == 1
                   && !isDigitChar(e.key)
                   && (   !slider.showHex 
                       || !isHexDigitChar(e.key))
                   && (   slider.showHex
                       ||    e.key != '.'
                          && e.key != ',') //getUserDecimalSeparator())
                   && !(   (   e.code == 'Minus'
                            || e.code == 'NumpadSubtract')
                        && slider.min < 0)
                ||     slider.readOnly
                   && !isArrowKey(e.code))
                e.preventDefault();

            let curVal = slider.textbox.value;

            curVal = 
                  curVal.substring(0,                           slider.textbox.selectionStart) 
                + curVal.substring(slider.textbox.selectionEnd, curVal.length);

            let nextVal = parseFloat(curVal + e.key);

            if (   nextVal < slider.min - 0.001
                || nextVal > slider.max)
                e.preventDefault();            
        }
    });



    // slider.textbox.addEventListener('input', function()
    // {
    //     slider.setValue(Number(slider.textbox.value));
    // });



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
        if (slider.successOnFocusOut)
            slider.textbox.finish(true);
            
        slider.parentNode.removeChild(slider.textbox);
        slider.clicked = false;
    });
    


    slider.textbox.finish = function(success, focusSlider = true)
    {
        const value      = slider.textbox.value;
        const savedValue = slider.textbox.savedValue;

        let val = 
            slider.showHex
            ? parseInt(value, 16)
            : parseFloat(value);

        if (success) slider.setValue(value.trim() != '' ? Number(val) : savedValue);
        else         slider.setValue(Number(savedValue));

        slider.dispatchEvent(new CustomEvent('finishedit', { 'detail': {
            'success':  success,
            'value':    value,
            'oldValue': savedValue }}));


        slider.textbox.blur();

        if (   slider.inFocus
            && focusSlider)
            slider.focus();
    };    
    
    

    slider.showTextbox = function()
    {
        slider.inFocus = 
                slider == document.activeElement
            && !slider.clicked;
    
        slider.textbox.style.position   = 'absolute';
        slider.textbox.style.left       = '50%';
        slider.textbox.style.transform  = 'translate(-50%)';
        slider.textbox.style.top        = slider.offsetTop    + 1;
        slider.textbox.style.width      = slider.offsetWidth  - 2;
        slider.textbox.style.height     = slider.offsetHeight - 2;
        slider.textbox.style.boxShadow  = '0 0 0 1px ' + colorStyleRgb(rgbActiveObject);
        slider.textbox.style.outline    = 'none';
        slider.textbox.style.textAlign  = 'center';

        enableSliderText(slider.textbox, !slider.readOnly);

    
        slider.textbox.value =
            isNaN(slider.value)
            ? '?'
            : getNumberString(slider.value, slider.dec, slider.showHex).toUpperCase();
            
        slider.textbox.savedValue = slider.textbox.value;
        
        slider.parentNode.appendChild(slider.textbox);
        
        slider.textbox.focus();
        slider.textbox.select();

        slider.textbox.style.cursor = 'text';
    }
}
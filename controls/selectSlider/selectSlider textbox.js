function initSelectSliderTextbox(slider)
{
    slider.textbox = createTextbox('selectSliderTextbox');
    


    slider.textbox.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();
    });

    slider.textbox.addEventListener('pointermove', e =>
    {
        e.stopPropagation();
        slider.textbox.style.cursor = 'text';
    });



    slider.textbox.addEventListener('keydown', function(e)
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
            e.preventDefault();
            document.execCommand("paste");
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

            // var tabs  = document.querySelectorAll('.numberSlider, .selectSlider, .select, .menuSelect, button, .menuButton');
            // var tabs  = document.querySelectorAll('.numberSlider, .selectSlider, .select, .menuSelect, button, .menuButton');
            // var index = slider.tabIndex;

            // for (var i = 0; i < tabs.length; i++) 
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
                   && e.key != '.'
                   && !(   (   e.code == 'Minus'
                            || e.code == 'NumpadSubtract')
                        && slider.min < 0)
                ||     slider.readOnly
                   && !isArrowKey(e.code))
                  e.preventDefault();

            var t = slider.textbox;

            var curVal = t.value;

            curVal = 
                  curVal.substring(0, t.selectionStart) 
                + curVal.substring(t.selectionEnd, curVal.length);

            var nextVal = parseFloat(curVal + e.key);

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

        var val = parseFloat(e.clipboardData.getData('text/plain'));
        val = Math.min(Math.max(slider.min, val), slider.max);

        slider.textbox.value = isNaN(val) ? '' : val;
    });



    slider.textbox.addEventListener('focusout', function()
    {
        slider.parentNode.removeChild(slider.textbox);
        slider.clicked = false;
    });
    


    slider.textbox.finish = function(success, focusSlider = true)
    {
        slider.dispatchEvent(new CustomEvent('finishedit', { 'detail': {
            'success':  success,
            'value':    slider.textbox.value,
            'oldValue': slider.textbox.savedValue }}));

        if (success) slider.setValue(Number(slider.textbox.value));
        else         slider.setValue(Number(slider.textbox.savedValue));

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
    
        slider.textbox.style.position        = 'absolute';
      
        slider.textbox.style.left            = '50%';
        slider.textbox.style.transform       = 'translate(-50%)';
        slider.textbox.style.top             = slider.offsetTop    + 1;
        slider.textbox.style.width           = slider.offsetWidth  - 2;
        slider.textbox.style.height          = slider.offsetHeight - 2;
        slider.textbox.style.boxShadow       = '0 0 0 1px ' + colorStyleRgb(rgbActiveObject);
        slider.textbox.style.outline         = 'none';
        slider.textbox.style.textAlign       = 'center';
        slider.textbox.style.color           = 'black';//slider.textColor;
        slider.textbox.style.fontStyle = slider.readOnly ? 'italic' : 'normal';
        
        slider.textbox.style.backgroundColor = 
            slider.backColor != 'transparent' 
            ? rgb_a(slider.backColor, 0.9) 
            : '#fffd';


        slider.textbox.value                 = numToString(slider.value, slider.editDec);
        slider.textbox.savedValue            = slider.textbox.value;
        
        slider.parentNode.appendChild(slider.textbox);
        
        slider.textbox.focus();
        slider.textbox.select();

        slider.textbox.style.cursor = 'text';
    }
}
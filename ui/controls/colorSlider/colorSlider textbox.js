function initColorSliderTextbox(slider)
{
    slider.textbox = document.createElement('INPUT');
    slider.textbox.setAttribute('type', 'text'); 
    slider.textbox.className = 'sliderText';
    
    slider.textbox.addEventListener('keydown', function(e)
    {
        if (   e.code == 'KeyC'
            && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand("copy");
        }
        else if (e.code == 'KeyV'
              && getCtrlKey(e))
        {
            e.preventDefault();
            document.execCommand("paste");
        }
        
        else if (e.code == 'Enter'
              || e.code == 'NumpadEnter')
            slider.textbox.finish(true);

        else if (e.code == 'Escape')
            slider.textbox.finish(false);

        else if (e.code == 'Tab')
        {
            e.preventDefault();
            
            var tabs  = document.querySelectorAll('.slider, .select, .menuSelect, button, .menuButton');
            var index = slider.tabIndex;

            for (var i = 0; i < tabs.length; i++) 
            {
                if (   e.shiftKey && tabs[i].tabIndex == index - 1
                    ||               tabs[i].tabIndex == index + 1) 
                {
                    if (tabs[i].className == 'slider')
                        tabs[i].showTextbox();
                    else 
                    {
                        document.activeElement.blur();
                        tabs[i].focus();
                    }

                    break;
                }
            }
        }

        else 
        {
            if (   e.key.length == 1
                && !isDigit(e.key)
                && e.key != '.'
                && !(   (   e.code == 'Minus'
                         || e.code == 'NumpadSubtract')
                     && slider.min < 0))
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
    


    slider.textbox.finish = function(success)
    {
        if (success) slider.setValue(Number(slider.textbox.value     ));
        else         slider.setValue(Number(slider.textbox.savedValue));

        slider.textbox.blur();

        if (slider.inFocus)
            slider.focus();
    };    
    
    
    
    slider.showTextbox = function()
    {
        slider.inFocus = 
                slider == document.activeElement
            && !slider.clicked;
    
        slider.textbox.style.position = 'absolute';
    
        slider.textbox.style.left      = slider.offsetLeft   + 1;
        slider.textbox.style.top       = slider.offsetTop    + 1;
        slider.textbox.style.width     = slider.offsetWidth  - 2;
        slider.textbox.style.height    = slider.offsetHeight - 2;
        slider.textbox.style.boxShadow = '0 0 0 1px ' + rgbActiveObject;
        slider.textbox.style.outline   = 'none';
    
        slider.textbox.style.textAlign = 'center';
    
        slider.textbox.value = numToString(slider.value, slider.editDec);
        slider.textbox.savedValue = slider.textbox.value;
        
        slider.parentNode.appendChild(slider.textbox);
        
        slider.textbox.focus();
        slider.textbox.select();
    }
}
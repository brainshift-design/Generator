function initMenuSelectTextbox(select)
{
    select.textbox = createTextbox('menuSelectText');
    
    
    select.textbox.addEventListener('keydown', function(e)
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
            select.textbox.finish(true);

        else if (e.code == 'Escape')
            select.textbox.finish(false);

        else if (e.code == 'Tab')
        {
            e.preventDefault();
            
            let tabs  = document.querySelectorAll('.slider, .menuSelect, .select, button, .menuButton');
            let index = select.tabIndex;

            for (let i = 0; i < tabs.length; i++) 
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
                     && select.min < 0))
                e.preventDefault();

            let t = select.textbox;

            let curVal = t.value;

            curVal = 
                  curVal.substring(0, t.selectionStart) 
                + curVal.substring(t.selectionEnd, curVal.length);

            let nextVal = parseFloat(curVal + e.key);

            if (   nextVal < select.min - 0.001
                || nextVal > select.max)
                e.preventDefault();            
        }
    });


    // slider.textbox.addEventListener('input', function()
    // {
    //     slider.setValue(Number(slider.textbox.value));
    // });


    select.textbox.addEventListener('paste', function(e)
    {
        e.preventDefault();

        let val = parseFloat(e.clipboardData.getData('text/plain'));
        val = Math.min(Math.max(select.min, val), select.max);

        select.textbox.value = isNaN(val) ? '' : val;
    });


    select.textbox.addEventListener('focusout', function()
    {
        select.parentNode.removeChild(select.textbox);
        select.clicked = false;
    });
    

    select.textbox.finish = function(success)
    {
        if (success) select.setValue(Number(select.textbox.value     ));
        else         select.setValue(Number(select.textbox.savedValue));

        select.textbox.blur();

        if (select.inFocus)
            select.focus();
    };    
    
    
    select.showTextbox = function()
    {
        select.inFocus = 
                select == document.activeElement
            && !select.clicked;
    
        select.textbox.style.position = 'absolute';
    
        select.textbox.style.left      = select.offsetLeft   + 1;
        select.textbox.style.top       = select.offsetTop    + 1;
        select.textbox.style.width     = select.offsetWidth  - 2;
        select.textbox.style.height    = select.offsetHeight - 2;
        select.textbox.style.boxShadow = '0 0 0 1px ' + colorStyleRgb(rgbActiveObject);
        select.textbox.style.outline   = 'none';
    
        select.textbox.style.textAlign = 'center';
    
        select.textbox.value = numToString(select.value, select.editDec);
        select.textbox.savedValue = select.textbox.value;
        
        select.parentNode.appendChild(select.textbox);
        
        select.textbox.focus();
        select.textbox.select();
    }
}
function initCheckbox(checkbox, name, defaultChecked)
{
    // control is also the div

    checkbox.className         = 'checkbox';
    
    checkbox.checked           = defaultChecked;

    checkbox.name              = name;
     
    // checkbox.backStyleLight    = 'rgba(255, 255, 255, 0.95)';
    // checkbox.valueStyleLight   = 'transparent';
    // checkbox.textStyleLight    = '#000';
                
    // checkbox.backStyleDark     = 'rgba(56, 56, 56, 0.95)';
    // checkbox.valueStyleDark    = 'transparent';
    // checkbox.textStyleDark     = '#eee';

    checkbox.style.display     = 'inline';
             
    checkbox.onchange          = new Event('change');


    checkbox.check = createDiv('checkboxCheck');
    checkbox.text  = createDiv('checkboxText');

    checkbox.appendChild(checkbox.text);
    checkbox.appendChild(checkbox.focus);


    checkbox.setName = function(name)
    {
        checkbox.name = name;
        checkbox.update();
    };



    checkbox.setChecked = function(checked, fireChangeEvent = true)
    {
        const oldChecked = checkbox.checked;

        checkbox.checked = checked;

        checkbox.update();

        if (   fireChangeEvent
            && checked != oldChecked)
            checkbox.dispatchEvent(checkbox.onchange);
    };




    checkbox.update = function()
    {
        // const sw = checkbox.getClientWidth();
        // const sh = checkbox.getClientHeight();


        // checkbox.updateColors();
        // checkbox.updateText();
        // checkbox.updateFocus(sw, sh);
        

        // checkbox.cachedOffsetLeft   = null;
        // checkbox.cachedClientWidth  = null;
        // checkbox.cachedClientHeight = null;
    };
}
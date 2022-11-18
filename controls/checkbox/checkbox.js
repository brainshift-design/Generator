function initCheckbox(checkbox, name, defaultChecked)
{
    // control is also the div

    checkbox.className         = 'checkbox';
    
    checkbox.checked           = defaultChecked;
    checkbox.name              = name;
    
    checkbox.style.display     = 'inline';
             
    checkbox.onchange          = new Event('change');


    checkbox.check = createDiv('checkboxCheck');
    checkbox.text  = createDiv('checkboxText');

    checkbox.appendChild(checkbox.check);
    checkbox.appendChild(checkbox.text);



    checkbox.addEventListener('pointerup', () =>
    {
        checkbox.setChecked(!checkbox.checked);
    })



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
        if (checkbox.checked)
        {
            checkbox.check.style.backgroundColor    = 'var(--figma-color-bg-brand)';
            checkbox.check.style.backgroundImage    = 'url(\'data:image/svg+xml;utf8,<svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.17647 1.88236L3.05882 3.76472L6.82353 0L8 1.17648L3.05882 6.11768L0 3.05884L1.17647 1.88236Z" fill="white"/></svg>\')';
            checkbox.check.style.backgroundPosition = '50% 50%';
            checkbox.check.style.backgroundRepeat   = 'no-repeat';
            checkbox.check.style.boxShadow          = 'none';
        }
        else
        {
            checkbox.check.style.background         = 'transparent';
            checkbox.check.style.boxShadow          = '0 0 0 1px var(--figma-color-text) inset';
        }

        checkbox.text.innerHTML = name;
    };



    checkbox.update();
}
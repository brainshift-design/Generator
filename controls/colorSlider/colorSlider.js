function initColorSliderChildren(slider)
{
    slider.text  = createDiv('colorSliderText');
    slider.focus = createDiv('colorSliderFocus');

    slider.appendChild(slider.text);
    slider.appendChild(slider.focus);
}


function initColorSlider(param, slider, width, height, id, name, showName, def, dragScale = 0.05, wheelScale = 1, acc = 0)
{
    slider.param                  = param;
     
    slider.className              = 'colorSlider';
     
    slider.width                  = width;
    slider.height                 = height;
             
    slider.style.width            = width;
    slider.style.height           = height;
             
    slider.value                  = def;
    slider.acc                    = acc;
     
    slider.id                     = id;
    slider.name                   = name;
     
    slider.dragReverse            = false;
    slider.dragScale              = dragScale;
    slider.wheelScale             = wheelScale;
             
    slider.backColorLight         = 'transparent';
    slider.valueColorLight        = '#7772';
    slider.textColorLight         = '#000';
                
    slider.backColorDark          = 'transparent';
    slider.valueColorDark         = '#fff4';
    slider.textColorDark          = '#eee';
                
    slider.fontSize               = 11;
             
    slider.style.display          = 'inline';
             
    slider.mouseOver              = false;
    slider.buttonDown0            = false;
    slider.buttonDown1            = false;
             
    slider.clickSize              = 4;
    slider.moved                  = false;
         
    slider.tabIndex               = 0;
    slider.inFocus                = false;
    slider.clicked                = false;
 
    slider.startValue             = 0;
    slider.oldValue; 
 
    slider.wrapValue              = false;
     
    slider.showName               = showName;
    slider.showHex                = false;
         
    slider.enableChangeEvent      = true;
    
    slider.successOnFocusOut      = false;
    slider.keyBlur                = false;
    
    slider.pointerEvents          = true;
    slider.readOnly               = false;
     
    slider.valueText              = '';
     
    slider.onstartchange          = new Event('startchange');
    slider.onchange               = new Event('change');
    slider.onconfirm              = new Event('confirm');


    initColorSliderChildren(slider);    
    initColorSliderTextbox(slider);
    initColorSliderEvents(slider);



    slider.setName = function(name)
    {
        slider.name = name;
        slider.update();
    };



    slider.setValue = function(value, fireChangeEvent = true, confirm = true, forceChange = false, fullRange = true)
    {
        const oldValue = slider.value.copy();

        slider.value = value.copy();

        slider.update();

        if (   fireChangeEvent
            && slider.enableChangeEvent
            && value != slider.prevValue)
            slider.dispatchEvent(slider.onchange);

        if (   confirm
            && slider.enableChangeEvent
            && value != oldValue)
            slider.dispatchEvent(slider.onconfirm);
    };




    slider.update = function()
    {
        const sw = slider.getClientWidth();
        const sh = slider.getClientHeight();


        slider.updateColors();
        slider.updateText();
        slider.updateFocus(sw, sh);
        

        slider.cachedOffsetLeft   = null;
        slider.cachedClientWidth  = null;
        slider.cachedClientHeight = null;
    };



    slider.updateColors = function()
    {
        const rgb = dataColor2rgb(slider.value.toDataColor());

        slider     .style.background = colorStyleRgb(rgb);
        slider.text.style.color      = isDark(rgb) ? '#fff8' : '#0008'
    };



    slider.updateText = function()
    {
        slider.text.innerHTML = '';
        
        if (   slider.name.length > 0
            && slider.showName)
            slider.text.innerHTML += (slider.name.trim() != '' ? '<span class="colorSliderName">' + slider.name + '</span>&nbsp;&nbsp;' : '');

        slider.text.innerHTML += rgb2hex(dataColor2rgb(slider.value.toDataColor()));
    };



    slider.updateFocus = function(sw, sh)
    {
        slider.focus.style.left   = 0;
        slider.focus.style.top    = 0;
        slider.focus.style.width  = sw;
        slider.focus.style.height = sh;
    };



    slider.lockPointer = function(pointerId)
    {
        clearTimeout(slider.clickTimer);

        slider.requestPointerLock =    
               slider.      requestPointerLock 
            || slider.   mozRequestPointerLock
            || slider.webkitRequestPointerLock;

        slider.requestPointerLock();
    };



    slider.unlockPointer = function(pointerId)
    {
        document.exitPointerLock =    
               document.      exitPointerLock    
            || document.   mozExitPointerLock
            || document.webkitExitPointerLock;

        document.exitPointerLock();
    };



    slider.isPointerLocked = function()
    {
        return (document.      pointerLockElement === slider 
             || document.   mozPointerLockElement === slider
             || document.webkitPointerLockElement === slider);
    }



    slider.getOffsetLeft   = () => slider.cachedOffsetLeft   = slider.cachedOffsetLeft   || slider.offsetLeft;
    slider.getClientWidth  = () => slider.cachedClientWidth  = slider.cachedClientWidth  || slider.clientWidth;
    slider.getClientHeight = () => slider.cachedClientHeight = slider.cachedClientHeight || slider.clientHeight;



    slider.update();
}
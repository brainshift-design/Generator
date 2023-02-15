function initColorControlChildren(control)
{
    control.text  = createDiv('colorControlText');
    control.focus = createDiv('colorControlFocus');

    control.appendChild(control.text);
    control.appendChild(control.focus);
}



function initColorControl(param, control, width, height, id, name, showName, defaultValue, dragScale = 0.05, wheelScale = 1, acc = 0)
{
    // control is also the div

    control.param             = param;
     
    control.className         = 'colorControl';
     
    control.width             = width;
    control.height            = height;
             
    control.style.width       = width;
    control.style.height      = height;
             
    control.showColor         = true;

    control.value             = defaultValue;
    control.acc               = acc;
     
    control.id                = id;
    control.name              = name;
     
    control.dragReverse       = false;
    control.dragScale         = dragScale;
    control.wheelScale        = wheelScale;
             
    control.backStyleLight    = 'rgba(255, 255, 255, 0.95)';
    control.valueStyleLight   = 'transparent';
    control.textStyleLight    = '#000';
                
    control.backStyleDark     = 'rgba(56, 56, 56, 0.95)';
    control.valueStyleDark    = 'transparent';
    control.textStyleDark     = '#eee';

    control.fontSize          = 11;
             
    control.style.display     = 'inline';
             
    control.mouseOver         = false;
    control.buttonDown0       = false;
    control.buttonDown1       = false;
             
    control.clickSize         = 4;
    control.moved             = false;
         
    control.tabIndex          = 0;
    control.inFocus           = false;
    control.clicked           = false;
 
    control.startValue        = 0;
    control.oldValue; 
 
    control.wrapValue         = false;
     
    control.showName          = showName;
    control.showHex           = false;
         
    control.enableChangeEvent = true;
    
    control.successOnFocusOut = false;
    control.keyBlur           = false;
    
    control.pointerEvents     = true;
    control.readOnly          = false;
     
    control.valueText         = '';
     
    control.measureData       = {};


    control.onstartchange     = new Event('startchange');
    control.onchange          = new Event('change');
    control.onconfirm         = new Event('confirm');


    initColorControlChildren(control);    
    initColorControlTextbox (control);
    initColorControlEvents  (control);



    control.setName = function(name)
    {
        control.name = name;
        control.update();
    };



    control.setValue = function(value, fireChangeEvent = true, confirm = true)
    {
        if (!(value instanceof ColorValue))
            console.assert(false, 'colorControl.setValue(value) is ' + typeof value + ', must be a ColorValue');


        const oldValue = control.value.copy();

        control.value = value.copy();


        if (control.showColor)
        {
            const rgb = control.value.toRgb();

            if (!rgbIsNaN(rgb))
            {
                control.valueStyleLight =
                control.valueStyleDark  = rgb2style(rgb);

                control.textStyleLight  = 
                control.textStyleDark   = rgba2style(getTextColorFromBackColor(rgb));
            }
            else
            {
                control.valueStyleLight =
                control.valueStyleDark  = 'var(--figma-color-bg)';
                
                control.textStyleLight  = 'black';
                control.textStyleDark   = 'white';
            }
        }


        control.update();


        if (   fireChangeEvent
            && control.enableChangeEvent
            && !value.equals(control.prevValue))
            control.dispatchEvent(control.onchange);

        if (   confirm
            && control.enableChangeEvent
            && !value.equals(oldValue))
            control.dispatchEvent(control.onconfirm);
    };




    control.updateMeasureData = function()
    {
        control.measureData = 
        {
            offsetRect: offsetRect(control),
            clientRect: clientRect(control)
        };
    };



    control.update = function()
    {
        console.log('control.measureData =', control.measureData);
        const sw = control.measureData.clientRect.width;
        const sh = control.measureData.clientRect.height;


        control.updateColors();
        control.updateText();
        control.updateFocus(sw, sh);
        

        control.cachedOffsetLeft   = null;
        control.cachedClientWidth  = null;
        control.cachedClientHeight = null;
    };



    control.updateColors = function()
    {
        control        .style.background = 
        control.textbox.style.background = 
            control.showColor
            ? (darkMode 
               ? control.valueStyleDark 
               : control.valueStyleLight)
            : (darkMode
               ? control.backStyleDark 
               : control.backStyleLight);

        control.text   .style.color = 
        control.textbox.style.color = 
            darkMode 
            ? control.textStyleDark 
            : control.textStyleLight;
    };



    control.updateText = function()
    {
        control.text.innerHTML = '';
        
        if (   control.name.length > 0
            && control.showName)
            control.text.innerHTML += (control.name.trim() != '' ? '<span class="colorControlName">' + control.name + '</span>&nbsp;&nbsp;' : '');

        control.text.innerHTML += 
               control.value.isValid()
            && rgbIsValid(control.value.toRgb())
            ? rgb2hex(control.value.toRgb())
            : UNKNOWN_DISPLAY;
    };



    control.updateFocus = function(sw, sh)
    {
        control.focus.style.left   = 0;
        control.focus.style.top    = 0;
        control.focus.style.width  = sw;
        control.focus.style.height = sh;
    };



    control.lockPointer = function(pointerId)
    {
        clearTimeout(control.clickTimer);

        control.requestPointerLock =    
               control.      requestPointerLock 
            || control.   mozRequestPointerLock
            || control.webkitRequestPointerLock;

        control.requestPointerLock();
    };



    control.unlockPointer = function(pointerId)
    {
        document.exitPointerLock =    
               document.      exitPointerLock    
            || document.   mozExitPointerLock
            || document.webkitExitPointerLock;

        document.exitPointerLock();
    };



    control.isPointerLocked = function()
    {
        return (document.      pointerLockElement === control 
             || document.   mozPointerLockElement === control
             || document.webkitPointerLockElement === control);
    }



    control.getOffsetLeft   = () => control.cachedOffsetLeft   = control.cachedOffsetLeft   || control.measureData.offsetRect.x;//offsetLeft;
    control.getClientWidth  = () => control.cachedClientWidth  = control.cachedClientWidth  || control.measureData.clientRect.width;//clientWidth;
    control.getClientHeight = () => control.cachedClientHeight = control.cachedClientHeight || control.measureData.clientRect.height;//clientHeight;
}
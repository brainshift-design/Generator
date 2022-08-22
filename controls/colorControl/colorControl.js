function initColorControlChildren(control)
{
    control.text  = createDiv('colorControlText');
    control.focus = createDiv('colorControlFocus');

    control.appendChild(control.text);
    control.appendChild(control.focus);
}



function initColorControl(param, control, width, height, id, name, showName, def, dragScale = 0.05, wheelScale = 1, acc = 0)
{
    control.param                  = param;
     
    control.className              = 'colorControl';
     
    control.width                  = width;
    control.height                 = height;
             
    control.style.width            = width;
    control.style.height           = height;
             
    control.value                  = def;
    control.acc                    = acc;
     
    control.id                     = id;
    control.name                   = name;
     
    control.dragReverse            = false;
    control.dragScale              = dragScale;
    control.wheelScale             = wheelScale;
             
    control.valueColorLight        = 'transparent';
    control.textColorLight         = '#000';
                
    control.valueColorDark         = 'transparent';
    control.textColorDark          = '#eee';

    control.fontSize               = 11;
             
    control.style.display          = 'inline';
             
    control.mouseOver              = false;
    control.buttonDown0            = false;
    control.buttonDown1            = false;
             
    control.clickSize              = 4;
    control.moved                  = false;
         
    control.tabIndex               = 0;
    control.inFocus                = false;
    control.clicked                = false;
 
    control.startValue             = 0;
    control.oldValue; 
 
    control.wrapValue              = false;
     
    control.showName               = showName;
    control.showHex                = false;
         
    control.enableChangeEvent      = true;
    
    control.successOnFocusOut      = false;
    control.keyBlur                = false;
    
    control.pointerEvents          = true;
    control.readOnly               = false;
     
    control.valueText              = '';
     
    control.onstartchange          = new Event('startchange');
    control.onchange               = new Event('change');
    control.onconfirm              = new Event('confirm');


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
        {
            console.trace();
            console.assert(false, 'colorControl.setValue(value) is ' + typeof value + ', must be a ColorValue');
        }

        const oldValue = control.value.copy();

        control.value = value.copy();


        const rgb = dataColor2rgb(control.value.toDataColor());

        if (isValidRgb(rgb))
        {
            control.valueColorLight =
            control.valueColorDark  = rgb2style(rgb);
            control. textColorLight =
            control. textColorDark  = isDark(rgb) ? '#fff8' : '#0008'
        }
        else
        {
            control.valueColorLight =
            control.valueColorDark  = 'transparent';
            control. textColorLight =
            control. textColorDark  = '#fff8';
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




    control.update = function()
    {
        const sw = control.getClientWidth();
        const sh = control.getClientHeight();


        control.updateColors();
        control.updateText();
        control.updateFocus(sw, sh);
        

        control.cachedOffsetLeft   = null;
        control.cachedClientWidth  = null;
        control.cachedClientHeight = null;
    };



    control.updateColors = function()
    {
        control     .style.background = isDarkMode() ? control.valueColorDark : control.valueColorLight;
        control.text.style.color      = isDarkMode() ? control. textColorDark : control. textColorLight;
    };



    control.updateText = function()
    {
        control.text.innerHTML = '';
        
        if (   control.name.length > 0
            && control.showName)
            control.text.innerHTML += (control.name.trim() != '' ? '<span class="colorControlName">' + control.name + '</span>&nbsp;&nbsp;' : '');

        control.text.innerHTML += 
               control.value.isValid()
            && isValidRgb(dataColor2rgb(control.value.toDataColor()))
            ? rgb2hex(dataColor2rgb(control.value.toDataColor()))
            : DISPLAY_INVALID;
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



    control.getOffsetLeft   = () => control.cachedOffsetLeft   = control.cachedOffsetLeft   || control.offsetLeft;
    control.getClientWidth  = () => control.cachedClientWidth  = control.cachedClientWidth  || control.clientWidth;
    control.getClientHeight = () => control.cachedClientHeight = control.cachedClientHeight || control.clientHeight;
}
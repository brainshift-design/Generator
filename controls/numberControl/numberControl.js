function initNumberControlChildren(control)
{
    control.bar   = createDiv('numberControlBar');
    control.text  = createDiv('numberControlText');
    control.focus = createDiv('numberControlFocus');

    control.appendChild(control.bar);
    control.appendChild(control.text);
    control.appendChild(control.focus);
}



function initNumberControl(param, control, width, height, id, name, showName, min, max, defValue, dec = 0, dragScale = 0.05, wheelScale = 1, acc = 0, suffix = '')
{
    control.param                  = param;
     
    control.width                  = width;
    control.height                 = height;
             
    control.style.width            = width;
    control.style.height           = height;
             
    control.min                    = min;
    control.max                    = max;
    control.value                  = defValue;
    control.acc                    = acc;
     
    control.dec                    =
    control.displayDec             = dec;
         
    control.displayMin             = min;
    control.displayMax             = max;
    control.valueScale             = 1;
                
    control.id                     = id;
    control.name                   = name;
    control.suffix                 = suffix;
    control.valueCanContainSuffix  = false;
     
    control.dragReverse            = false;
    control.dragScale              = dragScale;
    control.wheelScale             = wheelScale;
             
    control.backColorLight         = 'transparent';
    control.valueColorLight        = '#7772';
    control.textColorLight         = '#000';
                
    control.backColorDark          = 'transparent';
    control.valueColorDark         = '#ffffff30';
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
     
    control.barTop                 = 0;
    control.barBottom              = 1;
     
    control.ranges                 = [];
    control.rangeDivs              = [];
     
    control.options                = []; // if dec == 0, show named choices instead of a value
 
     
    control.onstartchange          = new Event('startchange');
    control.onchange               = new Event('change');
    control.onconfirm              = new Event('confirm');


    initNumberControlChildren(control);    
    initNumberControlTextbox (control);
    initNumberControlEvents  (control);



    control.setName = function(name)
    {
        control.name = name;
        control.update();
    };



    control.setValue = function(value, fireChangeEvent = true, confirm = true, forceChange = false, fullRange = true)
    {
        const oldValue = control.value;


        const dec = Math.pow(10, Math.abs(control.dec));

        value = Math.round(value * dec) / dec;

        if (control.wrapValue)
        {
            while (value < control.displayMin) value += control.displayMax - control.displayMin;
            while (value > control.displayMax) value -= control.displayMax - control.displayMin;
        }
        else if (fullRange)
            value = Math.min(Math.max(control.min, value), control.max);
        else
            value = Math.min(Math.max(control.displayMin, value), control.displayMax);


        if (    isNaN(value) && !isNaN(oldValue)
            || !isNaN(value) &&  isNaN(oldValue)
            || Math.abs(value - oldValue) > Number.EPSILON)
        {
            control.value = value;

            control.update();

            if (   fireChangeEvent
                && control.enableChangeEvent
                && value != control.prevValue)
                control.dispatchEvent(control.onchange);

            if (   confirm
                && control.enableChangeEvent
                && value != oldValue)
                control.dispatchEvent(control.onconfirm);
        }
    };




    control.setSuffix = function(suffix, valueCanContainSuffix = false)
    {
        control.suffix                = suffix;
        control.valueCanContainSuffix = valueCanContainSuffix;
    };
    


    control.setMin = (min, dispatchEvents = true) =>
    {
        control.min        = min;
        control.displayMin = min;

        // if (slider.value < min) 
        //     slider.setValue(min, true, true, dispatchEvents);
    };



    control.setMax = (max, dispatchEvents = true) =>
    {
        control.max        = max;
        control.displayMax = max;

        // if (max < slider.value) 
        //     slider.setValue(max, true, true, dispatchEvents);
    };



    control.setDecimals = (dec, dspDec = dec) =>
    {
        control.dec        = dec;
        control.displayDec = dspDec;
    };



    control.update = function()
    {
        const sx = control.getOffsetLeft();
        const sw = control.getClientWidth();
        const sh = control.getClientHeight();

        const cx = -control.displayMin / (control.displayMax - control.displayMin) * sw;
        const v  =  control.value      / (control.displayMax - control.displayMin);

        control.updateBar(sx, cx, v, sw, sh);
        control.updateColors();
        control.updateText();
        control.updateFocus(sw, sh);
        
        updateControlRanges(control, sw, sh);


        control.cachedOffsetLeft   = null;
        control.cachedClientWidth  = null;
        control.cachedClientHeight = null;
    };



    control.updateBar = function(sx, cx, v, sw, sh)
    {
        if (control.dragReverse)
            v *= -1;

            
        if (isNaN(control.value))
            control.bar.style.display = 'none';

        else
        {
            control.bar.style.display = 'block';

            const x = 
                v >= 0
                ? sx + cx
                : sx + cx + v * sw;

            control.bar.style.left   = Math.max(0, x);
            control.bar.style.width  = Math.min(Math.max(0, Math.round(Math.abs(v) * sw) + Math.min(0, x)), control.offsetWidth);

            control.bar.style.top    = sh * control.barTop;
            control.bar.style.height = sh * (control.barBottom - control.barTop);
        }
    };



    control.updateColors = function()
    {
        control     .style.background = isDarkMode() ? control.backColorDark  : control.backColorLight;
        control.bar .style.background = isDarkMode() ? control.valueColorDark : control.valueColorLight;
        control.text.style.color      = isDarkMode() ? control.textColorDark  : control.textColorLight;
    };



    control.updateText = function()
    {
        control.text.innerHTML = '';
        
        if (   control.name.length > 0
            && control.showName)
            control.text.innerHTML += '<span class="numberControlName">' + control.name + "</span>&nbsp;&nbsp;";

        control.text.innerHTML += control.getValueText() + control.suffix;
    };



    control.updateFocus = function(sw, sh)
    {
        control.focus.style.left   = 0;
        control.focus.style.top    = 0;
        control.focus.style.width  = sw;
        control.focus.style.height = sh;
    };



    control.getValueText = function()
    {
        if (   control.options.length > 0
            && control.displayDec == 0)
        {
            if (   control.value <  0 
                || control.value >= control.options.length)
                return DISPLAY_INVALID;
            else
                return control.options[Math.round(control.value)];
        }
        else if (control.valueText != '')
        {
            return control.valueText;
        }
        else
        {
            return isNaN(control.value)
                   ? DISPLAY_INVALID
                   : Math.abs(control.value * control.valueScale) > 999999
                     ? (control.value * control.valueScale).toExponential(1)
                     : numToString(
                           control.value * control.valueScale, 
                           control.displayDec, 
                           control.showHex
                       ).toUpperCase();
        }
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



    control.update();
}
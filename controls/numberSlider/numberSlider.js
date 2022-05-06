function initNumberSliderChildren(slider)
{
    slider.bar   = createDiv('numberSliderBar');
    slider.text  = createDiv('numberSliderText');
    slider.focus = createDiv('numberSliderFocus');

    slider.appendChild(slider.bar);
    slider.appendChild(slider.text);
    slider.appendChild(slider.focus);
}



function initNumberSlider(param, slider, width, height, id, name, showName, min, max, def, dec = 0, dragScale = 0.05, wheelScale = 1, acc = 0, suffix = '', log = false)
{
    slider.param                  = param;
     
    slider.className              = 'numberSlider';
     
    slider.width                  = width;
    slider.height                 = height;
             
    slider.style.width            = width;
    slider.style.height           = height;
             
    slider.min                    = min;
    slider.max                    = max;
    slider.value                  = def;
    slider.acc                    = acc;
     
    slider.dec                    =
    slider.displayDec             = dec;
         
    slider.displayMin             = min;
    slider.displayMax             = max;
    slider.valueScale             = 1;
                
    slider.id                     = id;
    slider.name                   = name;
    slider.suffix                 = suffix;
    slider.valueCanContainSuffix  = false;
    slider.log                    = log;
     
    slider.dragScale              = dragScale;
    slider.wheelScale             = wheelScale;
             
    slider.backColor              = 'transparent';
    slider.valueColor             = '#7772';
    slider.textColor              = '#000';
                
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
     
    slider.barTop                 = 0;
    slider.barBottom              = 1;
     
    slider.ranges                 = [];
    slider.rangeDivs              = [];
     
    slider.options                = []; // if dec == 0, show named choices instead of a value
 
     
    slider.onstartchange          = new Event('startchange');
    slider.onchange               = new Event('change');
    slider.onconfirm              = new Event('confirm');


    initNumberSliderChildren(slider);    
    initNumberSliderTextbox(slider);
    initNumberSliderEvents(slider);



    slider.setName = function(name)
    {
        slider.name = name;
        slider.update();
    };



    slider.setValue = function(value, fireChangeEvent = true, confirm = true, forceChange = false, fullRange = true)
    {
        const oldValue = slider.value;


        // if (isNaN(value))
        //     forceChange = true;

        // else
        // {
            const dec = Math.pow(10, Math.abs(slider.dec));

            value = Math.round(value * dec) / dec;

            if (slider.wrapValue)
            {
                while (value < slider.displayMin) value += slider.displayMax - slider.displayMin;
                while (value > slider.displayMax) value -= slider.displayMax - slider.displayMin;
            }
            else if (fullRange)
                value = Math.min(Math.max(slider.min, value), slider.max);
            else
                value = Math.min(Math.max(slider.displayMin, value), slider.displayMax);
        // }


        if (   /*forceChange
            || isNaN(oldValue)*/
                isNaN(value) && !isNaN(oldValue)
            || !isNaN(value) &&  isNaN(oldValue)
            || Math.abs(value - oldValue) > Number.EPSILON)
        {
            slider.value = value;

            slider.update();

            if (   fireChangeEvent
                && slider.enableChangeEvent
                && value != slider.prevValue)
                slider.dispatchEvent(slider.onchange);

            if (   confirm
                && slider.enableChangeEvent
                && value != oldValue)
                slider.dispatchEvent(slider.onconfirm);
        }
    };




    slider.setSuffix = function(suffix, valueCanContainSuffix = false)
    {
        slider.suffix                = suffix;
        slider.valueCanContainSuffix = valueCanContainSuffix;
    };
    


    slider.setMin = (min, dispatchEvents = true) =>
    {
        slider.min        = min;
        slider.displayMin = min;

        if (slider.value < min) 
            slider.setValue(min, true, true, dispatchEvents);
    };



    slider.setMax = (max, dispatchEvents = true) =>
    {
        slider.max        = max;
        slider.displayMax = max;

        if (max < slider.value) 
            slider.setValue(max, true, true, dispatchEvents);
    };



    slider.setDecimals = (dec, dspDec = dec) =>
    {
        slider.dec        = dec;
        slider.displayDec = dspDec;
    };



    slider.update = function()
    {
        const sw = slider.clientWidth;
        const sh = slider.clientHeight;

        const sx = slider.offsetLeft;
        const cx = -slider.displayMin / (slider.displayMax - slider.displayMin) * sw;
        const v  =  slider.value      / (slider.displayMax - slider.displayMin);

        slider.updateBar(sx, cx, v, sw, sh);
        slider.updateColors();
        slider.updateText();
        slider.updateFocus(sw, sh);
        
        updateSliderRanges(slider, sw, sh);
    };



    slider.updateBar = function(sx, cx, v, sw, sh)
    {
        if (isNaN(slider.value))
            slider.bar.style.display = 'none';

        else
        {
            slider.bar.style.display = 'block';

            const x = 
                v >= 0
                ? sx + cx
                : sx + cx + v * sw;

            slider.bar.style.left   = Math.max(0, x);
            slider.bar.style.width  = Math.min(Math.max(0, Math.round(Math.abs(v) * sw) + Math.min(0, x)), slider.offsetWidth);

            slider.bar.style.top    = sh * slider.barTop;
            slider.bar.style.height = sh * (slider.barBottom - slider.barTop);
        }
    };



    slider.updateColors = function()
    {
        slider     .style.background = slider.backColor;
        slider.bar .style.background = slider.valueColor;
        slider.text.style.color      = slider.textColor;
    };



    slider.updateText = function()
    {
        slider.text.innerHTML = '';
        
        if (   slider.name.length > 0
            && slider.showName)
            slider.text.innerHTML += '<span class="numberSliderName">' + slider.name + "</span>&nbsp;&nbsp;";

        slider.text.innerHTML += slider.getValueText() + slider.suffix;
    };



    slider.updateFocus = function(sw, sh)
    {
        slider.focus.style.left   = 0;
        slider.focus.style.top    = 0;
        slider.focus.style.width  = sw;
        slider.focus.style.height = sh;
    };



    slider.getValueText = function()
    {
        if (   slider.options.length > 0
            && slider.displayDec == 0)
        {
            if (   slider.value <  0 
                || slider.value >= slider.options.length)
                return '?';
            else
                return slider.options[Math.round(slider.value)];
        }
        else if (slider.valueText != '')
        {
            return slider.valueText;
        }
        else
        {
            return isNaN(slider.value)
                   ? '?'
                   : numString(
                         slider.value * slider.valueScale, 
                         slider.displayDec, 
                         slider.showHex
                     ).toUpperCase();
        }
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



    slider.update();
}
function initNumberControlChildren(control)
{
    control.bar   = createDiv('numberControlBar');
    control.text  = createDiv('numberControlText');
    control.focus = createDiv('numberControlFocus');

    control.appendChild(control.bar);
    control.appendChild(control.text);
    control.appendChild(control.focus);
}



function initNumberControl(param, control, width, height, id, name, showName, defaultValue, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, dec = 0, dragScale = 0.05, wheelScale = 1, acc = 0, suffix = '')
{
    // control is also the div
    
    control.param                  = param;
     
    control.name                   = '';
    control.savedName              = '';

    control.width                  = width;
    control.height                 = height;
             
    control.style.width            = width;
    control.style.height           = height;
             
    control.value                  = defaultValue;

    control.min                    = min;
    control.max                    = max;

    control.displayMin             = min;
    control.displayMax             = max;

    control.thinMinus              = false;
    control.displayAbsolute        = false;
    
    control.epsilon                = Epsilon;

    control.acc                    = acc;
     
    control.dec                    =
    control.displayDec             = dec;
         
    control.valueScale             = 1;
                
    control.id                     = id;
    control.name                   = name;
    control.suffix                 = suffix;
    control.valueCanContainSuffix  = false;
     
    control.dragReverse            = false;
    control.dragScale              = dragScale;
    control.wheelScale             = wheelScale;
             
    control.backStyleLight         = 'rgba(255, 255, 255, 0.95)';
    control.valueStyleLight        = '#7772';
    control.textStyleLight         = '#000';
                
    control.backStyleDark          = 'rgba(56, 56, 56, 0.95)';
    control.valueStyleDark         = '#ffffff20';
    control.textStyleDark          = '#eee';
                
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
     
    control.allowEditDecimals      = true;
    
    control.valueText              = '';
    control.overrideText           = '';

    control.showNanValueName       = true; // show the name even if the value is NaN
    control.showBar                = true;

    control.barTop                 = 0;
    control.barBottom              = 1;
     
    control.ranges                 = [];
    control.rangeDivs              = [];
     
    control.options                = []; // if dec == 0, show named choices instead of a value

    control.measureData            = { divBounds: new Rect(0, 0, 0, 0) };
 
     
    control.onstartchange          = new Event('startchange');
    control.onchange               = new Event('change');
    control.onconfirm              = new Event('confirm');


    initNumberControlChildren(control);    
    initNumberControlTextbox (control);
    initNumberControlEvents  (control);



    control.canReact = function(e)
    {
        if (   settings.enableZoomedOutParams
            || graphView.zoom > settings.minZoomForParams)
            return true;

        e.preventDefault();
        e.stopPropagation();

        forwardEvent(e, this.param.node.header);

        return false;
    }



    control.setName = function(name)
    {
        control.name      = name;
        control.savedName = name;
        
        control.update();
    };



    control.setValue = function(value, fireChangeEvent = true, confirm = true, fullRange = true)
    {
        if (typeof value != 'number')
            console.assert(false, 'numberControl.setValue(value) is ' + typeof value + ', must be a number');

            
        const oldValue = control.value;

        
        if (control.wrapValue)
        {
            const range = control.displayMax - control.displayMin;

            value %= range;

            while (value < control.displayMin) value += range;
        }

        else if (fullRange)
            value = Math.min(Math.max(control.min, value), control.max);

        else
            value = Math.min(Math.max(control.displayMin, value), control.displayMax);

         
        if (    isNaN(value) && !isNaN(oldValue)
            || !isNaN(value) &&  isNaN(oldValue)
            || Math.abs(value - oldValue) > Number.EPSILON)
        {
            if (   value > -control.epsilon
                && value <  0) // guard against -0
                value = 0;

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




    control.updateMeasureData = function()
    {
        control.measureData = 
        {
            //divBounds:  boundingRect(control),
            offsetRect: offsetRect(control),
            clientRect: clientRect(control)
        };
    };


    
    control.setSuffix = function(suffix, valueCanContainSuffix = false)
    {
        control.suffix                = suffix;
        control.valueCanContainSuffix = valueCanContainSuffix;
    };
    


    control.setMin = (min, displayMin = min) =>
    {
        control.min        = min;
        control.displayMin = displayMin;
    };



    control.setMax = (max, displayMax = max) =>
    {
        control.max        = max;
        control.displayMax = displayMax;
    };



    control.setDecimals = (dec, dspDec = dec) =>
    {
        control.dec        = dec;
        control.displayDec = dspDec;
    };



    control.update = function()
    {
        if (typeof control.value !== 'number')
            console.assert(false, 'numberControl.update() value is ' + typeof control.value + ', must be a number');

        if (!control.measureData.offsetRect)
            return;

        const sx =  control.measureData.offsetRect.x;
        const sw =  control.measureData.clientRect.width;
        const sh =  control.measureData.clientRect.height;

        const cx = -control.displayMin / (control.displayMax - control.displayMin) * sw;

        const v = 
            control.displayAbsolute
            ?   Math.abs(control.value) 
              / (control.value < 0 
                 ? (-control.displayMin - Math.max(0, control.displayMin))
                 : ( control.displayMax - Math.max(0, control.displayMin)))
            : control.value / (control.displayMax - control.displayMin);


        control.updateBar(sx, cx, v, sw, sh);
        control.updateColors();
        control.updateText();
        control.updateFocus(sw, sh);
        

        updateControlRanges(control, sw, sh);
    };



    control.updateBar = function(sx, cx, v, sw, sh)
    {
        if (control.dragReverse)
            v *= -1;

            
        if (    isNaN(control.value)
            ||  control.overrideText != '' // assuminng the display bar is irrelevant in override mode
            || !control.showBar)
            control.bar.style.display = 'none';

        else
        {
            control.bar.style.display = 'block';

            const x =
                control.displayAbsolute
                ? 0
                : (v >= 0
                   ? cx
                   : cx + v * sw);

            control.bar.style.left   = Math.max(0, x);
            control.bar.style.width  = Math.min(Math.max(0, Math.round(Math.abs(v) * sw) + Math.min(0, x)), control.measureData.offsetRect.width);

            control.bar.style.top    = sh * control.barTop;
            control.bar.style.height = sh * (control.barBottom - control.barTop);
        }
    };



    control.updateColors = function()
    {
        control     .style.background = darkMode ? control. backStyleDark : control. backStyleLight;
        control.bar .style.background = darkMode ? control.valueStyleDark : control.valueStyleLight;
        control.text.style.color      = darkMode ? control. textStyleDark : control. textStyleLight;
    };



    control.updateText = function()
    {
        if (control.overrideText != '')
            control.text.innerHTML = control.overrideText;

        else
        {
            control.text.innerHTML = '';
            
            if (   control.name.length > 0
                && control.showName
                && (  !isNaN(control.value) 
                    || control.showNanValueName))
            {
                const nameStyle = 
                    darkMode 
                    ? rgba2style(rgb_a(style2rgba(control.textStyleDark ), 0.4))
                    : rgba2style(rgb_a(style2rgba(control.textStyleLight), 0.6));

                control.text.innerHTML += '<span style="color: ' + nameStyle + ';">' + control.name + "</span>&nbsp;&nbsp;";
            }

            
            const valueText = control.getValueText();

            control.text.innerHTML += 
                  valueText 
                + (valueText == UNKNOWN_DISPLAY
                   ? ''
                   : control.suffix);
        }
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
        if (control.valueText != '')
        {
            return control.valueText;
        }
        else if (  !isEmpty(control.options)
                 && control.displayDec == 0)
        {
            if (   control.value <  0 
                || control.value >= control.options.length)
                return NAN_DISPLAY;
            else
                return control.options[Math.round(control.value)];
        }
        else
        {
            if (isNaN(control.value))
                return NAN_DISPLAY;


            let str;
          

            if (Math.abs(control.value * control.valueScale) > 999999)
                str = (control.value * control.valueScale).toExponential(1);
            else
            {
                // if (   control.param
                //     && control.param.showFullPrecision)
                //     str = numToString(
                //         control.value * control.valueScale, 
                //         10, 
                //         control.showHex);
                // else
                    str = numToString(
                        control.value * control.valueScale, 
                        control.displayDec, 
                        control.showHex);

                str = str.toUpperCase();
            }


            if (control.thinMinus)
                str = str.replace('-', '<span style="font-weight: 300;">-</span>');


            return str;
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
}

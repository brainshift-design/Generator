class NumberControl
extends EventTarget
{
    div;

    bar;
    text;
    focus;

    extLeft;
    extRight;

    param;

    id;
    
    name;
    savedName             = '';
    
    width;
    height;
             
    value;

    min;
    max;

    displayMin;
    displayMax;

    thinMinus             = false;
    displayAbsolute       = false;
    
    epsilon               = Epsilon;

    acc;
     
    dec;
    displayDec;
         
    valueScale            = 1;
                
    suffix;
    valueCanContainSuffix = false;
     
    dragReverse           = false;
    dragScale;
    wheelScale;
             
    backStyleLight        = 'rgba(255, 255, 255, 0.95)';
    valueStyleLight       = '#7772';
    textStyleLight        = '#000';
                
    backStyleDark         = 'rgba(56, 56, 56, 0.95)';
    valueStyleDark        = '#ffffff20';
    textStyleDark         = '#eee';
                
    fontSize              = 11;
             
            
    wrapValue             = false;
    
    showName              = true;
    showHex               = false;

    enableChangeEvent     = true;
    
    successOnFocusOut     = false;
    keyBlur               = false;
    
    pointerEvents         = true;
    readOnly              = false;
     
    allowEditDecimals     = true;
    
    valueText             = '';
    overrideText          = '';

    showNanValueName      = true; // show the name even if the value is NaN
    showBar               = true;

    barTop                = 0;
    barBottom             = 1;
     
    ranges                = [];
    rangeDivs             = [];
     
    options               = []; // if dec == 0, show named choices instead of a value


    mouseOver             = false;
    buttonDown0           = false;
    buttonDown1           = false;
    shiftDown             = false;
    
    clickSize             = 4;
    moved                 = false;
         
    tabIndex              = 0;
    inFocus               = false;
    clicked               = false;
 
    startValue            = 0;
    oldValue; 
 

    measureData           = { divBounds: new Rect(0, 0, 0, 0) };
 

    confirmTimer          = null;


    
    get view() { return this.param.node.graph.view; }



    constructor(div, param, width, height, id, name, showName, defaultValue, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, dec = 0, dragScale = 0.05, wheelScale = 1, acc = 0, suffix = '')
    {
        super();


        this.div                   = div ? div : createDiv();
        this.div.control           = this;
        
        this.param                 = param;
        
        this.id                    = id;
        this.name                  = name;
        this.showName              = showName;
        
        
        this.width                 = width;
        this.height                = height;
        
        this.div.style.width       = width;
        this.div.style.height      = height;
        
        this.div.style.display     = 'inline';


        this.value                 = defaultValue;
    
        this.min                   = min;
        this.max                   = max;
    
        this.displayMin            = min;
        this.displayMax            = max;
    
        this.thinMinus             = false;
        this.displayAbsolute       = false;
        
        this.epsilon               = Epsilon;
    
        this.acc                   = acc;
         
        this.dec                   =
        this.displayDec            = dec;
             
        this.valueScale            = 1;
                    
        this.suffix                = suffix;
        this.valueCanContainSuffix = false;
         

        this.dragReverse           = false;
        this.dragScale             = dragScale;
        this.wheelScale            = wheelScale;
    

        this.bar                   = createDiv('numberControlBar');
        this.text                  = createDiv('numberControlText');
        this.focus                 = createDiv('numberControlFocus');
        this.extLeft               = createDiv('numberControlExt numberControlExtLeft');
        this.extRight              = createDiv('numberControlExt numberControlExtRight');


        this.div.appendChild(this.bar);
        this.div.appendChild(this.text);
        this.div.appendChild(this.focus);
        this.div.appendChild(this.extLeft);
        this.div.appendChild(this.extRight);


        this.initTextbox();
        this.initEvents ();


        this.onstartchange = new Event('startchange');
        this.onchange      = new Event('change');
        this.onconfirm     = new Event('confirm');
    }



    copy()
    {
        const copy = new NumberControl(
            null,
            null,
            this.width,
            this.height,
            this.id,
            this.name,
            this.showName,
            this.defaultValue);


        copy.value                 = this.value;
                
        copy.min                   = this.min;
        copy.max                   = this.max;
           
        copy.displayMin            = this.displayMin;
        copy.displayMax            = this.displayMax;
           
        copy.thinMinus             = this.thinMinus;
        copy.displayAbsolute       = this.displayAbsolute;
      
        copy.epsilon               = this.epsilon;
      
        copy.acc                   = this.acc;
      
        copy.dec                   = this.dec;
        copy.displayDec            = this.displayDec;
      
        copy.valueScale            = this.valueScale;
      
        copy.suffix                = this.suffix;
        copy.valueCanContainSuffix = this.valueCanCouffix;

        copy.dragReverse           = this.dragReverse;
        copy.dragScale             = this.dragScale;
        copy.wheelScale            = this.wheelScale;

        copy. backStyleLight       = this. backStyleLight;
        copy.valueStyleLight       = this.valueStyleLight;
        copy. textStyleLight       = this. textStyleLight;

        copy.fontSize              = this.fontSize;


        copy.wrapValue             = this.wrapValue;

        copy.showHex               = this.showHex;

        copy.enableChangeEvent     = this.enableChangeEvent;

        copy.successOnFocusOut     = this.successOnFocusOut;
        copy.keyBlur               = this.keyBlur;

        copy.pointerEvents         = this.pointerEvents;
        copy.readOnly              = this.readOnly;

        copy.allowEditDecimals     = this.allowEditDecimals;

        copy.valueText             = this.valueText;
        copy.overrideText          = this.overrideText;

        copy.showNanValueName      = this.showNanValueName;
        copy.showBar               = this.showBar;

        copy.barTop                = this.barTop;
        copy.barBottom             = this.barBottom;

        copy.ranges                = this.ranges.map(r => r.copy());

        copy.options               = [...this.options];
        
        return copy;
    }



    canReact(e)
    {
        if (   settings.enableZoomedOutParams
            || this.view.zoom > settings.minZoomForParams)
            return true;

        e.preventDefault();
        e.stopPropagation();

        forwardEvent(e, this.param.node.header);

        return false;
    }



    setName(name)
    {
        this.name      = name;
        this.savedName = name;
        
        this.update();
    }



    setValue(value, fireChangeEvent = true, confirm = true, fullRange = true)
    {
        if (typeof value != 'number')
            console.assert(false, 'numberControl.setValue(value) is ' + typeof value + ', must be a number');

            
        const oldValue = this.value;

        
        if (this.wrapValue)
        {
            const range = this.displayMax - this.displayMin;

            value %= range;

            while (value < this.displayMin) value += range;
        }

        else if (fullRange)
            value = Math.min(Math.max(this.min, value), this.max);

        else
            value = Math.min(Math.max(this.displayMin, value), this.displayMax);

         
        if (    isNaN(value) && !isNaN(oldValue)
            || !isNaN(value) &&  isNaN(oldValue)
            || Math.abs(value - oldValue) > Number.EPSILON)
        {
            if (   value > -this.epsilon
                && value <  0) // guard against -0
                value = 0;

            this.value = value;

            this.update();

            if (   fireChangeEvent
                && this.enableChangeEvent
                && value != this.prevValue)
                this.dispatchEvent(this.onchange);
        }


        if (   confirm
            && this.enableChangeEvent)
            this.dispatchEvent(this.onconfirm);
    }




    updateMeasureData()
    {
        this.measureData = 
        {
            offsetRect: offsetRect(this.div),
            clientRect: clientRect(this.div)
        };
    }


    
    setSuffix(suffix, valueCanContainSuffix = false)
    {
        this.suffix                = suffix;
        this.valueCanContainSuffix = valueCanContainSuffix;
    }
    


    setMin(min, displayMin = min)
    {
        this.min        = min;
        this.displayMin = displayMin;
    }



    setMax(max, displayMax = max)
    {
        this.max        = max;
        this.displayMax = displayMax;
    }



    setDecimals(dec, dspDec = dec)
    {
        this.dec        = dec;
        this.displayDec = dspDec;
    }



    update()
    {
        if (typeof this.value !== 'number')
            console.assert(false, 'numberControl.update() value is ' + typeof this.value + ', must be a number');

        if (!this.measureData.offsetRect)
            return;

        const sx =  this.measureData.offsetRect.x;
        const sw =  this.measureData.clientRect.width;
        const sh =  this.measureData.clientRect.height;

        const cx = -this.displayMin / (this.displayMax - this.displayMin) * sw;

        const v = 
            this.displayAbsolute
            ?   Math.abs(this.value) 
              / (this.value < 0 
                 ? (-this.displayMin - Math.max(0, this.displayMin))
                 : ( this.displayMax - Math.max(0, this.displayMin)))
            : this.value / (this.displayMax - this.displayMin);


        this.updateBar(sx, cx, v, sw, sh);
        this.updateColors();
        this.updateText();
        this.updateFocus(sw, sh);
        this.updateExt();

        this.updateRanges(sw, sh);
    }



    updateBar(sx, cx, v, sw, sh)
    {
        if (this.dragReverse)
            v *= -1;

            
        if (    isNaN(this.value)
            ||  this.overrideText != '' // assuminng the display bar is irrelevant in override mode
            || !this.showBar)
            this.bar.style.display = 'none';

        else
        {
            this.bar.style.display = 'block';

            const x =
                this.displayAbsolute
                ? 0
                : (v >= 0
                   ? cx
                   : cx + v * sw);

            this.bar.style.left   = Math.max(0, x);
            this.bar.style.width  = Math.min(Math.max(0, Math.round(Math.abs(v) * sw) + Math.min(0, x)), this.measureData.offsetRect.width);

            this.bar.style.top    = sh * this.barTop;
            this.bar.style.height = sh * (this.barBottom - this.barTop);
        }
    }



    updateColors()
    {
        this.div .style.background = darkMode ? this. backStyleDark : this. backStyleLight;
        this.bar .style.background = darkMode ? this.valueStyleDark : this.valueStyleLight;
        this.text.style.color      = darkMode ? this. textStyleDark : this. textStyleLight;
    }



    updateText()
    {
        if (this.overrideText != '')
            this.text.innerHTML = this.overrideText;

        else
        {
            this.text.innerHTML = '';
            
            if (   this.name.length > 0
                && this.showName
                && (  !isNaN(this.value) 
                    || this.showNanValueName))
            {
                const nameStyle = 
                    darkMode 
                    ? rgba2style(rgb_a(style2rgba(this.textStyleDark ), 0.4))
                    : rgba2style(rgb_a(style2rgba(this.textStyleLight), 0.6));

                this.text.innerHTML += '<span style="color: ' + nameStyle + ';">' + this.name + "</span>&nbsp;&nbsp;";
            }

            
            const valueText = this.getValueText();

            this.text.innerHTML += 
                  valueText 
                + (valueText == UNKNOWN_DISPLAY
                   ? ''
                   : this.suffix);
        }
    }



    updateFocus(sw, sh)
    {
        this.focus.style.left   = 0;
        this.focus.style.top    = 0;
        this.focus.style.width  = sw;
        this.focus.style.height = sh;
    }



    updateExt()
    {
        if (this.shiftDown)
        {
            const style = 
                darkMode
                ? this.textStyleDark
                : this.textStyleLight;
                
            this.extLeft .innerHTML =
            this.extRight.innerHTML =
                '<svg width="1" height="15" viewBox="0 0 1 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12H1V15H0V12Z" fill="'+style+'"/><path d="M0 6H1V9H0V6Z" fill="'+style+'"/><path d="M0 0H1V3H0V0Z" fill="'+style+'"/></svg>';

            this.extLeft .style.display = this.min < this.displayMin ? 'block' : 'none';
            this.extRight.style.display = this.max > this.displayMax ? 'block' : 'none';
        }
        else
        {
            this.extLeft .style.display = 'none';
            this.extRight.style.display = 'none';
        }
    }



    updateCursor()
    {
        this.div.style.cursor = 
               this.readOnly 
            || containsChild(this.div, this.textbox)
            || graphView.wheelTimer 
            || overNumberControlCtrl == this
            ? 'default'
            : 'ew-resize';
    };
    
    
    
    getValueText()
    {
        if (this.valueText != '')
        {
            return this.valueText;
        }
        else if (  !isEmpty(this.options)
                 && this.displayDec == 0)
        {
            if (   this.value <  0 
                || this.value >= this.options.length)
                return NAN_DISPLAY;
            else
                return this.options[Math.round(this.value)];
        }
        else
        {
            if (isNaN(this.value))
                return NAN_DISPLAY;


            let str;
          

            if (Math.abs(this.value * this.valueScale) > 999999)
                str = (this.value * this.valueScale).toExponential(1);
            else
            {
                // if (   this.param
                //     && this.param.showFullPrecision)
                //     str = numToString(
                //         this.value * this.valueScale, 
                //         10, 
                //         this.showHex);
                // else
                    str = numToString(
                        this.value * this.valueScale, 
                        this.displayDec, 
                        this.showHex);

                str = str.toUpperCase();
            }


            if (this.thinMinus)
                str = str.replace('-', '<span style="font-weight: 300;">-</span>');


            return str;
        }
    }



    lockPointer(pointerId)
    {
        clearTimeout(this.clickTimer);

        this.div.requestPointerLock =    
               this.div.      requestPointerLock 
            || this.div.   mozRequestPointerLock
            || this.div.webkitRequestPointerLock;

        this.div.requestPointerLock();
    }



    unlockPointer(pointerId)
    {
        document.exitPointerLock =    
               document.      exitPointerLock    
            || document.   mozExitPointerLock
            || document.webkitExitPointerLock;

        document.exitPointerLock();
    }



    isPointerLocked()
    {
        return (document.      pointerLockElement === this.div 
             || document.   mozPointerLockElement === this.div
             || document.webkitPointerLockElement === this.div);
    }
}

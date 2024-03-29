class NumberControl
extends Control
{
    divBar;
    divPrecision;
    textbox;
    divFocus;

    extLeft;
    extRight;



    value;
    valueScale            = 1;

    min;
    max;

    displayMin;
    displayMax;

    thinMinus             = false;
    displayAbsolute       = false;
    
    epsilon               = Epsilon;

    acc;
     
    decimals;
    displayDec;
    
    
    wrapValue             = false;


    showHex               = false;

               
    suffix;
    valueCanContainSuffix = false;
    suffixOffsetY         = 0;
     
    dragReverse           = false;
    dragScale;
    wheelScale;
             
    backStyleLight        = 'rgba(255, 255, 255, 0.95)';
    valueStyleLight       = '#7772';
    textStyleLight        = '#000';
                
    backStyleDark         = 'rgba(56, 56, 56, 0.95)';
    valueStyleDark        = '#ffffff20';
    textStyleDark         = '#eee';
                
            
    enableChangeEvent     = true;
    
    successOnFocusOut     = false;
    keyBlur               = false;
    
    readOnly              = false;
     
    allowEditDecimals     = true;
    

    delayUse              = 0;
    delayUseTimer         = null;


    valueText             = '';

    
    showNanValueName      = true; // show the name even if the value is NaN
    showBar               = true;

    barTop                = 0;
    barBottom             = 1;
     
    ranges                = [];
    rangeDivs             = [];
    
    showExtRanges         = true;

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
 

    confirmTimer          = null;
    
    
    
    constructor(param, id, name, defaultValue, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, dec = 0, dragScale = 0.05, wheelScale = 1, acc = 0, suffix = '')
    {
        const divValue = createDiv('numberControlValue');


        super(divValue, param, id, name);


        this.value                 = defaultValue;
    
        this.min                   = min;
        this.max                   = max;
    
        this.displayMin            = min;
        this.displayMax            = max;
    
        this.thinMinus             = false;
        this.displayAbsolute       = false;
        
        this.epsilon               = Epsilon;
    
        this.acc                   = acc;
         
        this.decimals              =
        this.displayDec            = dec;
             
        this.valueScale            = 1;
                    
        this.suffix                = suffix;
        this.valueCanContainSuffix = false;
         

        this.dragReverse           = false;
        this.dragScale             = dragScale;
        this.wheelScale            = wheelScale;
    

        this.divBar                = createDiv('numberControlBar');
        this.divPrecision          = createDiv('numberControlPrecision');
        this.divValue              = divValue;
        this.divFocus              = createDiv('numberControlFocus');
        this.extLeft               = createDiv('numberControlExt numberControlExtLeft');
        this.extRight              = createDiv('numberControlExt numberControlExtRight');


        this.div.appendChild(this.divPrecision);
        this.div.appendChild(this.divValue);
        
        this.param.div.appendChild(this.divBar);
        this.param.div.appendChild(this.divFocus);
        
        this.param.div.appendChild(this.extLeft);
        this.param.div.appendChild(this.extRight);
        


        this.initTextbox();
        this.initEvents ();


        this.div.style.position  = 'relative';
        // this.div.style.boxShadow = '0 0 0 2px blue inset';
    }



    canReact(e)
    {
        if (   (   settings.enableZoomedOutParams
                || graph.currentPage.zoom > settings.minZoomForParams)
            && !this.delayUseTimer)
            return true;

        e.preventDefault();
        e.stopPropagation();

        forwardEvent(e, this.param.node.header);

        return false;
    }



    startDelayUseTimer()
    {
        if (this.delayUseTimer)
            clearTimeout(this.delayTimer);

        this.delayUseTimer = setTimeout(() => 
        {
            this.delayUseTimer = false;
            this.updateCursor();    
        }, 
        this.delayUse);
    }



    setName(name)
    {
        this.name      = name;
        this.savedName = name;
        
        this.update();
    }



    setValue(value, decimals = -1, fireChangeEvent = true, confirm = true, fullRange = true, fromWheel = false, shiftKey = false)
    {
        const oldValue    = this.value;
        const oldDecimals = this.decimals;


        if (decimals < 0)
            decimals = decDigits(value);


        if (this.wrapValue)
        {
            const range = this.displayMax - this.displayMin;

            value %= range;

            while (value < this.displayMin) value += range;
        }

        else if (fullRange
              || fromWheel && oldValue < this.displayMin
              || fromWheel && oldValue > this.displayMax
              || fromWheel && shiftKey)
            value = Math.min(Math.max(this.min, value), this.max);

        else
            value = Math.min(Math.max(this.displayMin, value), this.displayMax);

         
        if (    isNaN(value) && !isNaN(oldValue)
            || !isNaN(value) &&  isNaN(oldValue)
            || Math.abs(value - oldValue) > Number.EPSILON
            || decimals != oldDecimals)
        {
            if (   value > -this.epsilon
                && value <  0) // guard against -0
                value = 0;

            this.value = value;

            this.update();

            if (   fireChangeEvent
                && this.enableChangeEvent
                && (   value    != oldValue
                    || decimals != oldDecimals))
                this.dispatchEvent(this.onchange);
        }


        if (   confirm
            && this.enableChangeEvent)
            this.dispatchEvent(this.onconfirm);
    }




    setSuffix(suffix, valueCanContainSuffix = false)
    {
        this.suffix                = suffix;
        this.valueCanContainSuffix = valueCanContainSuffix;
    }
    


    setMin(displayMin = Number.MIN_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER)
    {
        this.min        = min;
        this.displayMin = displayMin;
    }



    setMax(displayMax = Number.MAX_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER)
    {
        this.max        = max;
        this.displayMax = displayMax;
    }



    setDecimals(dec, dspDec = dec)
    {
        this.decimals        = dec;
        this.displayDec = dspDec;
    }



    formatValue = () => 
    {
        return [
            this.param.div.offsetLeft,
            this.param.div.offsetWidth ];
    };



    update()
    {
        super.update();


        if (typeof this.value !== 'number')
            consoleError('NumberControl.update() value is ' + typeof this.value + ', must be a number');

        if (!this.measureData.offsetRect)
            return;

            
        const [sx, sw] = this.formatValue();

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
        this.updatePrecision(sx, cx, v, sw, sh);
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
            || !this.showBar
            ||    this.param
               && (   this.param.isUnknown()
                   ||    this.param.isNodeValue
                      && this.param.node.isUnknown()))
            this.divBar.style.display = 'none';

        else
        {
            this.divBar.style.display = 'block';

            const x =
                this.displayAbsolute
                ? 0
                : (v >= 0
                   ? cx
                   : cx + v * sw);

            this.divBar.style.left   = Math.max(0, x);
            this.divBar.style.width  = Math.min(Math.max(0, Math.round(Math.abs(v) * sw) + Math.min(0, x)), Math.max(0, sw - Math.max(0, x)));

            this.divBar.style.top    = sh * this.barTop;
            this.divBar.style.height = sh * (this.barBottom - this.barTop);
        }
    }



    updatePrecision(sx, cx, v, sw, sh)
    {
        // if (this.dragReverse)
        //     v *= -1;

            
        // if (    isNaN(this.value)
        //     || !this.showBar)
        //     this.bar.style.display = 'none';

        // else
        // {
            this.divPrecision.style.display = 'block';

            const x = cx; 
            //     this.displayAbsolute
            //     ? 0
            //     : (v >= 0
            //        ? cx
            //        : cx + v * sw);

            this.divPrecision.style.left   = Math.max(0, x);
            this.divPrecision.style.width  = 10;//Math.min(Math.max(0, Math.round(Math.abs(v) * sw) + Math.min(0, x)), Math.max(0, this.measureData.offsetRect.width - Math.max(0, x)));

            this.divPrecision.style.top    = 0;
            this.divPrecision.style.height = sh;
        // }
    }



    updateColors()
    {
        this.divBar  .style.background = darkMode ? this.valueStyleDark : this.valueStyleLight;
        this.divValue.style.color      = darkMode ? this. textStyleDark : this. textStyleLight;
    }



    updateText()
    {
        if (this.overrideText != '')
        {
            this.divValue.innerHTML = this.overrideText;
        }
        else
        {
            const valueText = this.getValueText();

            this.divValue.innerHTML = 
                  valueText 
                + (valueText == UNKNOWN_DISPLAY
                   ? ''
                   : '<span style="font-size: 8px; opacity: 50%; font-weight: 200; position: relative; top: ' + this.suffixOffsetY + 'px;">&nbsp;' + this.suffix + '</span>');
        }


        this.divValue.style.position  = 'absolute';
        this.divValue.style.top       = '50%';
        this.divValue.style.transform = 'translateY(-50%)';
        this.divValue.style.width     = 'fit-content';

        
        if (this.param.showName)
        {
            this.divValue.style.left = '3px';
        }
        else
        {
            this.divValue.style.left       = '50%';
            this.divValue.style.transform += ' translateX(-50%)';
        }
    }



    updateFocus(sw, sh)
    {
        this.divFocus.style.left   = 0;
        this.divFocus.style.top    = 0;
        this.divFocus.style.width  = sw;
        this.divFocus.style.height = sh;
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
                '<svg width="1" height="10" viewBox="0 0 1 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4H1V6H0V4Z"  fill="'+style+'"/><path d="M0 8H1V10H0V8Z" fill="'+style+'"/><path d="M0 0H1V2H0V0Z"  fill="'+style+'"/></svg>';

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
        if (!this.param)
            return;
        
        this.div.style.cursor =
               this.readOnly 
            || containsChild(this.divValue, this.textbox)
            || graphView.wheelTimer 
            || this.delayUseTimer
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
          

            const val = this.value * this.valueScale;

            if (Math.abs(val) >= 100_000_000_000)
                str = val.toExponential(1);
            else
            {
                str = numToString(val, this.displayDec, this.showHex);

                if (   Math.abs(val) >= 10_000
                    && settings.separateThousands) // add thousand separators
                {
                    let decIndex = str.lastIndexOf('.');
                    if (decIndex == -1) str.length;

                    for (let i = decIndex-3; i > 0; i -= 3)
                        str = str.substring(0, i) + ' ' + str.substring(i);
                }
                
                str = str.toUpperCase();
            }


            if (this.thinMinus)
                str = str.replace('-', '<span style="font-weight: 300;">-</span>');


            return str;
        }
    }
}

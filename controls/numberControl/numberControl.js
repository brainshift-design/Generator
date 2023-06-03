class NumberControl
extends Control
{
    divBar;
    divPrecision;
    divValue;
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
     
    dec;
    displayDec;
    
    
    wrapValue             = false;


    showHex               = false;

               
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
    
    
    
    constructor(div, param, id, name, showName, defaultValue, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, dec = 0, dragScale = 0.05, wheelScale = 1, acc = 0, suffix = '')
    {
        super(div, param, id, name, showName);


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
    

        this.divBar                = createDiv('numberControlBar');
        this.divPrecision          = createDiv('numberControlPrecision');
        this.divValue              = createDiv('numberControlValue');
        this.divFocus              = createDiv('numberControlFocus');
        this.extLeft               = createDiv('numberControlExt numberControlExtLeft');
        this.extRight              = createDiv('numberControlExt numberControlExtRight');


        this.div.appendChild(this.divBar);
        this.div.appendChild(this.divPrecision);
        this.div.appendChild(this.divValue);
        this.div.appendChild(this.divFocus);
        this.div.appendChild(this.extLeft);
        this.div.appendChild(this.extRight);


        this.initTextbox();
        this.initEvents ();
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



    setValue(value, fireChangeEvent = true, confirm = true, fullRange = true)
    {
        if (typeof value != 'number')
            console.assert(false, 'NumberControl.setValue(value) is ' + typeof value + ', must be a number');

            
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
                && value != oldValue)
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
        this.dec        = dec;
        this.displayDec = dspDec;
    }



    update()
    {
        super.update();


        if (typeof this.value !== 'number')
            console.assert(false, 'NumberControl.update() value is ' + typeof this.value + ', must be a number');

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
            || !this.showBar)
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
            this.divBar.style.width  = Math.min(Math.max(0, Math.round(Math.abs(v) * sw) + Math.min(0, x)), Math.max(0, this.measureData.offsetRect.width - Math.max(0, x)));

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
        this.div     .style.background = darkMode ? this. backStyleDark : this. backStyleLight;
        this.divBar  .style.background = darkMode ? this.valueStyleDark : this.valueStyleLight;
        this.divValue.style.color      = darkMode ? this. textStyleDark : this. textStyleLight;
    }



    updateText()
    {
        if (this.overrideText != '')
        {
            this.divName .innerHTML = '';
            this.divValue.innerHTML = this.overrideText;
        }
        else
        {
            this.divName.innerHTML = '';
            
            if (   this.name.length > 0
                && this.showName
                && (  !isNaN(this.value) 
                    || this.showNanValueName))
            {
                // const nameStyle = 
                //     darkMode 
                //     ? rgba2style(rgb_a(style2rgba(this.textStyleDark ), 0.4))
                //     : rgba2style(rgb_a(style2rgba(this.textStyleLight), 0.6));

                this.divName.innerHTML = this.name;//'<span style="color: ' + nameStyle + ';">' + this.name + "</span>";
            }

            
            const valueText = this.getValueText();

            this.divValue.innerHTML = 
                  valueText 
                + (valueText == UNKNOWN_DISPLAY
                   ? ''
                   : this.suffix);
        }


        if (this.showName)
        {
            this.divName .style.display    = 'inline-block';
            this.divName .style.right      = ((1-this.divider)*100) + '%';
            this.divValue.style.left       = (   this.divider *100) + '%';
            
            this.divName .style.transform  = 'translateX(' + (-(1-this.divider)*100) + '%' + ') tranlateY(-50%)';
            this.divValue.style.transform  = 'translateX(' + (-   this.divider *100) + '%' + ') tranlateY(-50%)';

            this.divValue.style.marginLeft = '3px';
        }
        else
        {
            this.divName.style.display     = 'none';
            
            this.divValue.style.left       = '50%';
            this.divValue.style.transform  = 'translateX(-50%) translateY(-50%)';
            this.divValue.style.marginLeft = 0;
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
        this.divValue.style.cursor = 
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

                if (Math.abs(val) >= 10_000) // add thousand separators
                {
                    for (let i = str.length-3; i > 0; i -= 3)
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

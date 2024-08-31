class   GradientParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    
    value;


    divGradient;

    
    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;


    checkersHolder;
    checkers;



    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = new GradientValue())
    {
        super(GRADIENT_VALUE, id, name, showName);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;


        this.checkersHolder = createDiv();
        this.checkers       = createDiv();

        this.divGradient    = createDiv('paramGradient');


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            '',
            { 
                family: 'Inter',
                size:   '11px'
            }));

        this.controls[0].highlightText           = false;
        this.controls[0].textbox.style.textAlign = 'center';

        
        this._warningOverlay               = createDiv('colorValueWarningOverlay');
        this._warningOverlay.style.zIndex  = 11;

        this.checkersHolder.style.position = 'absolute';
        this.checkersHolder.style.width    = '100%';
        this.checkersHolder.style.height   = defParamHeight;
        this.checkersHolder.style.overflow = 'hidden';

        this.checkers.style.position       = 'absolute';
        this.checkers.style.width          = '100%';
        this.checkers.style.height         = defParamHeight;


        this.divControls   .appendChild(this.controls[0].div);
        

        this.checkersHolder.appendChild(this.checkers);

        
        this.div.insertBefore(this.divGradient,     this.divControls);
        this.div.insertBefore(this.checkersHolder,  this.divGradient);
        this.div.insertBefore(this._warningOverlay, this.divName);
        

        if (hasInput)  this.initInput ([GRADIENT_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([GRADIENT_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(GRADIENT_VALUES.includes(value.type), 'expected GRADIENT_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof GradientValue))
        {
            //console.log('value =', value);
            consoleError('GradientParam.setValue(): value is ' + typeof value + ', must be a GradientValue');
        }

        consoleAssert(
               value.type 
            && value.type == GRADIENT_VALUE, 
            'GradientParam value.type must be GRADIENT_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        super.setValue(this.value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
    }    



    isVisible()
    {
        return this.controls[0].div.style.display != 'none';
    }



    getWireColor()
    {
        return this.value.isValid()
             ? this.value.toRgba()
             : rgbFromType(this.type, true);
    }



    genRequest(gen)
    {
        // this function exists because a parameter without an output
        // should still be able to generate a request
        
        // 'this' is the param

        if (    this.output
            && !isEmpty(this.output.cache)
            &&  gen.passedNodes.includes(this.node))
            return this.output.cache;


        const request = [];

        if (   this.input
            && this.input.connected)
        {
            if (this.input.supportsTypes(this.input.connectedOutput.types))
                request.push(...pushInputOrParam(this.input, gen));
            else
                consoleError('invalid input for GradientParam (' + this.node.id + ')');
        }

        else request.push( 
            GRADIENT_VALUE, 
            (new GradientValue()).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        // this.div.style.background = 
        //     darkMode 
        //     ? this.backStyleDark 
        //     : this.backStyleLight;


        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '700';


        const stops = this.value.stops.items;
        
        this.controls[0].textbox.value =
            stops.length + ' stop' + (stops.length == 1 ? '' : 's');


        super.updateControls();


        this.checkers.style.background =
            darkMode
            ?   'linear-gradient(-45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(-45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(-45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(-45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';


        this.checkers.style.display               = this.value.isValid() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor       = darkMode ? '#444' : '#fff';
         
        this.checkers.style.backgroundSize        = '22px 22px';
        this.checkers.style.backgroundPosition    = '0 0, 11px 11px';
         
        this.checkers.style.left                  = '-3.5px';
        this.checkers.style.width                 = 'calc(100% + 3.5px)';


        let gradient = 'linear-gradient(90deg';


        let minPos = Number.MAX_SAFE_INTEGER;
        let maxPos = Number.MIN_SAFE_INTEGER;

        for (const stop of stops)
        {
            minPos = Math.min(minPos, stop.position.value);
            maxPos = Math.max(maxPos, stop.position.value);
        }

        for (const stop of stops)
            stop.position.value = (stop.position.value - minPos) / nozero(maxPos - minPos) * 100;


        for (let i = 0; i < stops.length; i++)
        {
            const stop = stops[i];
            gradient += ', ' + rgba2style(stop.fill.toRgba()) + ' ' + (stop.position.value) + '%';
        }


        gradient += ')';


        this.divGradient.style.background         = gradient;
        this.divGradient.style.backgroundPosition = '50% 50%';
        this.divGradient.style.backgroundSize     = '100% 100%';


        let rgbaBack = rgba_NaN;

        for (const stop of this.value.stops.items)
        {
            rgbaBack = 
                rgbaIsNaN(rgbaBack)
                ? stop.fill.toRgba()
                : rgbaMuls(rgbaAdd(rgbaBack, stop.fill.toRgba()), 0.5);
        }

        const gray = this.value.stops.items.length == 0;

        const colText = 
            gray
            ? (darkMode ? [1, 1, 1, 1] : [0, 0, 0, 1]) 
            : getTextColorFromBackColor(getStripeBackColor(rgbaBack));

        this.divName            .style.color = rgba2style(rgb_a(colText, 0.3));
        this.controls[0].textbox.style.color = rgba2style(colText);
    }



    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const rgba = this.value.toRgba();

        if (!rgbaIsNaN(rgba))
        {
            if (  !rgbaIsValid(rgba)
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = getDefaultWarningStyle(rgba);

                this.updateWarningOverlayStyle(rgba);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.warningStyle = getDefaultWarningStyle(rgba);
            this.updateWarningOverlayStyle(rgba);
        }
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        //console.log('colBack =', colBack);
        
        this._warningOverlay.style.height = 
            height < 0
            ? this.div.offsetHeight
            : height;


        const [warnStyle1, warnStyle2] = getWarningStyles(colBack);

        this._warningOverlay.style.background =
                rgbIsOk(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : getWarningGradient(7.8, warnStyle2, warnStyle1);

               
        this._warningOverlay.style.backgroundPosition = '0 0';
        this._warningOverlay.style.backgroundSize     = 'calc(100% + 27.6px) 100%';
        this._warningOverlay.style.display            = 'block';
    }
    
    
    
    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseGradientValue(_param[2])[0], true, true, false);
    }
}
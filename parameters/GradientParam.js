class   GradientParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    
    value;


    
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


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].highlightText           = false;
        this.controls[0].textbox.style.textAlign = 'center';
   
        this.divControls.appendChild(this.controls[0].div);

       
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
        this.controls[0].textbox.style.fontWeight = '300';


        const stops = this.value.stops.items;
        
        this.controls[0].textbox.value =
            stops.length + ' stop' + (stops.length == 1 ? '' : 's');


        super.updateControls();


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


        this._div.style.background         = gradient;
        this._div.style.backgroundPosition = '50% 50%';
        this._div.style.backgroundSize     = '100% 100%';


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



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseGradientValue(_param[2])[0], true, true, false);
    }
}
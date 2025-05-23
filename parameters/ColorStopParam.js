class   ColorStopParam
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
                defaultValue = new ColorStopValue())
    {
        super(COLOR_STOP_VALUE, id, name, showName);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            '',
            { 
                family: 'Inter',
                size:   '11px'
            }));

        this.controls[0].textbox.style.textAlign          = 'center';
        this.controls[0].textbox.style.fontVariantNumeric = 'tabular-nums';
   
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([COLOR_STOP_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([COLOR_STOP_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);

        if (this.output)
            this.output.forceOutputColor = true;
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(COLOR_STOP_VALUES.includes(value.type), 'expected COLOR_STOP_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof ColorStopValue))
        {
            //console.log('value =', value);
            consoleError('ColorStopParam.setValue(): value is ' + typeof value + ', must be a ColorStopValue');
        }

        consoleAssert(
               value.type 
            && value.type == COLOR_STOP_VALUE, 
            'ColorStopParam value.type must be COLOR_STOP_VALUE');


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
                consoleError('invalid input for ColorStopParam (' + this.node.id + ')');
        }

        else request.push( 
            COLOR_STOP_VALUE, 
            (new ColorStopValue()).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        super.updateControls();


        checkParamVisible(this);
        

        setEnabledTextStyle(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '600';

 
        this.controls[0].textbox.value =
                     rgb2hex(this.value.fill.color.toRgb())
            + '  ' + this.value.fill.opacity.toNumber() + '%'
            + ', ' + this.value.position.toNumber() + '%';


        const rgba       = this.value.fill.toRgba();

        const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);
        const rgbaBack   = rgbaStripe;
        const rgbaText   = getTextColorFromBackColor(rgbaStripe, rgba[3]);
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(ColorStopValue.parse(_param[2])[0], true, true, false);
    }
}
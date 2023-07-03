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
            ''));

        this.controls[0].textbox.style.textAlign  = 'center';
   
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([COLOR_STOP_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([COLOR_STOP_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
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
        

        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

 
        this.controls[0].textbox.value =
                    rgb2hex(this.value.fill.color.toRgb())
            + ' ' + this.value.fill.opacity.toNumber() + '%'
            + ' ' + this.value.position.toNumber() + '%';


        const rgba       = this.value.fill.toRgba();

        const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);
        const rgbaBack   = rgbaStripe;
        const rgbaText   = getTextColorFromBackColor(rgbaStripe, rgba[3]);


        //this.updateWarningOverlay();


        if (this.input)
        {
            this.input.colorLight  = 
            this.input.colorDark   = rgb_a(rgbaText, 0.2);
            this.input.wireColor   = !rgbaIsNaN(rgbaBack) ? rgbaBack : noColor;
        }

        if (this.output)
        {
            this.output.colorLight =
            this.output.colorDark  = rgb_a(rgbaText, 0.2);
            this.output.wireColor  = !rgbaIsNaN(rgbaBack) ? rgbaBack : noColor;
        }
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseColorStopValue(_param[2])[0], true, true, false);
    }
}
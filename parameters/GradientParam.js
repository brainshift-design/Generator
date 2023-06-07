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

        this.controls[0].textbox.style.textAlign  = 'center';
   
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

        console.assert(GRADIENT_VALUES.includes(value.type), 'expected GRADIENT_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof GradientValue))
        {
            //console.log('value =', value);
            console.assert(false, 'GradientParam.setValue(): value is ' + typeof value + ', must be a GradientValue');
        }

        console.assert(
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
                console.assert(false, 'invalid input for GradientParam (' + this.node.id + ')');
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
        checkControlVisible(this, this.controls[0]);
        

        this.div.style.background = 
            darkMode 
            ? this.backStyleDark 
            : this.backStyleLight;


        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

        this.controls[0].textbox.value = this.value.stops.items.length + ' ' + countString(this.value.stops.items.length, 'stop');


        super.updateControls();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseGradientValue(_param[2])[0], true, true, false);
    }
}
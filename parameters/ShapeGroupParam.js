class   ShapeGroupParam
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
                defaultValue = new VectorPathValue())
    {
        super(SHAPE_GROUP_VALUE, id, name);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].textbox.style.textAlign = 'center';
   
        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput([SHAPE_GROUP_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([SHAPE_GROUP_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == SHAPE_GROUP_VALUE, 'expected SHAPE_GROUP_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof ShapeGroupValue))
            consoleError('ShapeGroupParam.setValue(value) is ' + typeof value + ', must be a ShapeGroupValue');

        consoleAssert(
               value.type 
            && value.type == SHAPE_GROUP_VALUE, 
            'ShapeGroupParam value.type must be SHAPE_GROUP_VALUE');


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
            if (this.input.connectedOutput.supportsTypes([SHAPE_GROUP_VALUE]))
                request.push(...pushInputOrParam(this.input, gen));
            else
                consoleError('invalid input for ShapeGroupParam (' + this.node.id + ')');
        }

        else request.push( 
            SHAPE_GROUP_VALUE, 
            (new ShapeGroupValue()).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        setEnabledTextStyle(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

        this.controls[0].textbox.value            = 'rectangle';


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(VectorPathValue.parse(_param[2])[0], true, true, false);
    }
}
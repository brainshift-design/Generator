class   PointParam
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
                defaultValue = new PointValue())
    {
        super(POINT_VALUE, id, name);

        defaultValue.nodeId = this.nodeId;

        this.defaultValue = defaultValue;
        this.value        = defaultValue;


        this.controls.push(new TextControl(
            null,
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].textbox.style.textAlign = 'center';
       
        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput([POINT_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([POINT_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        console.assert(value.type == POINT_VALUE, 'expected POINT_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof PointValue))
            console.assert(false, 'PointParam.setValue(value) is ' + typeof value + ', must be a PointValue');

        console.assert(
               value.type 
            && value.type == POINT_VALUE, 
            'PointParam value.type must be POINT_VALUE');


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
            if (this.input.connectedOutput.supportsTypes(this.input.types))
                request.push(...pushInputOrParam(this.input, gen));
            else
                console.assert(false, 'invalid input for PointParam');
        }

        else request.push( 
            POINT_VALUE, 
            (new PointValue(this.nodeId)).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        checkControlVisible(this, this.controls[0]);
        

        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

        this.controls[0].textbox.value = 
              printNum(this.value.x.value)  
            + ', ' 
            + printNum(this.value.y.value);


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parsePointValue(_param[2])[0], true, true, false);
    }
}
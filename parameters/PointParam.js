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
        super(POINT_VALUE, id, name, showName);

        defaultValue = defaultValue.copy();
        defaultValue.nodeId = this.nodeId;

        this.defaultValue = defaultValue.copy();
        this.value        = defaultValue.copy();


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].textbox.style.textAlign = 'center';
        this.controls[0].highlightText           = false;
       
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([POINT_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
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

        consoleAssert(value.type == POINT_VALUE, 'expected POINT_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof PointValue))
            consoleError('PointParam.setValue(value) is ' + typeof value + ', must be a PointValue');

        consoleAssert(
               value.type 
            && value.type == POINT_VALUE, 
            'PointParam value.type must be POINT_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        super.setValue(this.value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value.copy();
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
                request.push(POINT_VALUE, '?,? ?,?');
        }

        else request.push( 
            POINT_VALUE, 
            PointValue.create(this.nodeId, this.value.x.value, this.value.y.value).toString());

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
        this.controls[0].textbox.style.fontWeight = '500';

        this.controls[0].textbox.value = 
                this.value.isValid()
            && !this.node.isUnknown()
            ?          printNum(this.value.x.value)  
              + ', ' + printNum(this.value.y.value)
            : NAN_DISPLAY;


        super.updateControls();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parsePointValue(_param[2])[0], true, true, false);
    }
}
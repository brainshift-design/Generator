class   PointParam3
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
                defaultValue = new PointValue3())
    {
        super(POINT3_VALUE, id, name, showName);

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
        this.controls[0].textbox.style.whiteSpace = 'no-wrap';
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

        consoleAssert(value.type == POINT3_VALUE, 'expected POINT3_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof PointValue3))
            consoleError('PointParam3.setValue(value) is ' + typeof value + ', must be a PointValue3');

        consoleAssert(
               value.type 
            && value.type == POINT3_VALUE, 
            'PointParam3 value.type must be POINT3_VALUE');


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
            if (this.input.connected)//Output.supportsTypes(this.input.types))
                request.push(...pushInputOrParam(this.input, gen));
            else
                request.push(POINT_VALUE, '?,? ?,?');
        }

        else request.push( 
            POINT3_VALUE, 
            PointValue3.create(this.nodeId, this.value.x.value, this.value.y.value, this.value.z.value).toString());

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


        setEnabledTextStyle(this.controls[0].div, false);

        
        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

        this.controls[0].textbox.value = 
                this.value.isValid()
            && !this.node.isUnknown()
            ?          numToString(this.value.x.value, -2)  
              + ', ' + numToString(this.value.y.value, -2)
              + ', ' + numToString(this.value.z.value, -2)
            : NAN_DISPLAY;



        super.updateControls();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(PointValue3.parse(_param[2])[0], true, true, false);
    }
}
class   DropShadowParam
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
                defaultValue = new DropShadowValue())
    {
        super(DROP_SHADOW_VALUE, id, name, showName);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].textbox.style.textAlign  = 'center';
   
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([DROP_SHADOW_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([DROP_SHADOW_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(DROP_SHADOW_VALUES.includes(value.type), 'expected DROP_SHADOW_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof DropShadowValue))
        {
            //console.log('value =', value);
            consoleError('DropShadowParam.setValue(): value is ' + typeof value + ', must be a DropShadowValue');
        }

        consoleAssert(
               value.type 
            && value.type == DROP_SHADOW_VALUE, 
            'DropShadowParam value.type must be DROP_SHADOW_VALUE');


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
                consoleError('invalid input for DropShadowParam (' + this.node.id + ')');
        }

        else request.push( 
            DROP_SHADOW_VALUE, 
            (new DropShadowValue()).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        checkParamVisible(this);
        

        // this.div.style.background = 
        //     darkMode 
        //     ? this.backStyleDark 
        //     : this.backStyleLight;


        setEnabledTextStyle(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

 
        this.controls[0].textbox.value = 'drop shadow';
            //   'drop ' 
            // +  printNum(this.value.x.value)  
            // + ', ' 
            // +  printNum(this.value.y.value)
            // + 'B: ' + printNum(this.value.blur.value)
            // + 'S: ' + printNum(this.value.spread.value);


        super.updateControls();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(DropShadowValue.parse(_param[2])[0], true, true, false);
    }
}
class   NumberParamBase
extends Parameter
{
    control;

    
    get value() 
    { 
        return new NumberValue(
            this.control.value, 
            this.control.displayDec); 
    }

    oldValue = null;


    defaultValue;


    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }


    
    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        // console.log(this.id + '.setValue() value =', value);
        // console.trace();

        console.assert(
            value instanceof NumberValue,
            'value must be a NumberValue');


        this.preSetValue(value, createAction, dispatchEvents);

        
        if (updateControl)
        {
            this.control.setDecimals(value.decimals, value.decimals);
            this.control.setValue(value.value, false, false); 
        }


        super.setValue(value, createAction, updateControl, dispatchEvents);

        
        this.oldValue = this.value.copy();
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
            request.push(...pushInputOrParam(this.input, gen));

        else request.push( 
            NUMBER_VALUE, 
            new NumberValue(
                this.control.value, 
                this.control.displayDec).toString());


        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    textboxHasFocus()
    {
        return hasFocus(this.control.textbox);
    }



    enableControlText(enable)
    {
        enable &= !this.input || !this.input.connected;
        enableElementText(this.control, enable);
        this.control.readOnly = !enable;
    }
    
    
    
    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(param)
    {
        this.setValue(parseNumberValue(param)[0], true, true, false);
    }
}
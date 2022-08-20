class   NumberParamBase
extends Parameter
{
    defaultValue;

    oldValue = null;

    
    get value    () { return this.control.value; }

    
    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }


    get genValue() { return new NumberValue(this.control.value, this.control.displayDec); }



    
    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        this.preSetValue(value, createAction, dispatchEvents);

        if (updateControl)
        {
            this.control.setDecimals(value.decimals, value.decimals);
            this.control.setValue(value.value, false, false, forceChange); 
        }

        super.setValue(value, createAction, updateControl, dispatchEvents);

        this.oldValue = this.genValue;
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
        enableElementText(this.control, enable);
        this.control.readOnly = !enable;
    }
    
    
    
    isDefault()
    {
        return this.genValue.equals(this.defaultValue);
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        return pos + '["' + id  + '", "' + this.genValue.toString() + '"]';
    }



    loadParam(param)
    {
        this.setValue(parseNumberValue(param)[0], true, true, false);
    }
}
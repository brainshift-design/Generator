class   NumberParamBase
extends Parameter
{
    defaultValue;

    
    get value   () { return this._control.value; }
    get genValue() { return new GNumberValue(this.control.value, this.control.displayDec); }

    
    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }



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
        // should still be able to generate a request a value
        
        // 'this' is the param

        if (    this.output
            && !isEmpty(this.output.cache)
            &&  gen.passedNodes.includes(this.node))
            return this.output.cache;


        const req = [];


        if (   this.input
            && this.input.connected)
            req.push(...pushInputOrParam(this.input, gen));

        else req.push( 
            NUMBER_VALUE, 
            new GNumberValue(
                this.control.value, 
                this.control.displayDec).toString());


        return req;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }
}
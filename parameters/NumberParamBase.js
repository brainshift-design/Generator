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



    showValue(show)
    {
        this.control.showValue = show;
        this.control.update();
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



    formatControl(enableText)
    {
        this.enableControlText(enableText);
        this.updateShowControlValue();
    }



    enableControlText(enable)
    {
        enable &= 
               !this.input 
            || !this.input.connected;
            
        enableElementText(this.control, enable);
        this.control.readOnly = !enable;
    }
    
    
    
    updateShowControlValue()
    {
        const inputNoneOrCached =
               !this.input
            || !this.input.connected
            ||  this.input.connectedOutput.node.isCached();

        const outputConnected =
               !this.output
            || !this.output.connected
            || !this.output.followedByMultiplier();
 

        let headerOutputsConnected = false;

        for (const output of this.node.headerOutputs)
            headerOutputsConnected |= output.followedByMultiplier();


        this.control.showValue = 
               inputNoneOrCached
            || outputConnected
            || headerOutputsConnected;

            
        this.control.update();
    }
    
    
    
    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(param)
    {
        this.setValue(parseNumberValue(param)[0], true, true, false);
    }
}
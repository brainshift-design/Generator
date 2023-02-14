class   NumberParamBase
extends Parameter
{
    control;

    //tooltip = null;

    
    
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

        //console.log('value =', value);
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



    getValueForUndo()
    {
        return {
            paramId: this.id, 
            value:   this.value,
            min:     this.control.min,
            max:     this.control.max
        };
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
        enable &= 
               !this.input 
            || !this.input.connected;
            
        enableElementText(this.control, enable);
        this.control.readOnly = !enable;


        this.updateValueText();
    }
    
    
    
    updateValueText()
    {
        let unknown = false;

        if (   this.input
            && this.input.connected)
        {
            if (   this.input.isConnectedUncached()
                && this.node.hasMultipliedOutputs())
                unknown = true;
        }


        if (unknown)
            this.control.valueText = UNKNOWN_DISPLAY;

        this.control.showBar = !unknown;
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(param)
    {
        this.setValue(parseNumberValue(param)[0], true, true, false);
    }



    legacyLoadParam(param)
    {
        this.setValue(NumberValue.fromString(param), true, true, false);
    }
}
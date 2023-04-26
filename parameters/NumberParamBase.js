class   NumberParamBase
extends Parameter
{
    showFullPrecision = false;

    
    
    get value() 
    { 
        return new NumberValue(
            this.controls[0].value, 
            this.controls[0].displayDec); 
    }

    oldValue = null;


    defaultValue;
    alwaysSaveValue = false;


    get valueText() { return this.controls[0].valueText; }
    set valueText(text) 
    {
        this.controls[0].valueText = text;
        this.controls[0].update();
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        console.assert(
            value instanceof NumberValue,
            'value must be a NumberValue');


        this.preSetValue(value, createAction, dispatchEvents);

        
        if (updateControl)
        {
            this.controls[0].setDecimals(value.decimals, value.decimals);
            this.controls[0].setValue(value.value, false, false); 
        }


        super.setValue(value, createAction, updateControl, dispatchEvents);

        
        this.oldValue = this.value.copy();
    }    



    showValue(show)
    {
        this.controls[0].showValue = show;
        this.controls[0].update();
    }



    isVisible()
    {
        return this.controls[0].div.style.display != 'none';
    }



    resetControls()
    {
        this.controls[0].valueText = '';
    }



    getValueForUndo()
    {
        return {
            paramId:    this.id, 
            value:      this.value,
            min:        this.controls[0].min,
            max:        this.controls[0].max,
            displayMin: this.controls[0].displayMin,
            displayMax: this.controls[0].displayMax
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

        else if (this.output
              && this.output.paramNode
              && this.output.paramNode.inputs[0].connected)
        {
            request.push(...pushInputOrParam(this.output.paramNode.inputs[0], gen));
            //request.push(...this.output.paramNode.inputs[0].connectedOutput.genRequest(gen));
        }

        else request.push(
            NUMBER_VALUE, 
            new NumberValue(
                this.controls[0].value, 
                this.controls[0].displayDec).toString());


        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    textboxHasFocus()
    {
        return hasFocus(this.controls[0].textbox);
    }



    enableControlText(enable)
    {
        enable &= 
               !this.input 
            || !this.input.connected;
            
        enableElementText(this.controls[0].div, enable);

        this.controls[0].readOnly = !enable;

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
            this.controls[0].valueText = UNKNOWN_DISPLAY;

        this.controls[0].showBar = !unknown;
    }



    isDefault = () => 
           !this.alwaysSaveValue
         && this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseNumberValue(_param[2])[0], true, true, false);
    }



    toJsCode(gen)
    {
        return this.input.connected
             ? '(' + this.input.connectedOutput.toJsCode(gen) + ')'
             : this.value.toJsCode(gen);
    }
}
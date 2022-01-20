class   OpNumber
extends Operator
{
    #value;



    constructor()
    {
        super('number', 'num', 'number', 70);

        //this.addOutput(new Output(this.dataType));

        this.addParam(this.#value = new NumberParam('', true, true));
        
        this.#value.allowEditDecimals = true;
    }



    refresh()
    {
        super.refresh();
        
        //this._sampled = Number.NaN;
    }



    update()
    {
        if (!this.needsUpdate())
            return;
            
        this.updateParams(false);
        
        // this.outputs[0]._data = dataFromNumber(
        //     this.#value.value, 
        //     this.#value.control.dec);
            
        super.update()
    }



    updateNode()
    {
        super.updateNode();
    }



    updateParams(dispatchEvents)
    {
        super.updateParams(dispatchEvents);

        this.outputs[0]._value = this.#value.value;
    }



    // generate(callerInput)
    // {
    //     if (this.valid) return;
    //     super.generate(callerInput);


    //     if (isNaN(this._sampled))
    //         this._sampled = this._value.value;

    //     this.output._data = dataFromNumber(this._sampled);
    // }
}
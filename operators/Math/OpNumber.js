class   OpNumber
extends Operator
{
    #value;



    constructor()
    {
        super('number', 'num', 'number', 70);

        this.addOutput(new Output(this.dataType));

        this.addParam(this.#value = new NumberParam('', true, false));
        
        this.#value.allowEditDecimals = true;
        //this.#value.addEventListener('change', () => this.pushUpdate());
    }



    refresh()
    {
        super.refresh();
        
        this._sampled = Number.NaN;
    }



    update()
    {
        if (!this.needsUpdate())
            return;
            
        this.updateParams(false);
        
        this.outputs[0]._data = dataFromNumber(
            this.#value.value, 
            this.#value.control.dec);
            
        super.update()
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
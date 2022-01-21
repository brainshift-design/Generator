class   OpNumber
extends Operator
{
    #paramValue;



    constructor()
    {
        super('number', 'num', 'number', 70);

        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramValue = new NumberParam('value', false, true, false));
        
        this.#paramValue.allowEditDecimals = true;
    }



    update()
    {
        if (!this.needsUpdate())
            return;
            
        this.updateParams(false);
        
        this.outputs[0]._data = dataFromNumber(
            this.#paramValue.value, 
            this.#paramValue.control.dec);
            
        super.update()
    }



    updateParams(dispatchEvents)
    {
        super.updateParams(dispatchEvents);

        this.outputs[0]._value = this.#paramValue.value;
    }



    // generate(callerInput)
    // {
    //     if (this.valid) return;
    //     super.generate(callerInput);


    //     if (isNaN(this._sampled))
    //         this._sampled = this._value.value;

    //     this.output._data = dataFromNumber(this._sampled);
    // }



    loadParams(_node)
    {
        for (const _param of _node.params)
        {
            if (_param[0] == 'value')
            {
                this.#paramValue.setDecimals(_param[1]);
                this.#paramValue.setValue(parseFloat(_param[1]), true, true, false);
            }
        }
    }
}
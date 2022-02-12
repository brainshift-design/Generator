class   OpMinMax
extends OperatorBase
{
    #paramMin;
    #paramMax;



    constructor()
    {
        super('minmax', 'limits', 'number', 70);

        this.addInput (new Input (this.dataType));
        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramMin = new NumberParam('min', 'min', true, true, true, 0));
        this.addParam(this.#paramMax = new NumberParam('max', 'max', true, true, true));
        
        // this.#paramMin.addEventListener('change', () =>
        // {
        //     if (this.#paramMin.value > this.#paramMax.value)
        //         this.#paramMin.setValue(this.#paramMax.value, false, true, false);
        // });

        // this.#paramMax.addEventListener('change', () => 
        // {
        //     if (this.#paramMax.value < this.#paramMin.value)
        //         this.#paramMax.setValue(this.#paramMin.value, false, true, false);
        // });
    }



    updateData()
    {
        if (this.inputs[0].isConnected)
        {
            this.#paramMin.control.setDecimals(this.inputs[0].data.decimals);
            this.#paramMax.control.setDecimals(this.inputs[0].data.decimals);
            
            if (this.#paramMin.value > this.#paramMax.value)
                this.#paramMin.setValue(this.#paramMax.value, false, true, false);

            if (this.#paramMax.value < this.#paramMin.value)
                this.#paramMax.setValue(this.#paramMin.value, false, true, false);

            this.outputs[0]._data = dataFromNumber(
                Math.min(Math.max(
                    this.#paramMin.value, 
                    this.inputs[0].data.value), 
                    this.#paramMax.value),
                this.inputs[0].data.decimals);
        }
        else
            this.outputs[0]._data = dataFromNumber(Number.Nan, 0);
            
                  
        super.updateData()
    }



    toString()
    {
        // let str = opType;

        // if (this.inputs[0].isConnected)
        //     str +=

        // return str;
    }
}
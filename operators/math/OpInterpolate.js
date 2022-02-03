class   OpInterpolate
extends OperatorBase
{
    #paramValue;
    #paramFactor;



    constructor()
    {
        super('interpolate', 'inter', 'number', 70);

        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));

        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramValue  = new NumberParam('value',  '',  false, false, false, 0));
        this.addParam(this.#paramFactor = new NumberParam('factor', '%', true,  true,  true, 0, 0, 1, 2));
      
        this.#paramValue.control.readOnly        = true;
        this.#paramValue.control.style.fontStyle = 'italic';

        this.#paramFactor.control.min = Number.MIN_SAFE_INTEGER;
        this.#paramFactor.control.max = Number.MAX_SAFE_INTEGER;
    }



    updateData()
    {
        let result = Number.NaN;
        let maxDec = 0;

        if (   this.inputs[0].isConnected
            && this.inputs[1].isConnected)
        {
            const a = this.inputs[0].data.value; 
            const b = this.inputs[1].data.value; 

            result = a + (b - a) * this.#paramFactor.value;

            maxDec = Math.max(
                this.inputs[0].data.decimals,
                this.inputs[1].data.decimals);
        }
        else if (this.inputs[0].isConnected)
        {
            result = this.inputs[0].data.value;
            maxDec = this.inputs[0].data.decimals;
        }
        else if (this.inputs[1].isConnected)
        {
            result = this.inputs[1].data.value;
            maxDec = this.inputs[1].data.decimals;
        }


        this.outputs[0]._data = dataFromNumber(result);

        this.#paramValue.setValue(result, false, true, false);

        this.#paramValue.control.dec = maxDec;
        this.#paramValue.control.update();


        super.updateData()
    }
}
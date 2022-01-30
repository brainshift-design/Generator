class   OpInterpolateNumbers
extends Operator
{
    #paramFactor;
    #paramValue;



    constructor()
    {
        super('interpolatenumbers', 'lerp', 'number', 70);

        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));

        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramValue  = new NumberParam('value',  false, false, false, 0));
        this.addParam(this.#paramFactor = new NumberParam('factor', false,  true,  true, 0, 0, 1, 2));
      
        this.#paramValue.control.readOnly        = true;
        this.#paramValue.control.style.fontStyle = 'italic';
    }



    update()
    {
        if (this.valid) return;


        if (this.inputs[0].isConnected) this.inputs[0].connectedOutput.op.update();
        if (this.inputs[1].isConnected) this.inputs[1].connectedOutput.op.update();


        this.updateParams();


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


        super.update()
    }
}
class   OpInterpolate
extends OperatorBase
{
    #paramValue;
    #paramAmount;



    constructor()
    {
        super('interpolate', 'inter', NUMBER, 70);

        this.addInput(new Input(this.dataType));
        this.addInput(new Input(this.dataType));

        this.addOutput(new Output(this.dataType));

        this.addParam(this.#paramValue  = new NumberParam('value',  '', false, false, false, 0));
        this.addParam(this.#paramAmount = new NumberParam('amount', '', true,  true,  true, 50, 0, 100, 0));

        enableSliderText(this.#paramValue.control, false);
        
        this.#paramAmount.control.min        = Number.MIN_SAFE_INTEGER; // allow
        this.#paramAmount.control.max        = Number.MAX_SAFE_INTEGER; // extrapolation
        this.#paramAmount.control.displayDec = 0;
        
        this.#paramAmount.control.setSuffix('%', true);
    }



    // updateData()
    // {
    //     let result = Number.NaN;
    //     let maxDec = 0;

    //     if (   this.inputs[0].connected
    //         && this.inputs[1].connected)
    //     {
    //         const a = this.inputs[0].data.value; 
    //         const b = this.inputs[1].data.value; 

    //         result = a + (b - a) * this.#paramAmount.value / 100;

    //         maxDec = Math.max(
    //             this.inputs[0].data.decimals,
    //             this.inputs[1].data.decimals);
    //     }
    //     else if (this.inputs[0].connected)
    //     {
    //         result = this.inputs[0].data.value;
    //         maxDec = this.inputs[0].data.decimals;
    //     }
    //     else if (this.inputs[1].connected)
    //     {
    //         result = this.inputs[1].data.value;
    //         maxDec = this.inputs[1].data.decimals;
    //     }


    //     this.outputs[0]._data = dataFromNumber(result, maxDec);

    //     this.#paramValue.control.setDecimals(maxDec);
    //     this.#paramValue.setValue(result, false, true, false);

    //     this.#paramValue.control.update();


    //     super.updateData()
    // }
}
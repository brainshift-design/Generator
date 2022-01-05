class   OpNumber
extends Operator
{
    #paramValue;



    constructor()
    {
        super('number', 'number');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#paramValue = new NumberParam('', true, false));

        this.#paramValue.addEventListener('change', () => 
        {
            console.log(this.name + '.paramValue.onchange');
            //this.output.data = dataFromNumber(this.#paramValue.value);
            this.invalidate();
            this.update();
        });
    }



    refresh()
    {
        super.refresh();
        
        this._sampled = Number.NaN;
    }



    update()
    {
        if (this.valid) 
            return;

        console.log(this.name + ' OpNumber.update()');
        this.output._data = dataFromNumber(this.#paramValue.value);

        super.update()
    }



    // updateParams()
    // {
    //     Operator.prototype.updateParams.call(this);

    //     this.output._value = this.#value.value;

    //     this.validate();
    // }


    
    // generate(callerInput)
    // {
    //     if (this.valid) return;
    //     super.generate(callerInput);


    //     if (isNaN(this._sampled))
    //         this._sampled = this._value.value;

    //     this.output._data = dataFromNumber(this._sampled);
    // }
}
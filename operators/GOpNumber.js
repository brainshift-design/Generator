class   GOpNumber
extends GOperator
{
    #value;

    #sampled = Number.NaN;


    constructor()
    {
        super('number', 'NUM');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#value = new GNumberParam(''));
    }


    generate(callerInput)
    {
        if (this.valid) return;

        //if (isNaN(this.#sampled))
            this.#sampled = this.#value.value;

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  this.#sampled
        };

        super.generate(callerInput);
    }


    reset()
    {
        super.reset();
        
        this.#sampled = Number.NaN;
    }
}
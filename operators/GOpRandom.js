class   GOpRandom
extends GOperator
{
    #min;
    #max;
    #scale;
    #seed;

    noise = new Noise();

    constructor()
    {
        super('random', 'NUM');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#min   = new GNumberParam('min'));
        this.addParam(this.#max   = new GNumberParam('max'));
        this.addParam(this.#scale = new GNumberParam('scale', 1, 1));
        this.addParam(this.#seed  = new GNumberParam('seed'));

        this.output.addEventListener('connect', () => this.reset());
    }


    generate(callerInput)
    {
        if (this.valid) return;

        this.noise.seed.set(callerInput.currentSeed);
        var rnd = this.noise.next(this.#scale.value);
        callerInput.currentSeed = this.noise.seed.current;
        
        var value = this.#min.value + rnd * (this.#max.value - this.#min.value);

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  value
        };

        super.generate(callerInput);

        this.valid = false;
    }


    reset(callerInput = null)
    {
        this.noise.seed.set(this.#seed.value);
        
        for (const input of this.output.connectedInputs)
            input.initialSeed = this.noise.next();

        super.reset();
    }
}
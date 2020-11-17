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

        this.addParam(this.#min   = new GNumberParam('min',   0));
        this.addParam(this.#max   = new GNumberParam('max', 100));
        this.addParam(this.#scale = new GNumberParam('scale', 1, 1));
        this.addParam(this.#seed  = new GNumberParam('seed', 0, 0));

        this.output.addEventListener('connect', () => this.reset());
    }


    generate(callerInput)
    {
        if (this.valid) return;

        if (!!callerInput) this.noise.seed.set(callerInput.currentSeed);
        var rnd = this.noise.next(this.#scale.value);
        if (!!callerInput) callerInput.currentSeed = this.noise.seed.current;
        
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


    reset()
    {
        this.noise.seed.set(this.#seed.value);
        
        for (const input of this.output.connectedInputs)
            input.initialSeed = this.noise.next();

        super.reset();
    }
}
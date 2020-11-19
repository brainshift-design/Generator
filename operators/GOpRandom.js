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
        this.addParam(this.#seed  = new GNumberParam('seed', 1, 1));

        this.output.addEventListener('connect',    () => postMessage({msg: 'resetNode', nodeId: this.id}));
        this.output.addEventListener('disconnect', () => postMessage({msg: 'resetNode', nodeId: this.id}));
    }


    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);

        if (!!callerInput) this.noise.seed.current = callerInput.currentSeed;
        var rnd = this.noise.next(this.#scale.value);
        if (!!callerInput) callerInput.currentSeed = this.noise.seed.current;
        
        var value = this.#min.value + rnd * (this.#max.value - this.#min.value);

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  value
        };    

        this.valid = false;
    }


    reset()
    {
        super.reset();

        this.noise.seed.set(this.#seed.value);
        
        for (const input of this.output.connectedInputs)
        {
            input.initialSeed = input.currentSeed = this.noise.seed.current;
            this.noise.next();
        }
    }
}
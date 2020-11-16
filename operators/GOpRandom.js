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
    }


    generate()
    {
        if (this.valid) return;

        var rnd   = this.noise.next(this.#scale.value);
        var value = this.#min.value + rnd * (this.#max.value - this.#min.value);

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  value
        };

        super.generate();

        this.valid = false;
    }


    reset()
    {
        this.noise.seed.set(this.#seed.value);
        //super.reset();
    }
}
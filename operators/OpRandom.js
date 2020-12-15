class   OpRandom
extends Operator
{
    #min;
    #max;
    #scale;
    #seed;


    constructor()
    {
        super('random', 'NUM');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#min   = new NumberParam('min',  0));
        this.addParam(this.#max   = new NumberParam('max', 10));
        this.addParam(this.#scale = new NumberParam('scale', 1, 1));
        this.addParam(this.#seed  = new NumberParam('seed', 1, 1));

        this.#min.control.addEventListener('change', () =>
        {
            if (this.#min.value > this.#max.value)
                this.#max.value = this.#min.value;
        });

        this.#max.control.addEventListener('change', () =>
        {
            if (this.#max.value < this.#min.value)
                this.#min.value = this.#max.value;
        });
    }
}
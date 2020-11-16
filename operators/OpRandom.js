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

        this.addParam(this.#min   = new NumberParam('min'));
        this.addParam(this.#max   = new NumberParam('max'));
        this.addParam(this.#scale = new NumberParam('scale', 1, 1));
        this.addParam(this.#seed  = new NumberParam('seed'));

        this.#min.control.addEventListener('onchange', () =>
        {
            if (this.#min.control.value > this.#max.control.value)
                this.#max.control.setValue(this.#min.control.value, false);
        });

        this.#max.control.addEventListener('onchange', () =>
        {
            if (this.#max.control.value < this.#min.control.value)
                this.#min.control.setValue(this.#max.control.value, false);
        });
    }
}
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

        this.#max.control.min = this.#min.value;
        this.#min.control.max = this.#max.value;

        this.#min.control.addEventListener('change', () =>
        {
            // if (this.#min.value > this.#max.value)
            //     this.#min.value = this.#max.value;

            this.#max.control.min = this.#min.value;
            this.updateConnectedInputValueText();
        });

        this.#max.control.addEventListener('change', () =>
        {
            // if (this.#max.value < this.#min.value)
            //     this.#max.value = this.#min.value;

            this.#min.control.max = this.#max.value;
            this.updateConnectedInputValueText();
        });
    }


    updateConnectedInputValueText()
    {
        const val =
            this.#min.value == this.#max.value
            ? this.#min.value
            : this.#min.value + '~' + this.#max.value;

        if (this.output)
        {
            for (const input of this.output.connectedInputs)
                input.param.valueText = val;
        }
    }
}
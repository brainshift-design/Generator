class   GOpRandom
extends GOperator
{
    #min;
    #max;
    #scale;
    #seed;


    constructor()
    {
        super('random', 'NUM');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#min   = new GNumberParam('min'));
        this.addParam(this.#max   = new GNumberParam('max'));
        this.addParam(this.#scale = new GNumberParam('scale', 1, 1));
        this.addParam(this.#seed  = new GNumberParam('seed'));

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


    generate()
    {
        if (this.valid) return;

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,
            
            min:    this.#min  .value,
            max:    this.#max  .value,
            scale:  this.#scale.value,
            seed:   this.#seed .value
        };

        super.generate();
    }
}
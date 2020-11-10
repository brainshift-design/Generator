class   OpRandom
extends Operator
{
    #min;
    #max;
    #scale;


    constructor()
    {
        super('random', 'NUM');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#min   = new NumberParam('min'));
        this.addParam(this.#max   = new NumberParam('max'));
        this.addParam(this.#scale = new NumberParam('scale', 1, 1));
    }


    generate()
    {
        if (this.valid) return;

        this.output._data = 
        {
            id:    this.id,
            type:  this.type,
            
            min:   this.#min  .value,
            max:   this.#max  .value,
            scale: this.#scale.value
        };

        super.generate();
    }
}
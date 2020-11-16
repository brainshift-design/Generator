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
    }


    generate()
    {
        if (this.valid) return;

        
        var value = 0;


        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  value,
        };

        super.generate();

        this.valid = false;
    }
}
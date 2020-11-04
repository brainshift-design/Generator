class   OpRect
extends Operator
{
    #width;
    #height;


    constructor()
    {
        super('rect');

        this.setOutput(new Output('rect'));

        this.addParam(this.#width  = new ValueParam('width',  0.01, Number.MAX_SAFE_INTEGER, 10));
        this.addParam(this.#height = new ValueParam('height', 0.01, Number.MAX_SAFE_INTEGER, 10));
    }


    generate()
    {
        if (!this.valid)
        {
            this.output._data = 
            {
                id:     this.id,
                type:   this.type,
                width:  this.#width .value,
                height: this.#height.value,

                inputs: []
            };
    
            super.generate();
        }
        
        return this.output._data;
    }
}
class   OpRect
extends Operator
{
    #width;
    #height;


    constructor()
    {
        super('rect', 'OBJ');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#width  = new NumberParam('width',  10, 0.01));
        this.addParam(this.#height = new NumberParam('height', 10, 0.01));
    }


    generate()
    {
        if (this.valid) return;

        this.output._data = 
        {
            id:     this.id,
            type:   this.opType,

            x:      0,
            y:      0,
            width:  this.#width .value,
            height: this.#height.value,

            inputs: []
        };

        super.generate();
    }
}
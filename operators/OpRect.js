class   OpRect
extends Operator
{
    #width;
    #height;

    constructor()
    {
        super('rect');

        this.setOutput(new Output('rect'));

        this.#width = new ValueParam('width',  0, Number.MAX_SAFE_INTEGER, 50);
        this.addParam(this.#width);

        this.#height = new ValueParam('height', 0, Number.MAX_SAFE_INTEGER, 50);
        this.addParam(this.#height);
    }

    update()
    {   
        this.output._data = 
        {
            id:     this.id,
            type:   this.type,
            width:  this.#width .value,
            height: this.#height.value
        };

        super.update();
    }
}
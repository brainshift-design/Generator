class   GOpRect
extends GOperator
{
    #x;
    #y;
    #width;
    #height;
    #round;
    #color;
   


    constructor()
    {
        super('rect', 'object');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#x      = new GNumberParam('x',      true,   0));
        this.addParam(this.#y      = new GNumberParam('y',      true,   0));
        this.addParam(this.#width  = new GNumberParam('width',  true, 100, 0.01));
        this.addParam(this.#height = new GNumberParam('height', true, 100, 0.01));
        this.addParam(this.#round  = new GNumberParam('round',  true,   0, 0));
        this.addParam(this.#color  = new GColorParam ('color',  true));
    }

    

    generate(callerInput)
    {
        if (this.valid) return;
        super.generate(callerInput);


        this.output._data =
        [{
            type:   OBJ_RECT,
            id:     0,
            nodeId: this.id,

            x:      this.#x     .value,
            y:      this.#y     .value,
            width:  this.#width .value,
            height: this.#height.value,
            round:  this.#round .value,
            color:  this.#color .value
        }];
    }
}
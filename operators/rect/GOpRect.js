class   GOpRect
extends GOperator
{
    #x;
    #y;
    #width;
    #height;
    #round;
    


    constructor()
    {
        super('rect', 'object');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#x      = new GNumberParam('x',        0));
        this.addParam(this.#y      = new GNumberParam('y',        0));
        this.addParam(this.#width  = new GNumberParam('width',  100, 0.01));
        this.addParam(this.#height = new GNumberParam('height', 100, 0.01));
        this.addParam(this.#round  = new GNumberParam('round',    0, 0));
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
            round:  this.#round .value
        }];
    }
}
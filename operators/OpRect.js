class   OpRect
extends Operator
{
    #width;
    #height;
    #round;


    constructor()
    {
        super('rect', 'OBJ');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#width  = new NumberParam('width',  100, 0.01));
        this.addParam(this.#height = new NumberParam('height', 100, 0.01));
        this.addParam(this.#round  = new NumberParam('round',    0, 0));
    }


    // generate()
    // {
    //     if (this.valid) return;

    //     this.output._data = 
    //     {
    //         nodeId: this.id,
    //         opType: this.opType,

    //         x:      0,
    //         y:      0,
    //         width:  this.#width .value,
    //         height: this.#height.value
    //     };

    //     super.generate();
    // }
}
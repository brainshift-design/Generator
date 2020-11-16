class   OpColumn
extends Operator
{
    #count;
    #gap;


    constructor()
    {
        super('column', 'OBJ');

        this.addInput (new Input (this.dataType));
        this.setOutput(new Output(this.dataType));
        
        this.addParam(this.#count = new NumberParam('count', 4, 1));
        this.addParam(this.#gap   = new NumberParam('gap', 10, 0));
    }


    // generate()
    // {
    //     if (this.valid) return;

    //     var input = this.inputs[0];

    //     if (   !input.connected
    //         || isEmptyObject(input.connectedOutput.data)) 
    //     {
    //         this.output._data = {};
    //         return;
    //     }

    //     this.output._data = 
    //     {
    //         nodeId: this.id,
    //         opType: this.opType,
    //         count:  this.#count.value,
    //         gap:    this.#gap  .value,

    //         inputs: [input.data]
    //     };

    //     super.generate();
    // }
}
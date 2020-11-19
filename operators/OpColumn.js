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
        
        this.addParam(this.#count = new NumberParam('count', 7, 1));
        this.addParam(this.#gap   = new NumberParam('gap', 10, 0));
    }
}
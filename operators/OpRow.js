class   OpRow
extends Operator
{
    #count;
    #gap;


    constructor()
    {
        super('row', 'OBJ');

        this.addInput (new Input (this.dataType));
        this.setOutput(new Output(this.dataType));
        
        this.addParam(this.#count = new NumberParam('count',  4, 1));
        this.addParam(this.#gap   = new NumberParam('gap',   10, 0));
    }
}
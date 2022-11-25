class   OpColumn
extends Operator
{
    #count;
    #gap;



    constructor()
    {
        super('column', 'object');

        this.addInput (new Input ());
        this.addOutput(new Output());
        
        this.addParam(this.#count = new NumberParam('count', 'count', true,  7, 1));
        this.addParam(this.#gap   = new NumberParam('gap',   'gap',   true, 10, 0));
    }
}
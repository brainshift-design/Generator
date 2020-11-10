class   OpRow
extends Operator
{
    #count;
    #gap;


    constructor()
    {
        super('row');

        this.addInput (new Input ('rect'));
        this.setOutput(new Output('rect'));
        
        this.addParam(this.#count = new ValueParam('count', 1, Number.MAX_SAFE_INTEGER,  4));
        this.addParam(this.#gap   = new ValueParam('gap',   0, Number.MAX_SAFE_INTEGER, 10));
    }


    generate()
    {
        if (this.valid) return;

        var input = this.inputs[0];

        if (   !input.connected
            || isEmptyObject(input.connectedOutput.data))
        {
            this.output._data = {};
            return;
        }


        this.output._data = 
        {
            id:    this.id,
            type:  this.type,

            count: this.#count.value,
            gap:   this.#gap  .value,

            inputs: [input.data]
        };


        super.generate();
    }
}
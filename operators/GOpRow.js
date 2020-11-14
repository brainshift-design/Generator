class   GOpRow
extends GOperator
{
    #count;
    #gap;


    constructor()
    {
        super('row', 'OBJ');

        this.addInput (new GInput (this.dataType));
        this.setOutput(new GOutput(this.dataType));
        
        this.addParam(this.#count = new GNumberParam('count',  4, 1));
        this.addParam(this.#gap   = new GNumberParam('gap',   10, 0));
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
            nodeId: this.id,
            opType: this.opType,

            count: this.#count.value,
            gap:   this.#gap  .value,

            inputs: [input.data]
        };


        super.generate();
    }
}
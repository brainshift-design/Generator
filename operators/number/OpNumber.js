class   OpNumber
extends Operator
{
    #value;

    constructor()
    {
        super('number', 'NUM');

        this.setOutput(new Output(this.dataType));

        this.addParam(this.#value = new NumberParam(''));
    }


    generate()
    {
        if (this.valid) return;

        this.output._data = 
        {
            nodeId: this.id,
            opType: this.opType,

            value:  this.#value.value,
        };

        super.generate();
    }
}
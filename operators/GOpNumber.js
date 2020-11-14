class   GOpNumber
extends GOperator
{
    #value;

    constructor()
    {
        super('number', 'NUM');

        this.setOutput(new GOutput(this.dataType));

        this.addParam(this.#value = new GNumberParam(''));
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
class   UOpNumber
extends UOperator
{
    #value;

    constructor()
    {
        super('number', 'number');

        this.setOutput(new UOutput(this.dataType));

        this.addParam(this.#value = new UNumberParam(''));
    }
}
class   UOpNumber
extends UOperator
{
    #value;

    constructor()
    {
        super('number', 'NUM');

        this.setOutput(new UOutput(this.dataType));

        this.addParam(this.#value = new UNumberParam(''));
    }
}
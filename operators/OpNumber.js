class   OpNumber
extends Operator
{
    #value;


    constructor()
    {
        super('number', 'NUM');

        this.addParam(this.#value = new NumberParam(''));
    }
}
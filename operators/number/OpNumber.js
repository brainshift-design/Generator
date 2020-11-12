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
        this.output._data = this.#value.value;
        super.generate();
    }
}
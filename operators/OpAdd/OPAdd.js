class   OpAdd
extends Operator
{
    #value;



    constructor()
    {
        super('add', 'number');

        this.addInput(new NewInput(this.dataType));
        this.setOutput(new Output(this.dataType));

        this.addParam(this.#value = new NumberParam('', false, false));
    }
}
class   UOpAdd
extends UOperator
{
    #value;


    
    constructor()
    {
        super('add', 'number');

        this.addInput(new UInput(this.dataType));
        this.addInput(new UInput(this.dataType));

        this.setOutput(new UOutput(this.dataType));

        this.addParam(this.#value = new UNumberParam('', false, false));
    }
}
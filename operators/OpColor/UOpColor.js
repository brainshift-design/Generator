class   UOpColor
extends UOperator
{
    #r;
    #g;
    #b;

    constructor()
    {
        super('color', 'color');

        this.setOutput(new UOutput(this.dataType));

        this.addParam(this.#r = new UNumberParam('r', 0, 0, 255));
        this.addParam(this.#g = new UNumberParam('g', 0, 0, 255));
        this.addParam(this.#b = new UNumberParam('b', 0, 0, 255));
    }
}
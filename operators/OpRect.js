class   OpRect
extends Operator
{
    #width;
    #height;

    constructor()
    {
        super('rect');

        this.#width = new ValueParam('Width',  0, Number.MAX_SAFE_INTEGER);
        this.addParam(this.#width);

        this.#height = new ValueParam('Height', 0, Number.MAX_SAFE_INTEGER);
        this.addParam(this.#height);
    }

    update()
    {
        // TODO add an "update this rect" instruction to the update list,
        // maybe through super.update('instruction')
        super.update();
    }
}
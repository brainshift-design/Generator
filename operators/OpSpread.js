class   OpSpread 
extends Operator
{
    #radius;
    #density;

    constructor()
    {
        super('spread');

        this.#radius = new ValueParam('Radius',  0, Number.MAX_SAFE_INTEGER);
        this.addParam(this.#radius);

        this.#density = new ValueParam('Density', 0, Number.MAX_SAFE_INTEGER);
        this.addParam(this.#density);
    }

    update()
    {
        // TODO add an "update this spread" instruction to the update list,
        // maybe through super.update('instruction')
        super.update();
    }
}
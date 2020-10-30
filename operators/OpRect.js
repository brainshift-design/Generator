class   OpRect
extends Operator
{
    constructor()
    {
        super('rect');

        var w = new ValueParam('Width',  0, Number.MAX_SAFE_INTEGER);
        var h = new ValueParam('Height', 0, Number.MAX_SAFE_INTEGER);

        this.params.push(w);
        this.params.push(h);
    }

    update()
    {
        // TODO add an "update this rect" instruction to the update list,
        // maybe through super.update('instruction')
        super.update();
    }
}
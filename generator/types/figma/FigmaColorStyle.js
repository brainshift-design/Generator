class FigmaColorStyle
extends FigmaObject
{
    constructor(nodeId, id)
    {
        super(COLOR_STYLE, nodeId, id);
    }



    copy()
    {
        const style = new FigmaColorStyle(
            this.nodeId,
            this.id);

        style.copyBase(this);

        return style;
    }
}
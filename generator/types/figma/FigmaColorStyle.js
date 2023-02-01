class FigmaColorStyle
extends FigmaObject
{
    styleName;



    constructor(nodeId, nodeName)
    {
        super(COLOR_STYLE, nodeId, nodeName);

        this.styleName = nodeName;
    }



    copy()
    {
        const copy = new FigmaColorStyle(
            this.nodeId,
            this.nodeName);

        copy.copyBase(this);

        return copy;
    }
}
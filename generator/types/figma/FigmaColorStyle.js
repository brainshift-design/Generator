class FigmaColorStyle
extends FigmaObject
{
    styleId;



    constructor(nodeId, nodeName, styleId)
    {
        super(COLOR_STYLE, nodeId, nodeName, nodeName);

        this.styleId = styleId;
    }



    copy()
    {
        const style = new FigmaColorStyle(
            this.nodeId,
            this.nodeName,
            this.styleId);

        style.copyBase(this);

        return style;
    }
}
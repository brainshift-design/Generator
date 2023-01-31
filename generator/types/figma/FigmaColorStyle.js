class FigmaColorStyle
extends FigmaObject
{
    styleId;
    styleIndex;



    constructor(nodeId, nodeName, styleId, styleIndex)
    {
        super(COLOR_STYLE, nodeId, nodeName, nodeName);

        this.styleId    = styleId;
        this.styleIndex = styleIndex;
    }



    copy()
    {
        const style = new FigmaColorStyle(
            this.nodeId,
            this.nodeName,
            this.styleId,
            this.styleIndex);

        style.copyBase(this);

        return style;
    }
}
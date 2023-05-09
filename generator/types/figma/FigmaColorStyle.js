class FigmaColorStyle
extends FigmaObject
{
    id;
    name;

    existing;



    constructor(nodeId, nodeName, styleId, styleName)
    {
        super(COLOR_STYLE, nodeId, nodeName);

        this.id   = styleId;
        this.name = styleName;
    }



    copy()
    {
        const copy = new FigmaColorStyle(this.nodeId, this.nodeName, this.id, this.name);

        copy.copyBase(this);

        copy.existing = this.existing;

        return copy;
    }
}
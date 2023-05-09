class FigmaColorStyle
extends FigmaObject
{
    id;
    name;

    existing;



    constructor(nodeId, styleId, styleName)
    {
        super(COLOR_STYLE, nodeId, nodeName);

        this.id   = styleId;
        this.name = styleName;
    }



    copy()
    {
        const copy = new FigmaColorStyle(this.nodeId, this.id, this.name);

        copy.copyBase(this);

        copy.existing = this.existing;

        return copy;
    }
}
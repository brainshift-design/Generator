class FigmaColorStyle
extends FigmaObject
{
    styleId;
    styleName;

    existing;



    constructor(nodeId, styleId, styleName)
    {
        super(COLOR_STYLE, nodeId);

        this.styleId   = styleId;
        this.styleName = styleName;
    }



    copy()
    {
        const copy = new FigmaColorStyle(this.nodeId, this.styleId, this.styleName);

        copy.copyBase(this);

        copy.existing = this.existing;

        return copy;
    }



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            styleId:   this.styleId,
            styleName: this.styleName
        };
    }
}
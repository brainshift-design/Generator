class FigmaColorStyle
{
    type;
    
    nodeId = '';

    styleId;
    styleName;

    paints = [];

//    existing;



    constructor(nodeId, styleId, styleName)
    {
        this.type      = COLOR_STYLE;
        this.nodeId    = nodeId;

        this.styleId   = styleId;
        this.styleName = styleName;
    }



    copy()
    {
        const copy = new FigmaColorStyle(this.nodeId, this.styleId, this.styleName);

//        copy.existing = this.existing;

        return copy;
    }



    toData()
    {
        return [
        /* 0 */ this.type,
        /* 1 */ this.nodeId,

        /* 2 */ this.styleId,
        /* 3 */ this.styleName,
        
        /* 4 */ this.paints
        ];
    }
}
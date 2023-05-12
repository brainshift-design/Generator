class FigmaShape
extends FigmaObject
{
    fills    = [];
    strokes  = [];

    strokeWeight;
    strokeAlign;
    strokeJoin;
    strokeMiterLimit;



    constructor(type, nodeId, objectId, objectName)
    {
        super(type, nodeId, objectId, objectName);
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        this.fills            = [...base.fills  ];
        this.strokes          = [...base.strokes];

        this.strokeWeight     = base.strokeWeight;
        this.strokeAlign      = base.strokeAlign;
        this.strokeJoin       = base.strokeJoin;
        this.strokeMiterLimit = base.strokeMiterLimit;
    }
}
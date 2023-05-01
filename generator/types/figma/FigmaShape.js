class FigmaShape
extends FigmaObject
{
    objectId = NULL;

    fills    = [];
    strokes  = [];

    strokeWeight;
    strokeAlign;
    strokeJoin;
    strokeMiterLimit;



    constructor(type, nodeId, objectId)
    {
        super(type, nodeId);

        this.objectId = objectId;
    }



    copyBase(base)
    {
        this.fills            = clone(base.fills);
        this.strokes          = clone(base.strokes);

        this.strokeWeight     = base.strokeWeight;
        this.strokeAlign      = base.strokeAlign;
        this.strokeJoin       = base.strokeJoin;
        this.strokeMiterLimit = base.strokeMiterLimit;
    }
}
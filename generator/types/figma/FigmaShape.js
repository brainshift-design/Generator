class FigmaShape
extends FigmaObject
{
    objectId = -1;

    fills    = [];
    strokes  = [];

    strokeWeight;
    strokeFit;
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
        this.strokeFit        = base.strokeFit;
        this.strokeJoin       = base.strokeJoin;
        this.strokeMiterLimit = base.strokeMiterLimit;
    }
}
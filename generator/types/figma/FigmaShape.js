class FigmaShape
extends FigmaObject
{
    objectId    = -1;

    fills       = [];
    strokeFills = [];

    strokeWeight;
    strokeFit;
    strokeJoin;
    strokeMiter;



    constructor(type, nodeId, nodeName, objectId)
    {
        super(type, nodeId, nodeName);

        this.objectId = objectId;
    }



    copyBase(base)
    {
        this.fills        = clone(base.fills);
        this.strokeFills  = clone(base.strokeFills);

        this.strokeWeight = base.strokeWeight;
        this.strokeFit    = base.strokeFit;
        this.strokeJoin   = base.strokeJoin;
        this.strokeMiter  = base.strokeMiter;
    }
}
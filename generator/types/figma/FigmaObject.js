class FigmaObject
{
    type;

    nodeId      = '';
    id          = -1;

    fills       = [];
    strokeFills = [];

    strokeWeight;
    strokeFit;
    strokeJoin;
    strokeMiter;



    constructor(type, nodeId, id)
    {
        this.type   = type;

        this.nodeId = nodeId;
        this.id     = id;
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
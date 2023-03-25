class FigmaObject
{
    type;
    nodeId = '';


    constructor(type, nodeId)
    {
        this.type   = type;
        this.nodeId = nodeId;
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
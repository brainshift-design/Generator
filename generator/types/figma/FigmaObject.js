class FigmaObject
{
    type;

    nodeId   = '';
    nodeName = '';


    constructor(type, nodeId, nodeName)
    {
        this.type     = type;

        this.nodeId   = nodeId;
        this.nodeName = nodeName;
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
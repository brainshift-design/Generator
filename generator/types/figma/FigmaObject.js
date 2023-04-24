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
        this.fills            = clone(base.fills);
        this.stroks           = clone(base.strokes);
    
        this.strokeWeight     = base.strokeWeight;
        this.strokeFit        = base.strokeFit;
        this.strokeJoin       = base.strokeJoin;
        this.strokeMiterLimit = base.strokeMiterLimit;
    }
}
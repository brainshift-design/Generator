class FigmaShape
extends FigmaObject
{
    fills   = [];
    strokes = [];

    strokeWeight;
    strokeAlign;
    strokeJoin;
    strokeMiterLimit;

    effects = [];



    constructor(type, nodeId, objectId, objectName)
    {
        super(type, nodeId, objectId, objectName);
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        this.fills            = clone(base.fills  );
        this.strokes          = clone(base.strokes);
        this.effects          = clone(base.effects);

        this.strokeWeight     = base.strokeWeight;
        this.strokeAlign      = base.strokeAlign;
        this.strokeJoin       = base.strokeJoin;
        this.strokeMiterLimit = base.strokeMiterLimit;
    }
}
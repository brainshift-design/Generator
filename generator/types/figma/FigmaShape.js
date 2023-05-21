class FigmaShape
extends FigmaObject
{
    skewX;
    skewY;

    fills   = [];
    strokes = [];

    strokeWeight;
    strokeAlign;
    strokeJoin;
    strokeMiterLimit;

    effects = [];

    isMask  = false;



    constructor(type, nodeId, objectId, objectName)
    {
        super(type, nodeId, objectId, objectName);

        this.skewX = 0;
        this.skewY = 0;
    }



    copyBase(base)
    {
        super.copyBase(base);

        this.skewX            = base.skewX;
        this.skewY            = base.skewY;

        this.fills            = clone(base.fills  );
        this.strokes          = clone(base.strokes);
        this.effects          = clone(base.effects);

        this.strokeWeight     = base.strokeWeight;
        this.strokeAlign      = base.strokeAlign;
        this.strokeJoin       = base.strokeJoin;
        this.strokeMiterLimit = base.strokeMiterLimit;
    }
}
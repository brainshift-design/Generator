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

    isDeco;

    isMask  = false;



    constructor(type, nodeId, objectId, objectName, isDeco = false)
    {
        super(type, nodeId, objectId, objectName);

        this.skewX  = 0;
        this.skewY  = 0;

        this.isDeco = isDeco;
    }



    copyBase(base)
    {
        super.copyBase(base);

        this.skewX            = base.skewX;
        this.skewY            = base.skewY;

        this.fills            = clone(base.fills);
        this.strokes          = clone(base.strokes);

        this.strokeWeight     = base.strokeWeight;
        this.strokeAlign      = base.strokeAlign;
        this.strokeJoin       = base.strokeJoin;
        this.strokeMiterLimit = base.strokeMiterLimit;

        this.effects          = clone(base.effects);

        this.isDeco           = base.isDeco;

        this.isMask           = base.isMask;
    }



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            fills:            this.fills,
            strokes:          this.strokes,

            strokeWeight:     this.strokeWeight,
            strokeAlign:      this.strokeAlign,
            strokeJoin:       this.strokeJoin,
            strokeMiterLimit: this.strokeMiterLimit,

            effects:          this.effects,

            isDeco:           this.isDeco,

            isMask:           this.isMask
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 10 */ this.fills,
            /* 11 */ this.strokes,

            /* 12 */ this.strokeWeight,
            /* 13 */ this.strokeAlign,
            /* 14 */ this.strokeJoin,
            /* 15 */ this.strokeMiterLimit,

            /* 16 */ this.effects,

            /* 17 */ this.isDeco,

            /* 18 */ this.isMask
        ];
    }
}

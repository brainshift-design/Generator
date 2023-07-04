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
   
            /*  9 */ this.fills,
            /* 10 */ this.strokes,

            /* 11 */ this.strokeWeight,
            /* 12 */ this.strokeAlign,
            /* 13 */ this.strokeJoin,
            /* 14 */ this.strokeMiterLimit,

            /* 15 */ this.effects,

            /* 16 */ this.isDeco,

            /* 17 */ this.isMask
        ];
    }
}



const FO_FILLS          =  9;
const FO_STROKES        = 10;

const FO_STROKE_WEIGHT  = 11;
const FO_STROKE_ALIGN   = 12;
const FO_STROKE_JOIN    = 13;
const FO_STROKE_MITER   = 14;

const FO_EFFECTS        = 15;

const FO_DECO           = 16;

const FO_MASK           = 17;

const FO_X              = 18;
const FO_Y              = 19;
const FO_WIDTH          = 20;
const FO_HEIGHT         = 21;
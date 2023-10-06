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
    strokeCap;
    strokeDashes;

    effects = [];

    isDeco;
    isXform;

    opacity;
    blend;

    maskType = 0;



    constructor(type, nodeId, objectId, objectName, isDeco = false, isXform = false)
    {
        super(type, nodeId, objectId, objectName);

        this.skewX   = 0;
        this.skewY   = 0;

        this.isDeco  = isDeco;
        this.isXform = isXform;

        this.opacity = 1;
        this.blend   = 'PASS_THROUGH';
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
        this.strokeCap        = base.strokeCap;
        this.strokeDashes     = base.strokeDashes;

        this.effects          = clone(base.effects);

        this.isDeco           = base.isDeco;
        this.isXform          = base.isXform;

        this.opacity          = base.opacity;
        this.blend            = base.blend;
        this.maskType         = base.maskType;
    }



    toData()
    {
        const weight = this.strokeWeight * Math.abs(this.scaleStyle);

        const dashes = 
            this.strokeDashes
            ? this.strokeDashes
                .split(',')
                .map(d => parseFloat(d.trim()) * Math.abs(this.scaleStyle))
                .join(',')
            : '';

        
        return [
            ...super.toData(),
   
            /* 10 */ this.fills,
            /* 11 */ this.strokes,

            /* 12 */ weight,
            /* 13 */ this.strokeAlign,
            /* 14 */ this.strokeJoin,
            /* 15 */ this.strokeMiterLimit,
            /* 16 */ this.strokeCap,
            /* 17 */ dashes,

            /* 18 */ this.effects,

            /* 19 */ this.isDeco,

            /* 20 */ this.opacity,
            /* 21 */ this.blend,
            /* 22 */ this.maskType
        ];
    }
}

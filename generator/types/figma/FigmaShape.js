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
    isCenter;
    isXform;

    opacity;
    blend;

    maskType = 0;



    constructor(type, nodeId, objectId, objectName, isDeco = false, isXform = false)
    {
        super(type, nodeId, objectId, objectName);

        this.skewX    = 0;
        this.skewY    = 0;

        this.isDeco   = isDeco;
        this.isCenter = false;
        this.isXform  = isXform;

        this.opacity  = 1;
        this.blend    = 'PASS_THROUGH';
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
        this.isCenter         = base.isCenter;
        this.isXform          = base.isXform;

        this.opacity          = base.opacity;
        this.blend            = base.blend;
        this.maskType         = base.maskType;
    }



    checkFlipped(flipX, flipY)
    {
        super.checkFlipped(flipX, flipY);

        for (const fill of this.fills)
            flipIfGradient(fill, flipX, flipY);

        for (const stroke of this.strokes)
            flipIfGradient(stroke, flipX, flipY);
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
            /* 20 */ this.isCenter,

            /* 21 */ this.opacity,
            /* 22 */ this.blend,
            /* 23 */ this.maskType
        ];
    }
}



function flipIfGradient(fill, flipX, flipY)
{
    if (   fill[0] == 'GRADIENT_LINEAR'
        || fill[0] == 'GRADIENT_RADIAL'
        || fill[0] == 'GRADIENT_ANGULAR'
        || fill[0] == 'GRADIENT_DIAMOND')
    {
        const p0 = fill[1][0];
        const p1 = fill[1][1];
        const p2 = fill[1][2];

        if (flipX)
        {
            p0.x = 1 - p0.x;
            p1.x = 1 - p1.x;
            p2.x = 1 - p2.x;
        }

        if (flipY)
        {
            p0.y = 1 - p0.y;
            p1.y = 1 - p1.y;
            p2.y = 1 - p2.y;
        }
    }
}
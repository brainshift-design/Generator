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



    checkFlipped()
    {
        const [cx, cy, nx, ny] = this.getFlipFactors();


        for (const fill of this.fills)
        {
            if (   fill[0] != 'GRADIENT_LINEAR'
                && fill[0] != 'GRADIENT_RADIAL'
                && fill[0] != 'GRADIENT_ANGULAR'
                && fill[0] != 'GRADIENT_DIAMOND')
                continue;


            const angle = anglev(subv(this.xp1, this.xp0));
            
            const vertical = 
                   angle >= Tau*1/8 && angle < Tau*3/8
                || angle >= Tau*5/8 && angle > Tau*7/8;
                
            if (    vertical && cy > 0
                || !vertical && cx < 0)
            {
                for (const stop of fill[2])
                    stop[4] = 1 - stop[4];
            }
        }


        super.checkFlipped();
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

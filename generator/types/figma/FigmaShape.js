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
        const [cx, cy, nx, ny] = this.getFlipFactors();
        
        
        super.checkFlipped(flipX, flipY);


        for (const fill of this.fills)
        {
            if (   fill[0] != 'GRADIENT_LINEAR'
                && fill[0] != 'GRADIENT_RADIAL'
                && fill[0] != 'GRADIENT_ANGULAR'
                && fill[0] != 'GRADIENT_DIAMOND')
                continue;


            //console.log('fill =', fill);

            const objAngle  = anglev(subv(this.xp1, this.xp0));
            const gradAngle = anglev(subv(fill[1][1], fill[1][0]));
            
            const angle     = trimAngle(objAngle + gradAngle);

            
            const vertical = 
                   angle >= Tau*1/8 && angle < Tau*3/8
                || angle >= Tau*5/8 && angle < Tau*7/8;

            const _flipX = ((fill[4] >> 0) & 1) != 0;
            const _flipY = ((fill[4] >> 1) & 1) != 0;


            //console.log('fill =', fill);
            console.clear();
            console.log('objAngle =', objAngle);
            console.log('gradAngle =', gradAngle);
            console.log('angle =', Math.round(angle/Tau*360));
            console.log('vertical =', vertical);
            // console.log('cx =', cx);
            // console.log('cy =', cy);
            console.log('flipX =', flipX);
            console.log('flipY =', flipY);
            console.log('_flipX =', _flipX);
            console.log('_flipY =', _flipY);
            console.log('');


            if (   fill[0] == 'GRADIENT_LINEAR')
                //|| fill[0] == 'GRADIENT_ANGULAR')
            {
                // if (    _flipX && _flipY)
                // {
                //     console.log('reverse 1');
                //     fill[2].reverse();
                    
                //     for (const stop of fill[2])
                //         stop[4] = 1 - stop[4];
                // }
                // else if (   !vertical && flipX && _flipX && (angle < Tau*1/8 || angle > Tau*7/8))
                // {
                //     console.log('reverse 2');
                //     fill[2].reverse();
                    
                //     for (const stop of fill[2])
                //         stop[4] = 1 - stop[4];
                // }
                // else if (    vertical && flipX && _flipX && angle > Tau/2)
                // {
                //     console.log('reverse 3');
                //     fill[2].reverse();
                    
                //     for (const stop of fill[2])
                //         stop[4] = 1 - stop[4];
                // }
                // else if (    vertical && _flipY && angle > Tau*1/4 && angle < Tau*3/4)
                // {
                //     console.log('reverse 4');
                //     fill[2].reverse();
                    
                //     for (const stop of fill[2])
                //         stop[4] = 1 - stop[4];
                // }
            }


            // if (   fill[0] == 'GRADIENT_LINEAR'
            //     || fill[0] == 'GRADIENT_ANGULAR'
            //     || fill[0] == 'GRADIENT_RADIAL'
            //     || fill[0] == 'GRADIENT_DIAMOND')
            // {
            //     if (!vertical && cx < 0)
            //     {
            //         fill[1][1][0][2]  = 1 - fill[1][1][0][2];
            //         fill[1][1][0][0] *= -1;
            //     }
                
            //     if (vertical && cy > 0)
            //     {
            //         console.log('vertical');
            //         fill[1][1][1][2] = 1 - fill[1][1][1][2];
            //         fill[1][1][1][1] *= -1;
            //     }
            // }
        }
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

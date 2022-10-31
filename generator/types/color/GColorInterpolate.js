class GColorInterpolate
extends GColorType
{
    input0 = null;
    input1 = null;

    space;
    amount;
    gamma;


    constructor(nodeId, options)
    {
        super(COLOR_INTERPOLATE, nodeId, options);
    }


    
    copy()
    {
        const lerp = new GColorInterpolate(this.nodeId, this.options);

        lerp.copyBase(this);

        if (this.input0) lerp.input0 = this.input0.copy();
        if (this.input1) lerp.input1 = this.input1.copy();

        lerp.space  = this.space .copy();
        lerp.amount = this.amount.copy();
        lerp.gamma  = this.gamma .copy();

        return lerp;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.space  = this.space .eval(parse).copy();
        this.amount = this.amount.eval(parse).copy();
        this.gamma  = this.gamma .eval(parse).copy();

        const space  = this.space .toValue();
        const amount = this.amount.toValue();
        const gamma  = this.gamma .toValue();


        if (   this.input0 
            && this.input1)
        {
            this.input0 = this.input0.eval(parse).copy();
            this.input1 = this.input1.eval(parse).copy();

            const col0 = this.input0.toValue();
            const col1 = this.input1.toValue();

            console.assert(
                amount.type == NUMBER_VALUE, 
                'this.result.type must be NUMBER_VALUE');

            const f = amount.value / 100;

            const _space = colorSpace(space.value);

            const col = this.interpolate(
                space.value,
                convertDataColorToSpace(col0.toDataColor(), _space),
                convertDataColorToSpace(col1.toDataColor(), _space),
                f,
                gamma.value);


            // allow interpolating invalid colors,
            // so no valid color check here

            const factor = getColorSpaceFactor(_space);

            this.value = ColorValue.create(
                space.value,
                col[1] * factor[0],
                col[2] * factor[1],
                col[3] * factor[2]);
        }

        else if (this.input0) 
        {
            this.input0 = this.input0.eval(parse).copy();
            this.value = this.input0.toValue();
        }
        else if (this.input1) 
        {
            this.input1 = this.input1.eval(parse).copy();
            this.value = this.input1.toValue();
        }
        else 
            this.value = ColorValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value',  this.value);
        genPushUpdateValue(parse, this.nodeId, 'space',  space );
        genPushUpdateValue(parse, this.nodeId, 'amount', amount);
        genPushUpdateValue(parse, this.nodeId, 'gamma',  gamma );


        this.valid = true;
        
        return this;
    }



    interpolate(space, col0, col1, f, gamma)
    {
        if (space <= 1) // hex, rgb
        {
            const r0 = Math.pow(col0[1], gamma);  const r1 = Math.pow(col1[1], gamma);
            const g0 = Math.pow(col0[2], gamma);  const g1 = Math.pow(col1[2], gamma);
            const b0 = Math.pow(col0[3], gamma);  const b1 = Math.pow(col1[3], gamma);

            gamma = Math.max(0.01, gamma);

            return [
                colorSpace(space),
                Math.pow(lerp(r0, r1, f), 1/gamma),
                Math.pow(lerp(g0, g1, f), 1/gamma),
                Math.pow(lerp(b0, b1, f), 1/gamma) ];
        }
        else // hsv/hsl/hcl
        {
            const h0 = col0[1] * Tau;  const h1 = col1[1] * Tau;
            const c0 = col0[2];        const c1 = col1[2];
            const l0 = col0[3];        const l1 = col1[3];

            return [
                colorSpace(space),
                normalAngle(h0 + angleDiff(h0, h1) * f) / Tau,
                lerp(c0, c1, f),
                lerp(l0, l1, f) ];
        }
    }
}

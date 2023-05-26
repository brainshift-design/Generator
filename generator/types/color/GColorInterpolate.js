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
        const copy = new GColorInterpolate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input0) copy.input0 = this.input0.copy();
        if (this.input1) copy.input1 = this.input1.copy();

        copy.space  = this.space .copy();
        copy.amount = this.amount.copy();
        copy.gamma  = this.gamma .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const space  = (await this.space .eval(parse)).toValue().toInteger();
        const amount = (await this.amount.eval(parse)).toValue();
        const gamma  = (await this.gamma .eval(parse)).toValue();


        if (   this.input0 
            && this.input1)
        {
            const input0 = (await this.input0.eval(parse)).toValue();
            const input1 = (await this.input1.eval(parse)).toValue();

            console.assert(
                amount.type == NUMBER_VALUE, 
                'this.result.type must be NUMBER_VALUE');

            const f = amount.value / 100;


            const spaceIndex = Math.min(Math.max(0, space.value), colorSpaceCount()-1);
            const gammaValue = Math.max(0.0001, gamma.value);

            const _space = colorSpace(spaceIndex);

            const _color = this.interpolate(
                spaceIndex,
                convertDataColorToSpace(input0.toDataColor(), _space),
                convertDataColorToSpace(input1.toDataColor(), _space),
                f,
                gammaValue);


            // allow interpolating invalid colors,
            // so no valid color check here

            this.value = ColorValue.fromDataColor(_color, spaceIndex);
        }

        else if (this.input0) 
            this.value = (await this.input0.eval(parse)).toValue();

        else if (this.input1) 
            this.value = (await this.input1.eval(parse)).toValue();
            
        else 
            this.value = ColorValue.NaN;


        this.updateValues =
        [
            ['space',  space     ],
            ['amount', amount    ],
            ['gamma',  gamma     ],
            [returnValueId,  this.value]
        ];
        

        this.validate();
        
        return this;
    }



    interpolate(space, col0, col1, f, gamma)
    {
        if (   space <= 1
            || space >  6) // hex, rgb, okLab, lab, luv
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



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0) this.input0.pushValueUpdates(parse);
        if (this.input1) this.input1.pushValueUpdates(parse);
        if (this.space ) this.space .pushValueUpdates(parse);
        if (this.amount) this.amount.pushValueUpdates(parse);
        if (this.gamma ) this.gamma .pushValueUpdates(parse);
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input0) this.input0.invalidateInputs();
        if (this.input1) this.input1.invalidateInputs();
        if (this.space ) this.space .invalidateInputs();
        if (this.amount) this.amount.invalidateInputs();
        if (this.gamma ) this.gamma .invalidateInputs();
    }
}

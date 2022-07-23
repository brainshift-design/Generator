class GColorInterpolate
extends GOperator
{
    input0 = null;
    input1 = null;

    space;
    amount;
    gamma;


    constructor(nodeId, active)
    {
        super(COLOR_INTERPOLATE, nodeId, active);
    }


    
    copy()
    {
        const lerp = new GColorInterpolate(this.nodeId, this.active);

        if (this.input0) lerp.input0 = this.input0.copy();
        if (this.input1) lerp.input1 = this.input1.copy();

        lerp.space  = this.space .copy();
        lerp.amount = this.amount.copy();
        lerp.gamma  = this.gamma .copy();

        return lerp;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result       = new GColorValue();

            this.result.space = this.space .eval(parse).copy();
            const amount      = this.amount.eval(parse).copy();
            const gamma       = this.gamma .eval(parse).copy();


            if (   this.input0 
                && this.input1)
            {
                const input0 = this.input0.eval(parse).copy();
                const input1 = this.input1.eval(parse).copy();


                console.assert(amount.type == NUMBER_VALUE);
                const f = amount.value / 100;

                const _space = colorSpace(this.result.space.value);
                

                const col0 = input0.toDataColor();
                const col1 = input1.toDataColor();

                const col = this.interpolate(
                    this.result.space.value,
                    dataColor2array(convertDataColorToSpace(col0, _space)),
                    dataColor2array(convertDataColorToSpace(col1, _space)),
                    f,
                    gamma);


                const scale = getColorSpaceScale(_space);

                this.result.c1 = new GNumberValue(col[0] * scale[0]);
                this.result.c2 = new GNumberValue(col[1] * scale[1]);
                this.result.c3 = new GNumberValue(col[2] * scale[2]);
            }

            else if (this.input0) this.result = this.input0.eval(parse).copy();
            else if (this.input1) this.result = this.input1.eval(parse).copy();
            

            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, COLOR_VALUE, this.result);
            genPushUpdateValue(parse, this.nodeId, 'amount', amount);
        }


        return this.result;
    }



    interpolate(space, col0, col1, f, gamma)
    {
        if (space <= 1) // hex, rgb
        {
            const r0 = Math.pow(col0[0], gamma);  const r1 = Math.pow(col1[0], gamma);
            const g0 = Math.pow(col0[1], gamma);  const g1 = Math.pow(col1[1], gamma);
            const b0 = Math.pow(col0[2], gamma);  const b1 = Math.pow(col1[2], gamma);

            return [
                Math.pow(lerp(r0, r1, f), 1/gamma),
                Math.pow(lerp(g0, g1, f), 1/gamma),
                Math.pow(lerp(b0, b1, f), 1/gamma) ];

            //return rgbAdd(col0, rgbMuls(rgbSub(col1, col0), f));
        }
        else //if (space == 2  // hsv
             // || space == 3) // hsl
        {
            const h0 = col0[0] * Tau;  const h1 = col1[0] * Tau;
            const c0 = col0[1];        const c1 = col1[1];
            const l0 = col0[2];        const l1 = col1[2];

            return [
                normalAngle(h0 + angleDiff(h0, h1) * f) / Tau,
                lerp(c0, c1, f),
                lerp(l0, l1, f) ];
        }
        // else // hcl
        // {
        //     const h0 = col0[0] * Tau;  const h1 = col1[0] * Tau;
        //     const c0 = col0[1];        const c1 = col1[1];
        //     const l0 = col0[1];        const l1 = col1[1];

        //     return [
        //         normalAngle(h0 + angleDiff(h0, h1) * f) / Tau,
        //         lerp(c0, c1, f),
        //         lerp(l0, l1, f) ];
        // }
    }
}

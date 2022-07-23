class GColorInterpolate
extends GOperator
{
    input0 = null;
    input1 = null;

    space;
    amount;


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

        return lerp;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result       = new GColorValue();

            this.result.space = this.space.eval(parse).copy();
            const amount      = this.amount.eval(parse).copy();


            if (   this.input0 
                && this.input1)
            {
                const input0 = this.input0.eval(parse).copy();
                const input1 = this.input1.eval(parse).copy();

                console.log('input0 =', input0);
                console.log('input1 =', input1);

                console.assert(amount.type == NUMBER_VALUE);
                const f = amount.value / 100;
                console.log('this.result =', this.result);
                console.log('this.result.space =', this.result.space);
                const _space = colorSpace(this.result.space.value);
                console.log('_space =', _space);
                
                const col0 = input0.toDataColor();
                const col1 = input1.toDataColor();

                console.log('col0 =', col0);
                console.log('col1 =', col1);

                const col = this.interpolate(
                    this.result.space.value,
                    dataColor2array(convertDataColorToSpace(col0, _space)),
                    dataColor2array(convertDataColorToSpace(col1, _space)),
                    f);

                console.log('col =', col);

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



    interpolate(space, col0, col1, f)
    {
        if (space <= 1) // hex, rgb
        {
            return rgbAdd(col0, rgbMuls(rgbSub(col1, col0), f));
        }
        else // hsv, hsl, hcl
        {
            const h0 = col0[0] * Tau;
            const h1 = col1[0] * Tau;
            
            return [
                normalAngle(h0 + angleDiff(h0, h1) * f) / Tau,
                lerp(col0[1], col1[1], f),
                lerp(col0[2], col1[2], f) ];
        }
    }
}

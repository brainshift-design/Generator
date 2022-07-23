class GColorInterpolate
extends GOperator
{
    input0 = null;
    input1 = null;

    space;
    amount;


    constructor(nodeId, active)
    {
        super(NUMBER_INTERPOLATE, nodeId, active);
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
            this.result       = new GColor(this.nodeId, this.active);

            this.result.space = this.space.eval(parse).copy();
            const amount      = this.amount.eval(parse).copy();


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

                console.log('col0 =', col0);
                console.log('col1 =', col1);
                
                const col = this.interpolate(
                    this.result.space.value,
                    dataColor2array(convertDataColorToSpace(col0, _space)),
                    dataColor2array(convertDataColorToSpace(col1, _space)),
                    f);

                if (this.c1) this.result.c1 = new GNumberValue(col[0]);
                if (this.c2) this.result.c2 = new GNumberValue(col[1]);
                if (this.c3) this.result.c3 = new GNumberValue(col[2]);
            }

            else if (this.input0) this.result = this.input0.eval(parse).copy();
            else if (this.input1) this.result = this.input1.eval(parse).copy();
            

            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'space',  this.result.space);
            genPushUpdateValue(parse, this.nodeId, 'amount', amount           );
        }


        return this.result;
    }



    interpolate(space, col0, col1, f)
    {
        const iSpace = colorSpaceIndex(space);

        if (iSpace <= 1) // hex, rgb
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

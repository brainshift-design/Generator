class GInterpolate
extends GOperator
{
    input0 = null;
    input1 = null;

    amount;


    constructor(nodeId, active)
    {
        super(NUMBER_INTERPOLATE, nodeId, active);
    }


    
    copy()
    {
        const lerp = new GInterpolate(this.nodeId, this.active);

        if (this.input0) lerp.input0 = this.input0.copy();
        if (this.input1) lerp.input1 = this.input1.copy();

        lerp.amount = this.amount.copy();

        return lerp;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            const amount = this.amount.eval(parse).copy();

            if (   this.input0 
                && this.input1)
            {
                const input0 = this.input0.eval(parse).copy();
                const input1 = this.input1.eval(parse).copy();

                const maxDec = Math.max(input0.decimals, input1.decimals);

                this.result = new GNumberValue(
                    floorTo(input0.value + amount.value * (input1.value - input0.value) / 100, maxDec),
                    maxDec);
            }

            else if (this.input0) this.result = this.input0.eval(parse).copy();
            else if (this.input1) this.result = this.input1.eval(parse).copy();
            else                  this.result = new GNumberValue(0);


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'value',  this.result);
            genPushUpdateValue(parse, this.nodeId, 'amount', amount);
        }


        return this.result;
    }
}

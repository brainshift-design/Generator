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


    
    eval(parse)
    {
        if (!this.valid)
        {
            const amount = this.amount.eval(parse);

            if (   this.input0 
                && this.input1)
            {
                const input0 = this.input0.eval(parse);
                const input1 = this.input1.eval(parse);

                const maxDec = Math.max(input0.decimals, input1.decimals);

                this.result = new GNumberValue(
                    floorTo(input0.value + amount.value * (input1.value - input0.value) / 100, maxDec),
                    maxDec);
                
                this.result.valid = true;
            }

            else if (this.input0) this.result = this.input0.eval(parse);
            else if (this.input1) this.result = this.input1.eval(parse);

            else
            {
                this.result       = new GNumberValue(0);
                this.result.valid = true;
            }


            genPushUpdateParamValue(parse, this.nodeId, 'value',  this.result);
            genPushUpdateParamValue(parse, this.nodeId, 'amount', amount);


            this.valid = true;
        }


        return this.result;
    }
}

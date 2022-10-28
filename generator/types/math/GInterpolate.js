class GInterpolate
extends GNumberType
{
    input0 = null;
    input1 = null;

    amount;


    constructor(nodeId, options)
    {
        super(NUMBER_INTERPOLATE, nodeId, options);
    }


    
    eval(parse)
    {
        if (this.valid)
            return;


        this.amount.eval(parse);
        const amount = this.amount.toValue();


        if (   this.input0 
            && this.input1)
        {
            this.input0.eval(parse);
            this.input1.eval(parse);

            const val0 = this.input0.toValue();
            const val1 = this.input1.toValue();

            const maxDec = Math.max(val0.decimals, val1.decimals);

            this.value = new NumberValue(
                floorTo(val0.value + amount.value * (val1.value - val0.value) / 100, maxDec),
                maxDec);
        }
        else if (this.input0)
        {
            this.input0.eval(parse);
            this.value = this.input0.toValue();
        } 
        else if (this.input1) 
        {
            this.input1.eval(parse);
            this.value = this.input1.toValue();
        }
        else                  
            this.value = new NumberValue(0);


        genPushUpdateValue(parse, this.nodeId, 'value',  this.value);
        genPushUpdateValue(parse, this.nodeId, 'amount', amount);


        this.valid = true;
    }
}

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


    
    copy()
    {
        const lerp = new GInterpolate(this.nodeId, this.options);

        lerp.copyBase(this);

        if (this.input0) lerp.input0 = this.input0.copy();
        if (this.input1) lerp.input1 = this.input1.copy();

        lerp.amount = this.amount.copy();

        return lerp;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.amount = this.amount.eval(parse).copy();
        const amount = this.amount.toValue();


        if (   this.input0 
            && this.input1)
        {
            this.input0 = this.input0.eval(parse).copy();
            this.input1 = this.input1.eval(parse).copy();

            const val0 = this.input0.toValue();
            const val1 = this.input1.toValue();

            const maxDec = Math.max(val0.decimals, val1.decimals);

            this.value = new NumberValue(
                floorTo(val0.value + amount.value * (val1.value - val0.value) / 100, maxDec),
                maxDec);
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
            this.value = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'amount', amount);


        this.validate();

        return this;
    }
}

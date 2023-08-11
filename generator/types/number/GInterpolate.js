class GInterpolate
extends GOperator2
{
    amount;


    constructor(nodeId, options)
    {
        super(NUMBER_INTERPOLATE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GInterpolate(this.nodeId, this.options);

        copy.copyBase(this);

        copy.amount = this.amount.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const amount = (await this.amount.eval(parse)).toValue();


        if (   this.input0 
            && this.input1)
        {
            const val0 = (await this.input0.eval(parse)).toValue();
            const val1 = (await this.input1.eval(parse)).toValue();

            const maxDec = Math.max(val0.decimals, val1.decimals);

            this.value = new NumberValue(
                val0.value + amount.value * (val1.value - val0.value) / 100,
                maxDec);
        }
        else if (this.input0)
            this.value = (await this.input0.eval(parse)).toValue();

        else if (this.input1) 
            this.value = (await this.input1.eval(parse)).toValue();

        else                  
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            ['amount', amount    ],
            ['value',  this.value]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.amount && this.amount.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.amount) this.amount.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.amount) this.amount.invalidateInputs(from);
    }
}

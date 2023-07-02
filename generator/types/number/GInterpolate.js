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
        const copy = new GInterpolate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input0) copy.input0 = this.input0.copy();
        if (this.input1) copy.input1 = this.input1.copy();

        copy.amount = this.amount.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.input0 || this.input0.isCached())
            && (!this.input1 || this.input1.isCached());
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
                floorTo(val0.value + amount.value * (val1.value - val0.value) / 100, maxDec),
                maxDec);
        }
        else if (this.input0)
            this.value = (await this.input0.eval(parse)).toValue();

        else if (this.input1) 
            this.value = (await this.input1.eval(parse)).toValue();

        else                  
            this.value = NumberValue.NaN;


        this.updateValues =
        [
            ['amount', amount    ],
            ['value',  this.value]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0) this.input0.pushValueUpdates(parse);
        if (this.input1) this.input1.pushValueUpdates(parse);
        if (this.amount) this.amount.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input0) this.input0.invalidateInputs(from);
        if (this.input1) this.input1.invalidateInputs(from);
        if (this.amount) this.amount.invalidateInputs(from);
    }
}

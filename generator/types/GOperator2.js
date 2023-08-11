class GOperator2
extends GOperator
{
    input0 = null;
    input1 = null;



    copyBase(base)
    {
        super.copyBase(base);

        if (base.input0) this.input0 = base.input0.copy();
        if (base.input1) this.input1 = base.input1.copy();
    }



    isCached()
    {
        return super.isCached()
            && (!this.input0 || this.input0.isCached())
            && (!this.input1 || this.input1.isCached());
    }



    isValid()
    {
        return this.input0 && this.input0.isValid()
            && this.input1 && this.input1.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0) this.input0.pushValueUpdates(parse);
        if (this.input1) this.input1.pushValueUpdates(parse);
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input0) this.input0.invalidateInputs(from);
        if (this.input1) this.input1.invalidateInputs(from);
    }
}
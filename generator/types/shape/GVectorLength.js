class GVectorLength
extends GOperator1
{
    length = null;


    
    constructor(nodeId, options)
    {
        super(VECTOR_LENGTH, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.length = null;
    }



    copy()
    {
        const copy = new GVectorLength(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.length) copy.length = this.length.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = this.input ? (await this.input.eval(parse)).toValue() : null;


        if (input)
            this.length = new NumberValue(lengthv(input.toPoint()), -2);
        else
            this.length = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['length', this.length]
        ]);
        

        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.length && this.length.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.length) this.length.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.length) this.length.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.length) this.length.iterateLoop(parse);
    }
}
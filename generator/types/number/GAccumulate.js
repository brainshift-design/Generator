class GAccumulate
extends GOperator
{
    current;
    when;



    constructor(nodeId, options)
    {
        super(NUMBER_ACCUMULATE, nodeId, options);

        this.current = new NumberValue(0);
    }


    
    copy()
    {
        const copy = new GAccumulate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.when   ) copy.when    = this.when   .copy();
        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const when = (await this.when.eval(parse)).toValue();
            

        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            if (when.value == 0)
                this.value = this.current.copy();

            if (input)
            {
                this.current.value += input.value;
                this.current.decimals = Math.max(this.current.decimals, input.decimals);
            }

            if (when.value > 0)
                this.value = this.current.copy();
        }


        this.setUpdateValues(parse, [['', NullValue]]);
        

        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return super.isValid()
            && this.when && this.when.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.start) this.start.pushValueUpdates(parse);
        if (this.step ) this.step .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.start) this.start.invalidateInputs(parse, from, force);
        if (this.step ) this.step .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.start) this.start.iterateLoop(parse);
        if (this.step ) this.step .iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        this.current = new NumberValue(0);
    }
}

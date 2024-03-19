class GAccumulate
extends GOperator1
{
    current;
    when;



    constructor(nodeId, options)
    {
        super(NUMBER_ACCUMULATE, nodeId, options);

        this.current = new NumberValue(0);
    }


    
    reset()
    {
        super.reset();

        this.current = null;
        this.when    = null;
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
        if (    this.isCached()
            || !parse.evalAccumulate)
            return this;


        const input = await evalNumberValue(this.input, parse);
        const when  = await evalNumberValue(this.when,  parse);
            

        if (   input
            && when)
        {
            if (this.options.enabled)
            {
                if (when.value > 0)
                    this.value = this.current.copy();

                if (input)
                {
                    this.current.value   += input.value;
                    this.current.decimals = Math.max(this.current.decimals, input.decimals);
                }

                if (when.value == 0)
                    this.value = this.current.copy();
            }
            else
                this.value = input.copy();
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse, 
        [
            ['when', when]
        ]);
        

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

        if (this.when) this.when.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.when) this.when.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.when) this.when.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        super.resetLoop(parse, nodeId);

        this.current = new NumberValue(0);
    }
}

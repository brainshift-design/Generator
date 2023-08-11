class GAccumulate
extends GOperator1
{
    current;
    when;

    loopId = NULL;



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

            //const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
            //const iteration = repeat ? repeat.iteration : this.iteration;

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



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.start) this.start.invalidateInputs(from);
        if (this.step ) this.step .invalidateInputs(from);
    }



    invalidateLoop(parse, nodeId)
    {
        super.invalidateLoop(parse, nodeId);

        this.current = new NumberValue(0);
    }
}

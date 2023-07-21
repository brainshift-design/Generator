class GAccumulate
extends GNumberType1
{
    current;

    loopId = NULL;



    constructor(nodeId, options)
    {
        super(NUMBER_ACCUMULATE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAccumulate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.current) copy.current = this.current.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
            

        this.value = new NumberValue(0);


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            //const repeat    = parse.repeats.find(r => r.repeatId == this.loopId);
            //const iteration = repeat ? repeat.iteration : this.iteration;


            if (input)
            {
                this.value.value += input.value;
                this.value.decimals = Math.max(this.value.decimals, input.decimals);
            }
        }


        this.updateValues = [['', NullValue]];
        

        this.validate();

        return this;
    }



    toValue()
    {
        return this.value
             ? this.value.copy()
             : null;
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
}

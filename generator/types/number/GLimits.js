class GLimits
extends GOperator1
{
    min = null;
    max = null;


    
    constructor(nodeId, options)
    {
        super(NUMBER_LIMITS, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.min = null;
        this.max = null;
    }



    copy()
    {
        const copy = new GLimits(this.nodeId, this.options);

        copy.copyBase(this);

        copy.min = this.min.copy();
        copy.max = this.max.copy();

        return copy;
    }



    isCached()
    {
        return super.isCached()
            && (!this.min || this.min.isCached())
            && (!this.max || this.max.isCached());
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const min = (await this.min.eval(parse)).toValue();
        const max = (await this.max.eval(parse)).toValue();


        if (this.input)
        {
            this.value = (await this.input.eval(parse)).toValue();

            consoleAssert(
                this.value.type == NUMBER_VALUE, 
                'this.value.type must be NUMBER_VALUE');


            if (this.options.enabled)
            {
                this.value.value = Math.min(Math.max(
                    min.value,
                    this.value.value),
                    max.value);
            }
        }
        else
            this.value = NumberValue.NaN;


        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['min',   min       ],
            ['max',   max       ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.min && this.min.isValid()
            && this.max && this.max.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
        if (this.min  ) this.min  .pushValueUpdates(parse);
        if (this.max  ) this.max  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input) this.input.invalidateInputs(parse, from, force);
        if (this.min  ) this.min  .invalidateInputs(parse, from, force);
        if (this.max  ) this.max  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
        if (this.min  ) this.min  .iterateLoop(parse);
        if (this.max  ) this.max  .iterateLoop(parse);
    }
}

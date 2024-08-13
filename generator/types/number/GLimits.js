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

        if (this.min) copy.min = this.min.copy();
        if (this.max) copy.max = this.max.copy();

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

            
        const input = await evalNumberOrListValue(this.input, parse);
        const min   = await evalNumberValue      (this.min,   parse);
        const max   = await evalNumberValue      (this.max,   parse);


        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? getLimitsValue(item, min, max, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
                this.value = getLimitsValue(input, min, max, this.options.enabled);
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()],
            ['min',  min              ],
            ['max',  max              ]
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



function getLimitsValue(input, min, max, enabled)
{
    consoleAssert(
         input.type == NUMBER_VALUE, 
        'input.type must be NUMBER_VALUE');

    if (!enabled)
        return input;

    return new NumberValue(
        Math.min(Math.max(
            min.value,
            input.value),
            max.value),
        input.decimals);
}
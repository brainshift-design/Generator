class GRound
extends GOperator1
{
    type;
    decimals;



    constructor(nodeId, options)
    {
        super(NUMBER_ROUND, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.type     = null;
        this.decimals = null;
    }



    copy()
    {
        const copy = new GRound(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.type    ) copy.type     = this.type    .copy();
        if (this.decimals) copy.decimals = this.decimals.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input = await evalNumberValue(this.input,    parse);
        const type  = await evalNumberValue(this.type,     parse);
        const dec   = await evalNumberValue(this.decimals, parse);


        if (   input
            && type
            && dec)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == NUMBER_VALUE
                        ? getRoundValue(item, type, dec, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
                this.value = getRoundValue(input, type, dec, this.options.enabled);
}
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['_type',    this.outputType()],
            ['type',     type             ],
            ['decimals', dec              ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.type     && this.type    .isValid()
            && this.decimals && this.decimals.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.type    ) this.type    .pushValueUpdates(parse);
        if (this.decimals) this.decimals.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.type    ) this.type    .invalidateInputs(parse, from, force);
        if (this.decimals) this.decimals.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.type    ) this.type    .iterateLoop(parse);
        if (this.decimals) this.decimals.iterateLoop(parse);
    }
}



function getRoundValue(input, type, dec, enabled)
{
    consoleAssert(
        input.type == NUMBER_VALUE, 
       'input.type must be NUMBER_VALUE');


    if (!enabled)
        return input;

    switch (type.value)
    {
        case 0: return new NumberValue(floorTo(input.value, dec.value), dec.value);
        case 1: return new NumberValue(roundTo(input.value, dec.value), dec.value);
        case 2: return new NumberValue( ceilTo(input.value, dec.value), dec.value);
    }
}
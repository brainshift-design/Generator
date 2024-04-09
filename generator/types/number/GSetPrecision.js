class GSetPrecision
extends GOperator1
{
    decimals;



    constructor(nodeId, options)
    {
        super(NUMBER_PRECISION, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.decimals = null;
    }



    copy()
    {
        const copy = new GSetPrecision(this.nodeId, this.options);

        copy.copyBase(this);

        copy.decimals = this.decimals.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        this.value = new NumberValue(0);

        
        const input    = await evalNumberValue(this.input,    parse);
        const decimals = await evalNumberValue(this.decimals, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                    {
                        const item = input.items[i];

                        this.value.items.push(
                            item.type == NUMBER_VALUE
                            ? getSetPrecisionValue(item, decimals)
                            : NumberValue.NaN.copy());   
                    }
                }
                else
                    this.value = getSetPrecisionValue(input, decimals);
            }
            else
                this.value = input;
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',     this.outputType()],
            ['value',    this.value       ],
            ['decimals', decimals         ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.decimals && this.decimals.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.decimals) this.decimals.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.decimals) this.decimals.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.decimals) this.decimals.iterateLoop(parse);
    }
}



function getSetPrecisionValue(input, decimals)
{
    consoleAssert(
         input == NUMBER_VALUE, 
        'input must be NUMBER_VALUE');

    return new NumberValue(input.value, decimals.value);
}
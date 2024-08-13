class GAbsolute
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(NUMBER_ABSOLUTE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAbsolute(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberOrListValue(this.input, parse);


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
                        ? getAbsoluteValue(item, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
                this.value = getAbsoluteValue(input, this.options.enabled);
        }
        else
            this.value = NumberValue.NaN.copy();


        this.setUpdateValues(parse, 
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }
}



function getAbsoluteValue(input, enabled)
{
    consoleAssert(
         input.type == NUMBER_VALUE, 
        'input.type must be NUMBER_VALUE');

    return enabled
        ? new NumberValue(Math.abs(input.value), input.decimals)
        : input;
}
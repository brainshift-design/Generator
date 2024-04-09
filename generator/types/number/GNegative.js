class GNegative
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(NUMBER_NEGATIVE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNegative(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberValue(this.input, parse);

            
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
                        ? getNegativeValue(item, this.options.enabled)
                        : NumberValue.NaN.copy());   
                }
            }
            else
                this.value = getNegativeValue(input, this.options.enabled);
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



function getNegativeValue(input, enabled)
{
    consoleAssert(
         input == NUMBER_VALUE, 
        'input must be NUMBER_VALUE');

    return new NumberValue(
        (enabled ? -1 : 1) * input.value,
        input.decimals);
}
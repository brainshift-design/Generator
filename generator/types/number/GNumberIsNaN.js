class GNumberIsNaN
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(NUMBER_IS_NAN, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNumberIsNaN(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalNumberOrListValue(this. input, parse);


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
                        ? getNumberIsNaN(item)
                        : TextValue.NaN());   
                }
            }
            else
            {
                this.value = getNumberIsNaN(input);
            }
        }

        else
            this.value = BooleanValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }
}



function getNumberIsNaN(input)
{
    return !input.isValid()
        ? new BooleanValue(true )
        : new BooleanValue(false);
}
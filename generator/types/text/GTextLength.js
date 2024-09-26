class GTextLength
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(TEXT_LENGTH, nodeId, options);
    }


    
    reset()
    {
        super.reset();
    }



    copy()
    {
        const copy = new GTextLength(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input = await evalTextOrListValue(this.input, parse);

        if (   input
            && input.isValid())
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? new NumberValue(item.value.length)
                        : NumberValue.NaN());
                }
            }
            else
                this.value = new NumberValue(input.value.length);
        }
        else
            this.value = NumberValue.NaN();
    

        this.setUpdateValues(parse,
        [
            ['type', this.outputType()]
        ]);


        this.validate();

        return this;
    }
}

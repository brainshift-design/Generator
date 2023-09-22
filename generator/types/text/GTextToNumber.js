class GTextToNumber
extends GOperator1
{
    format;


    
    constructor(nodeId, options)
    {
        super(TEXT_TO_NUMBER, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextToNumber(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.format) copy.format = this.format.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const format = (await this.format.eval(parse)).toValue();


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();


            if (isListType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getTextToNumberValue(item, format)
                        : NumberValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getTextToNumberValue(input, format);
            }
        }

        else
            this.value = NumberValue.NaN;


        const type = 
            this.value
            ? new TextValue(
                isListType(this.value.type)
                ? finalListTypeFromItems(this.value.items)
                : this.value.type)
            : TextValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',   type  ],
            ['format', format]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.format && this.format.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.format) this.format.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.format) this.format.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.format) this.format.iterateLoop(parse);
    }
}



function getTextToNumberValue(input, format)
{
    let num = Number.NaN;

    switch (format.value)
    {
        case 0: // dec
            num = parseFloat(input.value);
            break;

        case 1: // hex
            num = parseInt(input.value, 16);
            break;
    }

    return new NumberValue(num, decDigits(num));
}
class GNumberToText
extends GOperator1
{
    format;


    
    constructor(nodeId, options)
    {
        super(NUMBER_TO_TEXT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GNumberToText(this.nodeId, this.options);

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
                        item.type == NUMBER_VALUE
                        ? getNumberToTextValue(item, format)
                        : TextValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getNumberToTextValue(input, format);
            }
        }

        else
            this.value = TextValue.NaN;


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['format', format           ]
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



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.format) this.format.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.format) this.format.iterateLoop(parse);
    }
}



function getNumberToTextValue(input, format)
{
    let str = NAN_CHAR;

    switch (format.value)
    {
        case 0: // dec
            str = numToString(input.value, -input.decimals);
            break;

        case 1: // hex
            str = numToString(Math.round(input.value), input.decimals, true).toUpperCase();
            break;
    }

    return new TextValue(str);
}
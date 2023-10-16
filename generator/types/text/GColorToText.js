class GColorToText
extends GOperator1
{
    format;


    
    constructor(nodeId, options)
    {
        super(COLOR_TO_TEXT, nodeId, options);
    }


    
    copy()
    {
        const copy = new GColorToText(this.nodeId, this.options);

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
                        ? getColorToTextValue(item, format)
                        : TextValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getColorToTextValue(input, format);
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



function getColorToTextValue(input, format)
{
    let str = NAN_CHAR;

    const rgb = input.toRgb();

    switch (format.value)
    {
        case 0: // hex
            str = rgb2hex(rgb);
            break;

        case 1: // rgb 1.0
            str = 
                  numToString(rgb[0], -3) + ', '
                + numToString(rgb[1], -3) + ', '
                + numToString(rgb[2], -3);
            break;

        case 2: // rgb 255
            str = 
                  Math.round(rgb[0] * 255) + ', '
                + Math.round(rgb[1] * 255) + ', '
                + Math.round(rgb[2] * 255);
            break;
    }

    return new TextValue(str);
}
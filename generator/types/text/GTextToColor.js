class GTextToColor
extends GOperator1
{
    constructor(nodeId, options)
    {
        super(TEXT_TO_COLOR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GTextToColor(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


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
                        ? getTextToColorValue(item)
                        : NumberValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getTextToColorValue(input);
            }
        }
        else
            this.value = ColorValue.NaN;


        const type = 
            this.value
            ? new TextValue(
                isListType(this.value.type)
                ? finalListTypeFromItems(this.value.items)
                : this.value.type)
            : TextValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['value', this.value],
            ['type',  type      ]
        ]);


        this.validate();

        return this;
    }
}



function getTextToColorValue(input)
{
    let rgb = 
        input.value.trim() != ''
        ? validHex2rgb(input.value)
        : rgb_NaN;
        
    return ColorValue.fromRgb(scaleRgb(rgb));
}
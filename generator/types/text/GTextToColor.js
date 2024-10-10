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
            const input = await evalTextValue(this.input, parse);

            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getTextToColorValue(item.value.trim())
                        : NumberValue.NaN());   
                }
            }
            else
            {
                this.value = getTextToColorValue(input.value.trim());
            }
        }
        else
            this.value = ColorValue.NaN();


        this.setUpdateValues(parse,
        [
            ['value', this.value       ],
            ['type',  this.outputType()]
        ]);


        this.validate();

        return this;
    }
}



function getTextToColorValue(str)
{
    let rgb; 


    if (settings.preferHtmlColorNames)
    {
                   let webColor = htmlColors.find(wc => wc.name.toLowerCase() == str);
        if (!webColor) webColor = htmlColors.find(wc => getEditDistance(wc.name.toLowerCase(), str) <= 1);
        
        if (webColor) 
            rgb = webColor.color;
    }
    else
    {
        const hsl = parseStructuredColorName(str);

        rgb = 
            hsl 
            ? hsl2rgb(hsl) 
            : validHex2rgb(str);
    }

    
    return rgb
         ? ColorValue.fromRgb(scaleRgb(rgb))
         : ColorValue.NaN();
}
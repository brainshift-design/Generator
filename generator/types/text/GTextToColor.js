class GTextToColor
extends GOperator1
{
    format;



    constructor(nodeId, options)
    {
        super(TEXT_TO_COLOR, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.format = null;
    }



   
    copy()
    {
        const copy = new GTextToColor(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.format) copy.format = this.format.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalTextValue  (this.input, parse);
        const format = await evalNumberValue(this.format, parse);

        
        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                        item.type == TEXT_VALUE
                        ? getTextToColorValue(item.value.trim(), format)
                        : NumberValue.NaN());   
                }
            }
            else
            {
                this.value = getTextToColorValue(input.value.trim(), format);
            }
        }

        else
            this.value = ColorValue.NaN();


        this.setUpdateValues(parse,
        [
            ['value', this.value       ],
            ['type',  this.outputType()],
            ['format', format          ],
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



function getTextToColorValue(str, format)
{
    let rgb; 


    switch (format.value)
    {
        case 0: // Hex
        {
            rgb = validHex2rgb(str);
            break;
        }
        case 1: // RGB 0-1
        {
            const parts = str.split(',').map(s => s.trim());
        
            rgb = 
            [
                parseFloat(parts[0]),
                parseFloat(parts[1]),
                parseFloat(parts[2])
            ];

            break;
        }
        case 2: // RGB 0-255
        {
            const parts = str.split(',').map(s => s.trim());
        
            rgb = 
            [
                parseFloat(parts[0]) / 0xff,
                parseFloat(parts[1]) / 0xff,
                parseFloat(parts[2]) / 0xff
            ];

            break;
        }
        case 3: // HTML name
        {
                       let webColor = htmlColors.find(wc => wc.name.toLowerCase() == str);
            if (!webColor) webColor = htmlColors.find(wc => getEditDistance(wc.name.toLowerCase(), str) <= 1);
            
            if (webColor)
                rgb = webColor.color;

            break;
        }
        case 4: // structured name
        {
            const hsl = parseStructuredColorName(str);

            if (hsl)
                rgb = hsl2rgb(hsl);

            break;
        }
    }

    
    return rgb
         ? ColorValue.fromRgb(scaleRgb(rgb))
         : ColorValue.NaN();
}
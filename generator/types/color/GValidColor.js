class GValidColor
extends GOperator1
{
    quality      = null;

    corrections  = [];



    constructor(nodeId, options)
    {
        super(VALID_COLOR, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.quality     = null;
        this.corrections = [];
    }



    copy()
    {
        const copy = new GValidColor(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value  ) copy.value   = this.value  .copy();
        if (this.quality) copy.quality = this.quality.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const quality = this.quality ? (await this.quality.eval(parse)).toValue().toInteger() : null;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                        this.value.items.push(await getValidColorValue(parse, this, input.items[i], quality));
                }
                else
                    this.value = await getValidColorValue(parse, this, input, quality);
            }
            else
                this.value = input.copy();
        }
        else
            this.value = ColorValue.NaN.copy();


        
        this.setUpdateValues(parse,
        [
            ['value',   this.value       ],
            ['type',    this.outputType()],
            ['quality', quality          ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.quality && this.quality.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.quality) this.quality.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.quality) this.quality.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.quality) this.quality.iterateLoop(parse);
    }
}



async function getValidColorValue(parse, node, input, quality)
{
    let rgb = input.toRgb();

    if (quality.value == 0) // clip sRGB
    {
        rgb[0] = Math.round(Math.min(Math.max(0, rgb[0]), 1) * 0xff);   
        rgb[1] = Math.round(Math.min(Math.max(0, rgb[1]), 1) * 0xff);   
        rgb[2] = Math.round(Math.min(Math.max(0, rgb[2]), 1) * 0xff); 
        
        return ColorValue.fromRgb(rgb);
    }
    else if (quality.value == 1) // clip chroma
    {
        rgb = clipChroma(rgb);

        rgb[0] = Math.round(rgb[0] * 0xff);
        rgb[1] = Math.round(rgb[1] * 0xff);
        rgb[2] = Math.round(rgb[2] * 0xff);

        return ColorValue.fromRgb(rgb);
    }
    else // find corrections
    {
        if (!rgbIsOk(rgb))
            genInitNodeProgress(node.nodeId);
        

        const inputColor = input.toDataColor();


        const
      [ closestOrder,
        closest1,
        closest2,
        closest3 ] = await findCorrection(
            parse,
            node.nodeId,
            inputColor,
            quality, null,  null,  null,
            false,   false, false, false);

            
        if (!parse.stopGenerate)
        {
            if (   closestOrder >= 0
                && closestOrder <  6)
            {
                node._color = correctColor(
                    inputColor,
                    closestOrder,
                    closest1,
                    closest2,
                    closest3);

                return ColorValue.fromDataColor(node._color);
            }
            else
            {
                return ColorValue.NaN.copy();
            }
        }
    }    


    return ColorValue.NaN.copy();
}
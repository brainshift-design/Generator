class GValidColor
extends GOperator1
{
    method       = null;

    corrections  = [];



    constructor(nodeId, options)
    {
        super(VALID_COLOR, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.method      = null;
        this.corrections = [];
    }



    copy()
    {
        const copy = new GValidColor(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value ) copy.value  = this.value .copy();
        if (this.method) copy.method = this.method.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalColorValue (this.input,   parse);
        const method = await evalNumberValue(this.method, parse);


        if (input)
        {
            if (this.options.enabled)
            {
                if (isListValueType(input.type))
                {
                    this.value = new ListValue();

                    for (let i = 0; i < input.items.length; i++)
                        this.value.items.push(await getValidColorValue(parse, this, input.items[i], method));
                }
                else
                    this.value = await getValidColorValue(parse, this, input, method);
            }
            else
                this.value = input.copy();
        }
        else
            this.value = ColorValue.NaN.copy();


        
        this.setUpdateValues(parse,
        [
            ['value',  this.value       ],
            ['type',   this.outputType()],
            ['method', method           ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.method && this.method.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.method) this.method.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.method) this.method.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.method) this.method.iterateLoop(parse);
    }
}



async function getValidColorValue(parse, node, input, method)
{
    let rgb = input.toRgb();

    if (method.value == 0) // clip sRGB
    {
        rgb[0] = Math.round(Math.min(Math.max(0, rgb[0]), 1) * 0xff);   
        rgb[1] = Math.round(Math.min(Math.max(0, rgb[1]), 1) * 0xff);   
        rgb[2] = Math.round(Math.min(Math.max(0, rgb[2]), 1) * 0xff); 
        
        return ColorValue.fromRgb(rgb);
    }
    else if (method.value == 1) // clip chroma
    {
        rgb = clipChroma(rgb);

        rgb[0] = Math.round(rgb[0] * 0xff);
        rgb[1] = Math.round(rgb[1] * 0xff);
        rgb[2] = Math.round(rgb[2] * 0xff);

        return ColorValue.fromRgb(rgb);
    }
    else // find corrections
    {
        const inputColor = input.toDataColor();

        if (!dataColorIsOk(inputColor))
            genInitNodeProgress(this.nodeId);


        const
      [ closestOrder,
        closest1,
        closest2,
        closest3 ] = await findCorrection(
            parse,
            node.nodeId,
            inputColor,
            null,   null,  null,  null,
            false,  false, false, false);

            
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
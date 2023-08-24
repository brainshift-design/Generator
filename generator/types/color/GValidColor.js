class GValidColor
extends GOperator1
{
    quality      = null;

    corrections  = [];



    constructor(nodeId, options)
    {
        super(VALID_COLOR, nodeId, options);
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
                // if (   !isValid(this.value) 
                //     || !this.value.isValid()) 
                // {
                    let rgb = input.toRgb();

                    if (quality.value == 0) // clip sRGB
                    {
                        rgb[0] = Math.round(Math.min(Math.max(0, rgb[0]), 1) * 0xff);   
                        rgb[1] = Math.round(Math.min(Math.max(0, rgb[1]), 1) * 0xff);   
                        rgb[2] = Math.round(Math.min(Math.max(0, rgb[2]), 1) * 0xff); 
                        
                        this.value = ColorValue.fromRgb(rgb);
                    }
                    else if (quality.value == 1) // clip chroma
                    {
                        rgb = clipChroma(rgb);

                        rgb[0] = Math.round(rgb[0] * 0xff);   
                        rgb[1] = Math.round(rgb[1] * 0xff);   
                        rgb[2] = Math.round(rgb[2] * 0xff); 

                        this.value = ColorValue.fromRgb(rgb);
                    }
                    else // find corrections
                    {
                        if (!rgbIsOk(rgb))
                            genInitNodeProgress(this.nodeId);
                        

                        const inputColor = input.toDataColor();


                        const
                      [ closestOrder,
                        closest1,
                        closest2,
                        closest3 ] = await findCorrection(
                            parse,
                            this.nodeId,
                            inputColor, 
                            quality, null,  null,  null, 
                            false,   false, false, false); 

                            
                        if (!parse.stopGenerate)
                        {
                            if (   closestOrder >= 0 
                                && closestOrder <  6)
                            {
                                this._color = correctColor(
                                    inputColor,
                                    closestOrder,
                                    closest1,
                                    closest2,
                                    closest3);

                                this.value = ColorValue.fromDataColor(this._color);
                            }
                            else
                            {
                                this.value = ColorValue.NaN;
                            }
                        }
                    }
                //}
            }
            else
                this.value = input;
        }
        else
            this.value = ColorValue.NaN;


        
        this.setUpdateValues(parse,
        [
            ['value',   this.value],
            ['quality', quality   ]
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.quality) this.quality.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.quality) this.quality.iterateLoop(parse);
    }
}

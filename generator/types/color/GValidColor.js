class GValidColor
extends GColorType
{
    input        = null;
     
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

        if (this.input) 
            copy.input = this.input.copy();

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
                if (   !isValid(this.value) 
                    || !this.value.isValid()) 
                {
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
                        closest3 ] = findCorrection(
                            this.nodeId,
                            inputColor, 
                            quality, null,  null,  null, 
                            false,   false, false, false); 

                            
                        //if (!stopGenerate)
                        //{
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
                        //}
                    }
                }
            }
            else
                this.value = input;
        }
        else
            this.value = ColorValue.NaN;

            
        genPushUpdateValue(parse, this.nodeId, 'quality', quality);
        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);


        this.validate();

        return this;
    }
}

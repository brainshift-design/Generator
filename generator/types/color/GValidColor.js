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
                        let hcl = rgb2hclok(rgb);

                        let loopProtect = 10000;

                        while (  !rgbIsValid(hclok2rgb(hcl))
                            && hcl[1] > 0.001
                            && loopProtect-- > 0)
                            hcl[1] -= 0.001;

                        rgb = hclok2rgb(hcl);

                        rgb[0] = Math.round(Math.min(Math.max(0, rgb[0]), 1) * 0xff);   
                        rgb[1] = Math.round(Math.min(Math.max(0, rgb[1]), 1) * 0xff);   
                        rgb[2] = Math.round(Math.min(Math.max(0, rgb[2]), 1) * 0xff); 

                        this.value = ColorValue.fromRgb(rgb);
                    }
                    else // find corrections
                    {
                        if (!rgbIsOk(rgb))
                        {
                            genQueueMessageToUi(
                            {
                                cmd:   'uiInitNodeProgress',
                                nodeId: this.nodeId
                            });
                        }
                        

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

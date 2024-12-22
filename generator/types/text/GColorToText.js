class GColorToText
extends GOperator1
{
    static { GNode.types[COLOR_TO_TEXT] = this; }



    format;
    normalize;
    trimZeros;


    
    constructor(nodeId, options)
    {
        super(COLOR_TO_TEXT, nodeId, options);
    }


    reset()
    {
        super.reset();

        this.format    = null;
        this.normalize = null;
        this.trimZeros = null;
    }



   
    copy()
    {
        const copy = new GColorToText(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.format   ) copy.format    = this.format   .copy();
        if (this.normalize) copy.normalize = this.normalize.copy();
        if (this.trimZeros) copy.trimZeros = this.trimZeros.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input     = await evalValue      (this.input,     parse);
        const format    = await evalNumberValue(this.format,    parse);
        const normalize = await evalNumberValue(this.normalize, parse);
        const trimZeros = await evalNumberValue(this.trimZeros, parse);


        if (input)
        {
            if (isListValueType(input.type))
            {
                this.value = new ListValue();

                for (let i = 0; i < input.items.length; i++)
                {
                    const item = input.items[i];

                    this.value.items.push(
                           item.type == COLOR_VALUE
                        || item.type ==  FILL_VALUE
                        ? getColorToTextValue(item, format, normalize, trimZeros)
                        : TextValue.NaN());   
                }
            }
            else
            {
                this.value = getColorToTextValue(input, format, normalize, trimZeros);
            }
        }

        else
            this.value = TextValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['format',    format           ],
            ['normalize', normalize        ],
            ['trimZeros', trimZeros        ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.format    && this.format   .isValid()
            && this.normalize && this.normalize.isValid()
            && this.trimZeros && this.trimZeros.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.format   ) this.format   .pushValueUpdates(parse);
        if (this.normalize) this.normalize.pushValueUpdates(parse);
        if (this.trimZeros) this.trimZeros.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.format   ) this.format   .invalidateInputs(parse, from, force);
        if (this.normalize) this.normalize.invalidateInputs(parse, from, force);
        if (this.trimZeros) this.trimZeros.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.format   ) this.format   .iterateLoop(parse);
        if (this.normalize) this.normalize.iterateLoop(parse);
        if (this.trimZeros) this.trimZeros.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const col2text = new GColorToText(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(col2text, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, col2text);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            col2text.input = genParse(parse);
    
        col2text.format    = genParse(parse);
        col2text.normalize = genParse(parse);
        col2text.trimZeros = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, col2text);
        return col2text;
    }
}



function getColorToTextValue(input, format, normalize, trimZeros)
{
    if (   input.type != COLOR_VALUE
        && input.type != FILL_VALUE)
        return new TextValue();


    let str = NAN_CHAR;


    const fill = 
        input.type == COLOR_VALUE
        ? new FillValue(input)
        : input;

    const rgba = fill.toRgba();

    let dec1 = fill.color.c1.decimals;
    let dec2 = fill.color.c2.decimals;
    let dec3 = fill.color.c3.decimals;
    let dec4 = fill.opacity .decimals;

    
    switch (format.value)
    {
        case 0: // hex
            str = rgb2hex(rgba);

            if (input.type == FILL_VALUE)
                str += chan2hex(rgba[3]);

            break;

        case 1: // rgb
        {
            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(rgba[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(rgba[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(rgba[2], Math.max(dec3, 3), trimZeros.value > 0);
    
                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], Math.max(dec4, 3), trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(rgba[0] * rgbFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(rgba[1] * rgbFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(rgba[2] * rgbFactor[2], dec3, trimZeros.value > 0);
    
                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 255, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 2: // hsl
        {
            const hsl = rgb2hsl(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(hsl[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsl[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsl[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(hsl[0] * hs_Factor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsl[1] * hs_Factor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsl[2] * hs_Factor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 3: // hsb
        {
            const hsv = rgb2hsv(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(hsv[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(hsv[0] * hs_Factor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[1] * hs_Factor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[2] * hs_Factor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 4: // hcl/ok
        {
            const hcl = rgb2hclok(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(hcl[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(hcl[0] * hclFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[1] * hclFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[2] * hclFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 5: // hcl/ab
        {
            const hcl = rgb2hclab(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(hcl[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(hcl[0] * hclFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[1] * hclFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[2] * hclFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 6: // hcl/uv
        {
            const hcl = rgb2hcluv(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(hcl[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(hcl[0] * hclFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[1] * hclFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hcl[2] * hclFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 7: // oklab
        {
            const hsv = rgb2oklab(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(hsv[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(hsv[0] * oppFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[1] * oppFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[2] * oppFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 8: // lab
        {
            const hsv = rgb2lab(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(hsv[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(hsv[0] * oppFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[1] * oppFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[2] * oppFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 9: // luv
        {
            const hsv = rgb2luv(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(hsv[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(hsv[0] * oppFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[1] * oppFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(hsv[2] * oppFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 10: // xyz
        {
            const xyz = rgb2xyz(rgba);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(xyz[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(xyz[0] * xyzFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[1] * xyzFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[2] * xyzFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 11: // xyz d50
        {
            const xyz = rgb2xyz(rgba, sRGB_D50);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(xyz[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(xyz[0] * xyzFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[1] * xyzFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[2] * xyzFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 12: // xyz d65
        {
            const xyz = rgb2xyz(rgba, sRGB_D65);

            if (normalize.value > 0)
            {
                str = 
                            getColorValueToText(xyz[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[1], Math.max(dec2, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[2], Math.max(dec3, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3], dec4, trimZeros.value > 0);
            }
            else
            {
                str = 
                            getColorValueToText(xyz[0] * xyzFactor[0], dec1, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[1] * xyzFactor[1], dec2, trimZeros.value > 0) 
                    + ' ' + getColorValueToText(xyz[2] * xyzFactor[2], dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0);
            }

            break;
        }
        case 13: // HTML name
            str = createColorName(rgba);
            break;
    }

    return new TextValue(str);
}



function getColorValueToText(val, dec, trimZeros)
{
    return numToString(val, (trimZeros ? -1 : 1) * dec);
}
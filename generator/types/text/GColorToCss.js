class GColorToCss
extends GOperator1
{
    static { GNode.types[COLOR_TO_CSS] = this; }



    format;
    percent;
    trimZeros;


    
    constructor(nodeId, options)
    {
        super(COLOR_TO_CSS, nodeId, options);
    }


    reset()
    {
        super.reset();

        this.format    = null;
        this.percent   = null;
        this.trimZeros = null;
    }



   
    copy()
    {
        const copy = new GColorToCss(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.format   ) copy.format    = this.format   .copy();
        if (this.percent  ) copy.percent   = this.percent  .copy();
        if (this.trimZeros) copy.trimZeros = this.trimZeros.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input     = await evalValue      (this.input,     parse);
        const format    = await evalNumberValue(this.format,    parse);
        const percent   = await evalNumberValue(this.percent,   parse);
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
                        ? getColorToCssValue(item, format, percent, trimZeros)
                        : TextValue.NaN());   
                }
            }
            else
            {
                this.value = getColorToCssValue(input, format, percent, trimZeros);
            }
        }

        else
            this.value = TextValue.NaN();


        this.setUpdateValues(parse,
        [
            ['type',      this.outputType()],
            ['format',    format           ],
            ['percent',   percent          ],
            ['trimZeros', trimZeros        ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.format    && this.format   .isValid()
            && this.percent   && this.percent  .isValid()
            && this.trimZeros && this.trimZeros.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.format   ) this.format   .pushValueUpdates(parse);
        if (this.percent  ) this.percent  .pushValueUpdates(parse);
        if (this.trimZeros) this.trimZeros.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.format   ) this.format   .invalidateInputs(parse, from, force);
        if (this.percent  ) this.percent  .invalidateInputs(parse, from, force);
        if (this.trimZeros) this.trimZeros.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.format   ) this.format   .iterateLoop(parse);
        if (this.percent  ) this.percent  .iterateLoop(parse);
        if (this.trimZeros) this.trimZeros.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const col2css = new GColorToCss(nodeId, options);
       
    
        let nInputs = -1;
        
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(col2css, parse, ignore, nInputs);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, col2css);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            col2css.input = genParse(parse);
    
        col2css.format    = genParse(parse);
        col2css.percent   = genParse(parse);
        col2css.trimZeros = genParse(parse);
    
        
        parse.nTab--;
    
    
        genParseNodeEnd(parse, col2css);
        return col2css;
    }
}



function getColorToCssValue(input, format, percent, trimZeros)
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
        case 0: // # hex
            str = rgb2hex(rgba, true);

            if (input.type == FILL_VALUE)
                str += chan2hex(rgba[3]);

            break;

        case 1: // rgb()
            if (percent.value > 0)
            {
                str = 
                    'rgb('
                          + getColorValueToText(rgba[0] * 100, dec1, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(rgba[1] * 100, dec2, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(rgba[2] * 100, dec3, trimZeros.value > 0) + '%';

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0) + '%';
    
                str += ')';
            }
            else
            {
                str = 
                    'rgb('
                          + getColorValueToText(rgba[0] * 255, dec1, trimZeros.value > 0)
                    + ' ' + getColorValueToText(rgba[1] * 255, dec2, trimZeros.value > 0)
                    + ' ' + getColorValueToText(rgba[2] * 255, dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], Math.max(dec4, 3), trimZeros.value > 0);
    
                str += ')';
            }

            break;

        case 2: // hsl()
            const hsl = rgb2hsl(rgba);

            if (percent.value > 0)
            {
                str = 
                    'hsl('
                    +       getColorValueToText(hsl[0] * 360, dec1, trimZeros.value > 0) + 'deg'
                    + ' ' + getColorValueToText(hsl[1] * 100, dec2, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(hsl[2] * 100, dec3, trimZeros.value > 0) + '%';

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0) + '%';
    
                str += ')';
            }
            else
            {
                str = 
                    'hsl('
                    +       getColorValueToText(hsl[0] * 360, dec1, trimZeros.value > 0)
                    + ' ' + getColorValueToText(hsl[1] * 100, dec2, trimZeros.value > 0)
                    + ' ' + getColorValueToText(hsl[2] * 100, dec3, trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], Math.max(dec4, 3), trimZeros.value > 0);
    
                str += ')';
            }

            break;

        case 3: // oklch()
            const hcl = rgb2hclok(rgba);

            if (percent.value > 0)
            {
                str = 
                    'oklch('
                    +       getColorValueToText(hcl[2]       * 100, dec1, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(hcl[1] / 0.4 * 100, dec2, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(hcl[0]       * 360, dec3, trimZeros.value > 0) + 'deg';

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0) + '%';

                str += ')';
            }
            else
            {
                str = 
                    'oklch('
                    +       getColorValueToText(hcl[2],       Math.max(dec1, 3), trimZeros.value > 0)
                    + ' ' + getColorValueToText(hcl[1],       Math.max(dec2, 3), trimZeros.value > 0)
                    + ' ' + getColorValueToText(hcl[0] * 360,          dec3,     trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], Math.max(dec4, 3), trimZeros.value > 0);

                str += ')';
            }

            break;

        case 4: // lch()
        {
            const hcl = rgb2hclab(rgba);

            if (percent.value > 0)
            {
                str = 
                    'lch('
                    +       getColorValueToText(hcl[2]       * 100, dec1, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(hcl[1] / 0.4 * 100, dec2, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(hcl[0]       * 360, dec3, trimZeros.value > 0) + 'deg';

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0) + '%';

                str += ')';
            }
            else
            {
                str = 
                    'lch('
                    +       getColorValueToText(hcl[2],       Math.max(dec1, 3), trimZeros.value > 0)
                    + ' ' + getColorValueToText(hcl[1],       Math.max(dec2, 3), trimZeros.value > 0)
                    + ' ' + getColorValueToText(hcl[0] * 360,          dec3,     trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], Math.max(dec4, 3), trimZeros.value > 0);

                str += ')';
            }

            break;
        }
        case 5: // oklab()
        {
            const lab = rgb2oklab(rgba);

            if (percent.value > 0)
            {
                str = 
                    'oklab('
                    +       getColorValueToText(lab[0]       * 100, dec1, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(lab[1] / 0.4 * 100, dec2, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(lab[2] / 0.4 * 100, dec3, trimZeros.value > 0) + '%';

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0) + '%';

                str += ')';
            }
            else
            {
                str = 
                    'oklab('
                    +       getColorValueToText(lab[0], Math.max(dec1, 3), trimZeros.value > 0)
                    + ' ' + getColorValueToText(lab[2], Math.max(dec3, 3), trimZeros.value > 0)
                    + ' ' + getColorValueToText(lab[1], Math.max(dec2, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], Math.max(dec4, 3), trimZeros.value > 0);

                str += ')';
            }

            break;
        }
        case 6: // lab()
        {
            const lab = rgb2lab(rgba);

            if (percent.value > 0)
            {
                str = 
                    'lab('
                    +       getColorValueToText(lab[0]       * 100, dec1, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(lab[1] / 0.4 * 100, dec2, trimZeros.value > 0) + '%'
                    + ' ' + getColorValueToText(lab[2] / 0.4 * 100, dec3, trimZeros.value > 0) + '%';

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0) + '%';

                str += ')';
            }
            else
            {
                str = 
                    'lab('
                    +       getColorValueToText(lab[0], Math.max(dec1, 3), trimZeros.value > 0)
                    + ' ' + getColorValueToText(lab[2], Math.max(dec3, 3), trimZeros.value > 0)
                    + ' ' + getColorValueToText(lab[1], Math.max(dec2, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], Math.max(dec4, 3), trimZeros.value > 0);

                str += ')';
            }
    
            break;
        }
        case 7: // color()
        {
            let space, 
                color;

            const _space =
                input.type == FILL_VALUE
                ? input.color.space
                : input.space;


            switch (_space.value)
            {
                case  0:
                case  1: 
                case  2: 
                case  3: 
                case  9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14: space = 'srgb';         color =           rgba;  break;

                case  4: space = 'srgb-linear';  color = rgb2lin  (rgba); break;
                case  5: space = 'display-p3';   color = rgb2p3   (rgba); break;
                case  6: space = 'a98-rgb';      color = rgb2a98  (rgba); break;
                case  7: space = 'prophoto-rgb'; color = rgb2pro  (rgba); break;
                case  8: space = 'rec2020';      color = rgb2r2020(rgba); break;

                case 15: space = 'xyz';          color = rgb2xyz  (rgba); break;
                case 16: space = 'xyz-d50';      color = rgb2xyz  (rgba, sRGB_D50); break;
                case 17: space = 'xyz-d65';      color = rgb2xyz  (rgba); break;
            }


            if (percent.value > 0)
            {
                str = 
                    'color('
                    +       space
                    + ' ' + getColorValueToText(color[0] * 100, dec1, trimZeros.value > 0) + '%' 
                    + ' ' + getColorValueToText(color[1] * 100, dec2, trimZeros.value > 0) + '%' 
                    + ' ' + getColorValueToText(color[2] * 100, dec3, trimZeros.value > 0) + '%';

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3] * 100, dec4, trimZeros.value > 0) + '%';

                str += ')';
            }
            else
            {
                str = 
                    'color('
                    +       space
                    + ' ' + getColorValueToText(color[0], Math.max(dec1, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(color[1], Math.max(dec3, 3), trimZeros.value > 0) 
                    + ' ' + getColorValueToText(color[2], Math.max(dec2, 3), trimZeros.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], Math.max(dec4, 3), trimZeros.value > 0);

                str += ')';
            }


            break;
        }
        case 8: // HTML name
            str = getClosestHtmlName(rgba);
            break;
    }


    return new TextValue(str);
}
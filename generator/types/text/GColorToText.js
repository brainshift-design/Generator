class GColorToText
extends GOperator1
{
    format;
    trim;


    
    constructor(nodeId, options)
    {
        super(COLOR_TO_TEXT, nodeId, options);
    }


    reset()
    {
        super.reset();

        this.format = null;
        this.trim   = null;
    }



   
    copy()
    {
        const copy = new GColorToText(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.format) copy.format = this.format.copy();
        if (this.trim  ) copy.trim   = this.trim  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalValue      (this.input,  parse);
        const format = await evalNumberValue(this.format, parse);
        const trim   = await evalNumberValue(this.trim,   parse);


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
                        || item.type == FILL_VALUE
                        ? getColorToTextValue(item, format, trim)
                        : TextValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getColorToTextValue(input, format, trim);
            }
        }

        else
            this.value = TextValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['format', format           ],
            ['trim',   trim             ]
        ]);


        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.format && this.format.isValid()
            && this.trim   && this.trim  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.format) this.format.pushValueUpdates(parse);
        if (this.trim  ) this.trim  .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.format) this.format.invalidateInputs(parse, from, force);
        if (this.trim  ) this.trim  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.format) this.format.iterateLoop(parse);
        if (this.trim  ) this.trim  .iterateLoop(parse);
    }
}



function getColorToTextValue(input, format, trim)
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

    
    const maxDec = Math.max(dec1, dec2, dec3, dec4);

    if (   format.value == 0
        && fill.color.space == 0)
    {
        
    }


    switch (format.value)
    {
        case 0: // hex
            str = rgb2hex(rgba);

            if (input.type == FILL_VALUE)
                str += chan2hex(rgba[3]);

            break;

        case 1: // rgb 0.0-1.0
            str = 
                         getColorValueToText(rgba[0], dec1, trim.value > 0) 
                + ', ' + getColorValueToText(rgba[1], dec2, trim.value > 0) 
                + ', ' + getColorValueToText(rgba[2], dec3, trim.value > 0);

            if (input.type == FILL_VALUE)
                str += ', ' + getColorValueToText(rgba[3], dec4, trim.value > 0);

            break;

        case 2: // rgb 0-255
            str = 
                         getColorValueToText(rgba[0] * 255, dec1, trim.value > 0) 
                + ', ' + getColorValueToText(rgba[1] * 255, dec2, trim.value > 0) 
                + ', ' + getColorValueToText(rgba[2] * 255, dec3, trim.value > 0);

            if (input.type == FILL_VALUE)
                str += ', ' + getColorValueToText(rgba[3] * 255, dec4, trim.value > 0);

            break;

        case 3: // CSS hex
            str = '#' + rgb2hex(rgba);

            if (input.type == FILL_VALUE)
                str += chan2hex(rgba[3]);

            break;

        case 4: // CSS rgb
            str = 
                'rgb('
                      + getColorValueToText(rgba[0] * 255, dec1, trim.value > 0)
                + ' ' + getColorValueToText(rgba[1] * 255, dec2, trim.value > 0)
                + ' ' + getColorValueToText(rgba[2] * 255, dec3, trim.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], dec4, trim.value > 0);
    
                str += ')';
            break;

        case 5: // CSS hsl
        {
            const hsl = rgb2hsl(rgba);

            str = 
                'hsl('
                +       getColorValueToText(hsl[0] * 360, dec1, trim.value > 0)
                + ' ' + getColorValueToText(hsl[1] * 100, dec2, trim.value > 0)
                + ' ' + getColorValueToText(hsl[2] * 100, dec3, trim.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], dec4, trim.value > 0);
    
                str += ')';
            break;
        }
        case 6: // CSS oklch
        {
            const hcl = rgb2hclok(rgba);

            str = 
                'oklch('
                +       getColorValueToText(hcl[2] * 100, dec1, trim.value > 0)
                + ' ' + getColorValueToText(hcl[1],       dec2, trim.value > 0)
                + ' ' + getColorValueToText(hcl[0] * 360, dec3, trim.value > 0);

            if (input.type == FILL_VALUE)
                str += ' / ' + getColorValueToText(rgba[3], dec4, trim.value > 0);

            str += ')';

            break;
        }
        case 7: // CSS lch
        {
            const hcl = rgb2hclab(rgba);

            str = 
                'lch('
                +       getColorValueToText(hcl[2] * 100, dec1, trim.value > 0)
                + ' ' + getColorValueToText(hcl[1] * 100, dec2, trim.value > 0)
                + ' ' + getColorValueToText(hcl[0] * 360, dec3, trim.value > 0);

            if (input.type == FILL_VALUE)
                str += ' / ' + getColorValueToText(rgba[3], dec4, trim.value > 0);

            str += ')';

            break;
        }
        case 8: // CSS oklab
        {
            const lab = rgb2oklab(rgba);

            str = 
                'oklab('
                +       getColorValueToText(lab[0] * 100, dec1, trim.value > 0)
                + ' ' + getColorValueToText(lab[1],       dec2, trim.value > 0)
                + ' ' + getColorValueToText(lab[2],       dec3, trim.value > 0);

            if (input.type == FILL_VALUE)
                str += ' / ' + getColorValueToText(rgba[3], dec4, trim.value > 0);

            str += ')';

            break;
        }
        case 9: // CSS lab
        {
            const lab = rgb2lab(rgba);

            str = 
                'lab('
                +       getColorValueToText(lab[0] * 100, dec1, trim.value > 0)
                + ' ' + getColorValueToText(lab[1] * 100, dec2, trim.value > 0)
                + ' ' + getColorValueToText(lab[2] * 100, dec3, trim.value > 0);

                if (input.type == FILL_VALUE)
                    str += ' / ' + getColorValueToText(rgba[3], dec4, trim.value > 0);
    
                str += ')';
            break;
        }
        case 10: // CSS color
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

            str = 
                'color('
                +       space
                + ' ' + numToString(color[0], dec1) 
                + ' ' + numToString(color[1], dec2) 
                + ' ' + numToString(color[2], dec3);

            if (input.type == FILL_VALUE)
                str += ' / ' + numToString(rgba[3], dec4);

            str += ')';

            break;
        }
        case 11: // name
            str = createColorName(rgba);
            break;
    }

    return new TextValue(str);
}



function getColorValueToText(val, dec, trim)
{
    return numToString(val, (trim ? -1 : 1) * dec);
}
class GColorToText
extends GOperator1
{
    format;


    
    constructor(nodeId, options)
    {
        super(COLOR_TO_TEXT, nodeId, options);
    }


    reset()
    {
        super.reset();

        this.format = null;
    }



   
    copy()
    {
        const copy = new GColorToText(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.format) copy.format = this.format.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input  = await evalColorValue (this.input,  parse);
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
                        item.type == NUMBER_VALUE
                        ? getColorToTextValue(item, format)
                        : TextValue.NaN.copy());   
                }
            }
            else
            {
                this.value = getColorToTextValue(input, format);
            }
        }

        else
            this.value = TextValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['type',   this.outputType()],
            ['format', format           ]
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



function getColorToTextValue(input, format)
{
    let str = NAN_CHAR;

    const rgb = input.toRgb();

    switch (format.value)
    {
        case 0: // hex
            str = rgb2hex(rgb);
            break;

        case 1: // rgb 1.0
            str = 
                         numToString(rgb[0], -3) 
                + ', ' + numToString(rgb[1], -3) 
                + ', ' + numToString(rgb[2], -3);
            break;

        case 2: // rgb 255
            str = 
                         Math.round(rgb[0] * 255) 
                + ', ' + Math.round(rgb[1] * 255) 
                + ', ' + Math.round(rgb[2] * 255);
            break;

        case 3: // CSS hex
            str = '#' + rgb2hex(rgb);
            break;

        case 4: // CSS rgb
            str = 
                'rgb('
                      + numToString(rgb[0] * 255)
                + ' ' + numToString(rgb[1] * 255)
                + ' ' + numToString(rgb[2] * 255)
                + ')';
            break;

        case 5: // CSS hsl
        {
            const hsl = rgb2hsl(rgb);

            str = 
                'hsl('
                +       numToString(hsl[0] * 360)
                + ' ' + numToString(hsl[1] * 100)
                + ' ' + numToString(hsl[2] * 100)
                + ')';
            break;
        }
        case 6: // CSS lab
        {
            const lab = rgb2lab(rgb);

            str = 
                'lab('
                +       numToString(lab[0] * 100)
                + ' ' + numToString(lab[1] * 100)
                + ' ' + numToString(lab[2] * 100)
                + ')';
            break;
        }
        case 7: // CSS lch
        {
            const hcl = rgb2hclab(rgb);

            str = 
                'lch('
                +       numToString(hcl[2] * 100)
                + ' ' + numToString(hcl[1] * 100)
                + ' ' + numToString(hcl[0] * 360)
                + ')';
            break;
        }
        case 8: // CSS oklab
        {
            const lab = rgb2oklab(rgb);

            str = 
                'oklab('
                +       numToString(lab[0] * 100)
                + ' ' + numToString(lab[1], -3)
                + ' ' + numToString(lab[2], -3)
                + ')';
            break;
        }
        case 9: // CSS oklch
        {
            const hcl = rgb2hclok(rgb);

            str = 
                'oklch('
                +       numToString(hcl[2] * 100)
                + ' ' + numToString(hcl[1], -3)
                + ' ' + numToString(hcl[0] * 360)
                + ')';
            break;
        }
        case 10: // CSS color
        {
            let space, 
                color;

            switch (input.space.value)
            {
                case  0:
                case  1: 
                case  7:
                case  8:
                case  9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14: space = 'srgb';         color =           rgb;  break;

                case  2: space = 'srgb-linear';  color = rgb2lin  (rgb); break;
                case  3: space = 'display-p3';   color = rgb2p3   (rgb); break;
                case  4: space = 'a98-rgb';      color = rgb2a98  (rgb); break;
                case  5: space = 'prophoto-rgb'; color = rgb2pro  (rgb); break;
                case  6: space = 'rec2020';      color = rgb2r2020(rgb); break;

                case 15: space = 'xyz';          color = rgb2xyz  (rgb); break;
                case 16: space = 'xyz-d50';      color = rgb2xyz  (rgb, sRGB_D50); break;
                case 17: space = 'xyz-d65';      color = rgb2xyz  (rgb); break;
            }

            str = 
                'color('
                +       space
                + ' ' + numToString(color[0], -3) 
                + ' ' + numToString(color[1], -3) 
                + ' ' + numToString(color[2], -3)
                + ')';

            break;
        }
        case 11: // name
            str = createColorName(rgb);
            break;
    }

    return new TextValue(str);
}
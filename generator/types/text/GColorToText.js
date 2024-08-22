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


        const input  = await evalFillValue  (this.input,  parse, false);
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

    const rgba = 
        input.type == COLOR_VALUE
        ? rgb_a(input.toRgb())
        : input.toRgba();


    switch (format.value)
    {
        case 0: // hex
            str = rgb2hex(rgba);

            if (input.type == FILL_VALUE)
                str += chan2hex(rgba[3]);

            break;

        case 1: // rgb 1.0
            str = 
                         numToString(rgba[0], -3) 
                + ', ' + numToString(rgba[1], -3) 
                + ', ' + numToString(rgba[2], -3);

            if (input.type == FILL_VALUE)
                str += ', ' + numToString(rgba[3], -3);

            break;

        case 2: // rgb 255
            str = 
                         Math.round(rgba[0] * 255) 
                + ', ' + Math.round(rgba[1] * 255) 
                + ', ' + Math.round(rgba[2] * 255);

            if (input.type == FILL_VALUE)
                str += ', ' + numToString(rgba[3] * 255);

            break;

        case 3: // CSS hex
            str = '#' + rgb2hex(rgba);

            if (input.type == FILL_VALUE)
                str += chan2hex(rgba[3]);

            break;

        case 4: // CSS rgb
            str = 
                'rgb('
                      + numToString(rgba[0] * 255)
                + ' ' + numToString(rgba[1] * 255)
                + ' ' + numToString(rgba[2] * 255);

                if (input.type == FILL_VALUE)
                    str += ' / ' + numToString(rgba[3], -3);
    
                str += ')';
            break;

        case 5: // CSS hsl
        {
            const hsl = rgb2hsl(rgba);

            str = 
                'hsl('
                +       numToString(hsl[0] * 360)
                + ' ' + numToString(hsl[1] * 100)
                + ' ' + numToString(hsl[2] * 100);

                if (input.type == FILL_VALUE)
                    str += ' / ' + numToString(rgba[3], -3);
    
                str += ')';
            break;
        }
        case 6: // CSS lab
        {
            const lab = rgb2lab(rgba);

            str = 
                'lab('
                +       numToString(lab[0] * 100)
                + ' ' + numToString(lab[1] * 100)
                + ' ' + numToString(lab[2] * 100);

                if (input.type == FILL_VALUE)
                    str += ' / ' + numToString(rgba[3], -3);
    
                str += ')';
            break;
        }
        case 7: // CSS lch
        {
            const hcl = rgb2hclab(rgba);

            str = 
                'lch('
                +       numToString(hcl[2] * 100)
                + ' ' + numToString(hcl[1] * 100)
                + ' ' + numToString(hcl[0] * 360);

            if (input.type == FILL_VALUE)
                str += ' / ' + numToString(rgba[3], -3);

            str += ')';

            break;
        }
        case 8: // CSS oklab
        {
            const lab = rgb2oklab(rgba);

            str = 
                'oklab('
                +       numToString(lab[0] * 100)
                + ' ' + numToString(lab[1], -3)
                + ' ' + numToString(lab[2], -3);

            if (input.type == FILL_VALUE)
                str += ' / ' + numToString(rgba[3], -3);

            str += ')';

            break;
        }
        case 9: // CSS oklch
        {
            const hcl = rgb2hclok(rgba);

            str = 
                'oklch('
                +       numToString(hcl[2] * 100)
                + ' ' + numToString(hcl[1], -3)
                + ' ' + numToString(hcl[0] * 360);

            if (input.type == FILL_VALUE)
                str += ' / ' + numToString(rgba[3], -3);

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
                case  7:
                case  8:
                case  9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14: space = 'srgb';         color =           rgba;  break;

                case  2: space = 'srgb-linear';  color = rgb2lin  (rgba); break;
                case  3: space = 'display-p3';   color = rgb2p3   (rgba); break;
                case  4: space = 'a98-rgb';      color = rgb2a98  (rgba); break;
                case  5: space = 'prophoto-rgb'; color = rgb2pro  (rgba); break;
                case  6: space = 'rec2020';      color = rgb2r2020(rgba); break;

                case 15: space = 'xyz';          color = rgb2xyz  (rgba); break;
                case 16: space = 'xyz-d50';      color = rgb2xyz  (rgba, sRGB_D50); break;
                case 17: space = 'xyz-d65';      color = rgb2xyz  (rgba); break;
            }

            str = 
                'color('
                +       space
                + ' ' + numToString(color[0], -3) 
                + ' ' + numToString(color[1], -3) 
                + ' ' + numToString(color[2], -3);

            if (input.type == FILL_VALUE)
                str += ' / ' + numToString(rgba[3], -3);

            str += ')';

            break;
        }
        case 11: // name
            str = createColorName(rgba);
            break;
    }

    return new TextValue(str);
}
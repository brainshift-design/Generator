class ColorValue
extends GValue
{
    static { GNode.types[COLOR_VALUE] = this; }



    space;
    c1;
    c2;
    c3;



    constructor(space = NumberValue.NaN(), 
                c1    = NumberValue.NaN(), 
                c2    = NumberValue.NaN(), 
                c3    = NumberValue.NaN())
    {
        super(COLOR_VALUE, 'color');

        this.space  = space.copy();
        this.c1     = c1   .copy();
        this.c2     = c2   .copy();
        this.c3     = c3   .copy();

        this.valid  = true;
    }



    static create(space, c1, c2, c3)
    {
        consoleAssert(typeof space == 'number', 'ColorValue.create() space must be a number');
        consoleAssert(typeof c1    == 'number', 'ColorValue.create() c1 must be a number');
        consoleAssert(typeof c2    == 'number', 'ColorValue.create() c2 must be a number');
        consoleAssert(typeof c3    == 'number', 'ColorValue.create() c3 must be a number');

        return new ColorValue(
            new NumberValue(space, 0),
            new NumberValue(c1,    0),
            new NumberValue(c2,    0),
            new NumberValue(c3,    0));
    }



    static fromRgb(rgb)
    {
        return ColorValue.create(1, rgb[0], rgb[1], rgb[2]);
    }



    static fromDataColor(_color, spaceIndex = -1)
    {
        if (spaceIndex < 0)
            spaceIndex = colorSpaceIndex(_color[0]);

        const space  = colorSpace(spaceIndex);
        const factor = colorSpaceFactor(space);

        return ColorValue.create(
            spaceIndex,
            _color[1] * factor[0],
            _color[2] * factor[1],
            _color[3] * factor[2]);
    }



    copy()
    {
        const copy = new ColorValue(
            this.space.copy(), 
            this.c1   .copy(), 
            this.c2   .copy(), 
            this.c3   .copy());

        copy.copyBase(this);

        return copy;
    }



    hasInitValue()
    {
        return this.space.hasInitValue()
            && this.c1   .hasInitValue()
            && this.c2   .hasInitValue()
            && this.c3   .hasInitValue();
    }



    isValid()
    {
        return this.space.isValid()
            && this.c1   .isValid()
            && this.c2   .isValid()
            && this.c3   .isValid();
    }



    equals(col)
    {
        return col
            && this.space.equals(col.space)
            && this.c1   .equals(col.c1   )
            && this.c2   .equals(col.c2   )
            && this.c3   .equals(col.c3   );
    }



    // getMaxDecimals()
    // {
    //     return Math.max(
    //         this.c1.decimals,
    //         this.c2.decimals,
    //         this.c3.decimals);
    // }



    async eval(parse)
    {
        return this.copy();
    }



    toDataColor()
    {
        if (!this.isValid())
            return dataColor_NaN;

        const space = this.space.copy();

        space.value = Math.round(Math.min(Math.max(0, space.value), ColorSpaces.length-1));

        return makeDataColor(
            space,
            this.c1,
            this.c2,
            this.c3);
    }



    toValue()
    {
        return this.toRgb();
    }



    toRgb()
    {
        return dataColor2rgb(this.toDataColor());
    }



    toRgba()
    {
        return rgb_a(this.toRgb());
    }



    toRgbObject(limit = false)
    {
        const rgb = dataColor2rgb(this.toDataColor());

        if (limit && rgbIsNaN(rgb))
            return {r: 0.5, g: 0.5, b: 0.5};
        
        return limit
            ? { r: Math.min(Math.max(0, rgb[0]), 1),
                g: Math.min(Math.max(0, rgb[1]), 1),
                b: Math.min(Math.max(0, rgb[2]), 1) }
            : { r: rgb[0],
                g: rgb[1],
                b: rgb[2] };
    }



    toString()
    {
        return      this.space.toString() 
            + ' ' + this.c1   .toString()
            + ' ' + this.c2   .toString()
            + ' ' + this.c3   .toString();
    }



    toPreviewString()
    {
        return      this.space.toPreviewString() 
            + ' ' + this.c1   .toPreviewString()
            + ' ' + this.c2   .toPreviewString()
            + ' ' + this.c3   .toPreviewString();
    }



    toDisplayString()
    {
        return      this.space.toDisplayString() 
            + ' ' + this.c1   .toDisplayString()
            + ' ' + this.c2   .toDisplayString()
            + ' ' + this.c3   .toDisplayString();
    }



    toPreviewString()
    {
        if (!this.isValid())
            return UNKNOWN_DISPLAY;

        const rgb = this.toRgb();

        return rgb2hex(rgb, true);
    }



    toRgbString()
    {
        if (!this.isValid())
            return UNKNOWN_DISPLAY;

        const rgb = this.toRgb();

        return      rgb[0].toString()
            + ' ' + rgb[1].toString()
            + ' ' + rgb[2].toString();
    }



    toJson()
    {
        return this.toString();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const { SL, SL_, WSL } = getWhiteSpaceForJson(options);


        let json = '';

        
        if (this.space.value == 0) // hex
        {
            json += '"' + this.toPreviewString() + '"';
            options.lastExpanded = false;
        }
        else
        {
            if (options.named)
                json += SL('\n' + TAB(options.tab));


            json += '{' + SL('\n');
            options.tab++;

            const oldNamed = options.named;
            options.named = true;


            if (this.space.value > 3)
                json += WSL(TAB(options.tab)) + '"space": "' + colorSpaceName(this.space.value).replaceAll(' ', '') + '",' + SL('\n');

            const [c1, c2, c3] = getChannelNamesFromSpace(colorSpace(this.space.value));

            json += WSL(TAB(options.tab)) + '"' + c1 + '": ' + this.c1.toJsonText(options) + ',' + SL('\n');
            json += SL_(TAB(options.tab)) + '"' + c2 + '": ' + this.c2.toJsonText(options) + ',' + SL('\n');
            json += SL_(TAB(options.tab)) + '"' + c3 + '": ' + this.c3.toJsonText(options)       + SL('\n');


            options.named = oldNamed;

            options.tab--;
            json += WSL(TAB(options.tab)) + '}';


            options.lastExpanded = !options.singleLine;
        }

        return json;
    }



    static NaN()
    {
        return new ColorValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }


    
    static parseRequest(parse)
    {
        parse.pos++; // COLOR_VALUE
    
        const col = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(COLOR_VALUE, col, parse);
    
        return ColorValue.parse(col)[0];
    }



    static parse(str, i = -1)
    {
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
            

        const iStart = i;

        const space = NumberValue.parse(str[i]); i += space[1];
        const c1    = NumberValue.parse(str[i]); i += c1   [1];
        const c2    = NumberValue.parse(str[i]); i += c2   [1];
        const c3    = NumberValue.parse(str[i]); i += c3   [1];


        return [
            new ColorValue(space ? space[0] : new NumberValue(1), c1[0], c2[0], c3[0]), 
            i - iStart ];
    }
}
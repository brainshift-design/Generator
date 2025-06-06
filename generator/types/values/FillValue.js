class FillValue
extends GValue
{
    static { GNode.types[FILL_VALUE] = this; }



    color;
    opacity;
    blend;



    constructor(color   = ColorValue.NaN(), 
                opacity = new NumberValue(100),
                blend   = new NumberValue(0))
    {
        super(FILL_VALUE, 'fill');

        this.color   = color  .copy();
        this.opacity = opacity.copy();
        this.blend   = blend  .copy();

        this.valid   = true;
    }


    
    static fromRgb(rgb, opacity, blend = 0)
    {
        consoleAssert(
            typeof opacity == 'number',
            'opacity must be a number');

        return new FillValue(
            ColorValue.fromRgb(rgb),
            new NumberValue(opacity),
            new NumberValue(blend));
    }



    static create(r, g, b, opacity, blend = 0)
    {
        consoleAssert(
            typeof opacity == 'number',
            'opacity must be a number');

        return new FillValue(
            ColorValue.create(1, r, g, b),
            new NumberValue(opacity),
            new NumberValue(blend));
    }



    copy()
    {
        const copy = new FillValue(
            this.color  .copy(),
            this.opacity.copy(),
            this.blend  .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(fill)
    {
        return this.color  .equals(fill.color  )
            && this.opacity.equals(fill.opacity)
            && this.blend  .equals(fill.blend  );
    }



    // getMaxDecimals()
    // {
    //     return Math.max(
    //         this.color.c1.decimals,
    //         this.color.c2.decimals,
    //         this.color.c3.decimals,
    //         this.);
    // }



    async eval(parse)
    {
        return this.copy();
    }



    toValue()
    {
        return this.toRgba();
    }



    toRgba()
    {
        return [
            ...this.color.toRgb(),
            this.opacity.value / 100 ];
    }



    toRgbaObject(limit = false)
    {
        const rgba = rgb_a(
            dataColor2rgb(this.color.toDataColor()),
            this.opacity.value / 100);

        if (limit && rgbIsNaN(rgba))
            return {r: 0.5, g: 0.5, b: 0.5};
        
        return limit
            ? { r: Math.min(Math.max(0, rgba[0]), 1),
                g: Math.min(Math.max(0, rgba[1]), 1),
                b: Math.min(Math.max(0, rgba[2]), 1),
                a: Math.min(Math.max(0, rgba[3]), 1) }
            : { r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: rgba[3] };
    }



    toString()
    {
        const rgb = scaleRgb(this.color.toRgb());

        return        new NumberValue(rgb[0]).toString()
              + ' ' + new NumberValue(rgb[1]).toString()
              + ' ' + new NumberValue(rgb[2]).toString()
              + ' ' + this.opacity           .toString()
              + ' ' + this.blend             .toString();
    }



    toPreviewString()
    {
        const rgb = scaleRgb(this.color.toRgb());

        return        new NumberValue(rgb[0]).toPreviewString()
              + ' ' + new NumberValue(rgb[1]).toPreviewString()
              + ' ' + new NumberValue(rgb[2]).toPreviewString()
              + ' ' + this.opacity           .toPreviewString()
              + ' ' + this.blend             .toPreviewString();
    }



    toDisplayString()
    {
        const rgb = scaleRgb(this.color.toRgb());

        return        new NumberValue(rgb[0]).toDisplayString()
              + ' ' + new NumberValue(rgb[1]).toDisplayString()
              + ' ' + new NumberValue(rgb[2]).toDisplayString()
              + ' ' + this.opacity           .toDisplayString()
              + ' ' + this.blend             .toDisplayString();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const { SL, SL_, WSL } = getWhiteSpaceForJson(options);


        let json = '';

        
        if (options.named)
            json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += WSL(TAB(options.tab)) + '"color": '   + this.color  .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"opacity": ' + this.opacity.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"blend": "'  + BlendModes[this.blend.value][1]  + '"' + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;

        return json;
    }



    hasInitValue()
    {
        return this.color  .hasInitValue()
            && this.opacity.hasInitValue()
            && this.blend  .hasInitValue();
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid()
            && this.blend  .isValid();
    }



    static NaN()
    {
        return new FillValue(
            ColorValue .NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }



    static parseRequest(parse)
    {
        parse.pos++; // FILL_VALUE
    
        const fill = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(FILL_VALUE, fill, parse);
    
        return FillValue.parse(fill)[0];
    }



    static parse(str, i = -1)
    {
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const r   = NumberValue.parse(str[i]); i += r  [1];
        const g   = NumberValue.parse(str[i]); i += g  [1];
        const b   = NumberValue.parse(str[i]); i += b  [1];
        const a   = NumberValue.parse(str[i]); i += a  [1];
        const bl  = NumberValue.parse(str[i]); i += bl [1];
    
        
        return [
            new FillValue(
                new ColorValue(new NumberValue(1), r[0], g[0], b[0]), 
                a [0], 
                bl[0]),
            i - iStart ];
    }



    static default = Object.freeze(FillValue.create(217, 217, 217, 100));
}



// async function evalFillValue(fillValue, parse)
// {
//     await fillValue.eval(parse);

//          if ( FILL_TYPES.includes(fillValue.type)) return fill;
//     else if (COLOR_TYPES.includes(fillValue.type)) return new FillValue(fill, fillValue.data.opacity);

//     else consoleError('fill must have type');
// }
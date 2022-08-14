class GColorFillValue
extends GType
{
    color;
    opacity;



    constructor(color   = GColorValue .NaN, 
                opacity = GNumberValue.NaN,
                log = '')
    {
        //if (log != '') console.log('%c'+log, 'background-color: #fc8');

        super(COLOR_FILL_VALUE);

        this.color   = color;
        this.opacity = opacity;

        // console.log('color =',      color);
        // console.log('this.color =', this.color);
        // console.log('this =',       this);

        this.result  = this;
        this.valid   = true;
    }


    
    static create(space, c1, c2, c3, opacity)
    {
        return new GColorFillValue(
            GColorValue.create(space, c1, c2, c3),
            new GNumberValue(opacity),
            'create()');
    }



    static createFromRgb(rgb, opacity)
    {
        return new GColorFillValue(
            GColorValue.create(1, rgb[0], rgb[1], rgb[2]),
            new GNumberValue(opacity),
            'createFromRgb()');
    }



    copy()
    {
        const color   = this.color  .copy();
        const opacity = this.opacity.copy();
        
        const fill = new GColorFillValue(color, opacity, 'copy()');
        // console.log('color =',   color);
        //console.log('fill =', fill);
        return fill;
        // return new GColorFillValue(
        //     this.color  .copy(),
        //     this.opacity.copy());
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid();
    }



    equals(col)
    {
        return this.color  .equals(col.color  )
            && this.opacity.equals(col.opacity);
    }



    eval(parse)
    {
        return this;//return this.result = this.copy();
    }



    toString()
    {
        return this.isValid()
            ?         this.color  .toString()
              + ' ' + this.opacity.toString()
            : INVALID;
    }



    static NaN = Object.freeze(new GColorFillValue(
        GColorValue .NaN,
        GNumberValue.NaN,
        'NaN'));



    static default = Object.freeze(new GColorFillValue(
        new GColorValue(1, 217, 217, 217),
        new GNumberValue(100)));
}



function parseGColorFillValue(str)
{
    if (str == INVALID)
        return GColorFillValue.NaN;

    const fill = str.split(' ');

    return new GColorFillValue(
        parseGColorValue(str),
        parseGNumberValue(fill[4]),
        'parseGColorFillValue()');
}
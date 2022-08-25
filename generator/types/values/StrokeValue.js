class StrokeValue
extends GType
{
    fill;
    weight;
    fit;
    join;
    miter;



    constructor(fill   = FillValue  .NaN, 
                weight = NumberValue.NaN,
                fit    = NumberValue.NaN,
                join   = NumberValue.NaN,
                miter  = NumberValue.NaN)
    {
        if (fill.type != FILL_VALUE)
        {
            console.trace();
            console.assert(false, 'fill.type must be FILL_VALUE');
        }


        super(STROKE_VALUE);

        this.fill   = fill  .copy();
        this.weight = weight.copy();
        this.fit    = fit   .copy();
        this.join   = join  .copy();
        this.miter  = miter .copy();

        this.result  = null;
        this.valid   = true;
    }


    
    // static create(r, g, b, opacity)
    // {
    //     console.assert(
    //         typeof opacity == 'number',
    //         'opacity must be a number');

    //     return new FillValue(
    //         ColorValue.create(1, r, g, b),
    //         new NumberValue(opacity));
    // }



    // static createFromRgb(rgb, opacity)
    // {
    //     console.assert(
    //         typeof opacity == 'number',
    //         'opacity must be a number');

    //     return new FillValue(
    //         ColorValue.createFromRgb(rgb),
    //         new NumberValue(opacity));
    // }



    copy()
    {
        return new StrokeValue(
            this.fill  .copy(),
            this.weight.copy(),
            this.fit   .copy(),
            this.join  .copy(),
            this.miter .copy());
    }



    isValid()
    {
        return this.fill  .isValid()
            && this.weight.isValid()
            && this.fit   .isValid()
            && this.join  .isValid()
            && this.miter .isValid();
    }



    equals(stroke)
    {
        return stroke
            && this.fill  .equals(stroke.fill  )
            && this.weight.equals(stroke.weight)
            && this.fit   .equals(stroke.fit   )
            && this.join  .equals(stroke.join  )
            && this.miter .equals(stroke.miter );
    }



    eval(parse)
    {
        return this;
    }



    toString()
    {
        return this.isValid()
            ?         this.fill  .toString()
              + ' ' + this.weight.toString()
              + ' ' + this.fit   .toString()
              + ' ' + this.join  .toString()
              + ' ' + this.miter .toString()
            : INVALID;
    }



    toFigma()
    {
        let align, join;

        switch (this.fit.value)
        {
            case 0: align = 'INSIDE';  break;
            case 1: align = 'CENTER';  break;
            case 2: align = 'OUTSIDE'; break;
        }
        
        switch (this.join.value)
        {
            case 0: join = 'MITER'; break;
            case 1: join = 'BEVEL'; break;
            case 2: join = 'ROUND'; break;
        }

        return this.isValid()
            ? {
                  strokes:          this.fill.toFigma(),
                  strokeWeight:     this.weight.value,
                  strokeAlign:      align,
                  strokeJoin:       join,
                  strokeMiterLimit: this.miter.value
              }
            : {};
    }



    static NaN = Object.freeze(new StrokeValue(
        FillValue  .NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN));



    static default = Object.freeze(new StrokeValue(
        FillValue.create(0, 0, 0, 100),
        new NumberValue(1),
        new NumberValue(0),
        new NumberValue(0),
        new NumberValue(28.96)));
}



function parseStrokeValue(str, i = -1)
{
    if (   i <  0 && str    == INVALID
        || i >= 0 && str[i] == INVALID)
        return [StrokeValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const fill   = parseFillValue  (str, i); i += fill  [1];
    const weight = parseNumberValue(str[i]); i += weight[1];
    const fit    = parseNumberValue(str[i]); i += fit   [1];
    const join   = parseNumberValue(str[i]); i += join  [1];
    const miter  = parseNumberValue(str[i]); i += miter [1];


    return [
        new StrokeValue(fill[0], weight[0], fit[0], join[0], miter[0]),
        i - iStart ];
}
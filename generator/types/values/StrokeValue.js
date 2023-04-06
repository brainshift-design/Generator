class StrokeValue
extends GValue
{
    fill;
    weight;
    fit;
    join;
    miter;



    constructor(fill   = FillValue.NaN, 
                weight = new NumberValue(1),
                fit    = new NumberValue(0),
                join   = new NumberValue(0),
                miter  = new NumberValue(28.96, 2))
    {
        if (fill.type != FILL_VALUE)
            console.assert(false, 'fill.type must be FILL_VALUE');


        super(STROKE_VALUE);

        this.fill   = fill  .copy();
        this.weight = weight.copy();
        this.fit    = fit   .copy();
        this.join   = join  .copy();
        this.miter  = miter .copy();

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



    // static fromRgb(rgb, opacity)
    // {
    //     console.assert(
    //         typeof opacity == 'number',
    //         'opacity must be a number');

    //     return new FillValue(
    //         ColorValue.fromRgb(rgb),
    //         new NumberValue(opacity));
    // }



    copy()
    {
        const copy = new StrokeValue(
            this.fill  .copy(),
            this.weight.copy(),
            this.fit   .copy(),
            this.join  .copy(),
            this.miter .copy());

        copy.copyBase(this);

        return copy;
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



    async eval(parse)
    {
        return this;
    }



    // toFigma()
    // {
    //     let align, join;

        
    //     switch (this.fit.value)
    //     {
    //         case 0: align = 'INSIDE';  break;
    //         case 1: align = 'CENTER';  break;
    //         case 2: align = 'OUTSIDE'; break;
    //     }
        
    //     switch (this.join.value)
    //     {
    //         case 0: join = 'MITER'; break;
    //         case 1: join = 'BEVEL'; break;
    //         case 2: join = 'ROUND'; break;
    //     }

        
    //     return this.isValid()
    //         ? {
    //               strokes:          this.fill.toFigma(),
    //               strokeWeight:     this.weight.value,
    //               strokeAlign:      align,
    //               strokeJoin:       join,
    //               strokeMiterLimit: this.miter.value
    //           }
    //         : {
    //               strokes: []
    //           };
    // }



    toValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.fill  .toString()
            + ' ' + this.weight.toString()
            + ' ' + this.fit   .toString()
            + ' ' + this.join  .toString()
            + ' ' + this.miter .toString();
    }



    toDisplayString()
    {
        return      this.fill  .toDisplayString()
            + ' ' + this.weight.toDisplayString()
            + ' ' + this.fit   .toDisplayString()
            + ' ' + this.join  .toDisplayString()
            + ' ' + this.miter .toDisplayString();
    }



    getNaN()
    {
        return StrokeValue.NaN;
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
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
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



// async function evalStrokeValue(value, parse)
// {
//     const stroke = (await value.eval(parse)).copy();

//          if (STROKE_TYPES.includes(stroke.type)) return stroke;
//     else if (  FILL_TYPES.includes(stroke.type)) return new StrokeValue(stroke, value.data.weight);
//     else if ( COLOR_TYPES.includes(stroke.type)) return new StrokeValue(new FillValue(stroke), value.data.weight);

//     else console.assert(false, 'stroke must have type');
// }
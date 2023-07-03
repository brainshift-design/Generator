class StrokeValue
extends GValue
{
    fills;
    weight;
    fit;
    join;
    miter;



    constructor(fills  = new ListValue(), 
                weight = new NumberValue(1),
                fit    = new NumberValue(0),
                join   = new NumberValue(0),
                miter  = new NumberValue(28.96, 2))
    {
        if (fills.type != LIST_VALUE)
            consoleError('fill.type is ' + fills.type + ', must be LIST_VALUE');


        super(STROKE_VALUE);

        this.fills  = fills .copy();
        this.weight = weight.copy();
        this.fit    = fit   .copy();
        this.join   = join  .copy();
        this.miter  = miter .copy();

        this.valid  = true;
    }


    
    copy()
    {
        const copy = new StrokeValue(
            this.fills .copy(),
            this.weight.copy(),
            this.fit   .copy(),
            this.join  .copy(),
            this.miter .copy());

        copy.copyBase(this);

        return copy;
    }



    isValid()
    {
        return this.fills .isValid()
            && this.weight.isValid()
            && this.fit   .isValid()
            && this.join  .isValid()
            && this.miter .isValid();
    }



    equals(stroke)
    {
        return stroke
            && this.fills .equals(stroke.fill  )
            && this.weight.equals(stroke.weight)
            && this.fit   .equals(stroke.fit   )
            && this.join  .equals(stroke.join  )
            && this.miter .equals(stroke.miter );
    }



    async eval(parse)
    {
        return this;
    }



    toValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.fills .toString()
            + ' ' + this.weight.toString()
            + ' ' + this.fit   .toString()
            + ' ' + this.join  .toString()
            + ' ' + this.miter .toString();
    }



    toDisplayString()
    {
        return      this.fills .toDisplayString()
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
        new ListValue(),
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN));



    static default = Object.freeze(new StrokeValue(
        new ListValue(),
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

    const fills  = parseListValue  (str, i); i += fills [1];
    const weight = parseNumberValue(str[i]); i += weight[1];
    const fit    = parseNumberValue(str[i]); i += fit   [1];
    const join   = parseNumberValue(str[i]); i += join  [1];
    const miter  = parseNumberValue(str[i]); i += miter [1];


    return [
        new StrokeValue(fills[0], weight[0], fit[0], join[0], miter[0]),
        i - iStart ];
}



// async function evalStrokeValue(value, parse)
// {
//     const stroke = (await value.eval(parse)).copy();

//          if (STROKE_TYPES.includes(stroke.type)) return stroke;
//     else if (  FILL_TYPES.includes(stroke.type)) return new StrokeValue(stroke, value.data.weight);
//     else if ( COLOR_TYPES.includes(stroke.type)) return new StrokeValue(new FillValue(stroke), value.data.weight);

//     else consoleError('stroke must have type');
// }
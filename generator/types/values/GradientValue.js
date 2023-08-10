class GradientValue
extends GValue
{
    stops;
    gradType;
    x;
    y;
    size;
    angle;
    aspect;
    skew;
    blend;



    constructor(stops    = new ListValue(),
                gradType = new NumberValue(0),
                x        = new NumberValue(0),
                y        = new NumberValue(0),
                size     = new NumberValue(0),
                angle    = new NumberValue(0),
                aspect   = new NumberValue(0),
                skew     = new NumberValue(0),
                blend    = new NumberValue(0))
    {
        super(GRADIENT_VALUE);

        this.stops    = stops   .copy();
        this.gradType = gradType.copy();
        this.x        = x       .copy();
        this.y        = y       .copy();
        this.size     = size    .copy();
        this.angle    = angle   .copy();
        this.aspect   = aspect  .copy();
        this.skew     = skew    .copy();
        this.blend    = blend   .copy();

        this.valid = true;
    }


    
    copy()
    {
        const copy = new GradientValue(
            this.stops,
            this.gradType,
            this.x,
            this.y,
            this.size,
            this.angle,
            this.aspect,
            this.skew,
            this.blend);

        copy.copyBase(this);

        return copy;
    }



    isValid()
    {
        return this.stops   .isValid()
            && this.gradType.isValid()
            && this.x       .isValid()
            && this.y       .isValid()
            && this.size    .isValid()
            && this.angle   .isValid()
            && this.aspect  .isValid()
            && this.skew    .isValid()
            && this.blend   .isValid();
    }



    equals(grad)
    {
        return grad
            && this.stops   .equals(grad.stops   )
            && this.gradType.equals(grad.gradType)
            && this.x       .equals(grad.x       )
            && this.y       .equals(grad.y       )
            && this.size    .equals(grad.size    )
            && this.angle   .equals(grad.angle   )
            && this.aspect  .equals(grad.aspect  )
            && this.skew    .equals(grad.skew    )
            && this.blend   .equals(grad.blend   );
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
        return      this.stops   .toString()
            + ' ' + this.gradType.toString()
            + ' ' + this.x       .toString()
            + ' ' + this.y       .toString()
            + ' ' + this.size    .toString()
            + ' ' + this.angle   .toString()
            + ' ' + this.aspect  .toString()
            + ' ' + this.skew    .toString()
            + ' ' + this.blend   .toString();
    }



    toSimpleString()
    {
        return      this.stops   .toSimpleString()
            + ' ' + this.gradType.toSimpleString()
            + ' ' + this.x       .toSimpleString()
            + ' ' + this.y       .toSimpleString()
            + ' ' + this.size    .toSimpleString()
            + ' ' + this.angle   .toSimpleString()
            + ' ' + this.aspect  .toSimpleString()
            + ' ' + this.skew    .toSimpleString()
            + ' ' + this.blend   .toSimpleString();
    }



    toDisplayString()
    {
        return      this.stops   .toDisplayString()
            + ' ' + this.gradType.toDisplayString()
            + ' ' + this.x       .toDisplayString()
            + ' ' + this.y       .toDisplayString()
            + ' ' + this.size    .toDisplayString()
            + ' ' + this.angle   .toDisplayString()
            + ' ' + this.aspect  .toDisplayString()
            + ' ' + this.skew    .toDisplayString()
            + ' ' + this.blend   .toDisplayString();
    }



    getNaN()
    {
        return GradientValue.NaN;
    }



    static NaN = Object.freeze(new GradientValue(
        ListValue  .NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN));



    // static default = Object.freeze(new StrokeValue(
    //     FillValue.create(0, 0, 0, 100),
    //     new NumberValue(1),
    //     new NumberValue(0),
    //     new NumberValue(0),
    //     new NumberValue(28.96)));
}



function parseGradientValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [GradientValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const stops    = parseListValue  (str, i); i += stops   [1];
    const gradType = parseNumberValue(str[i]); i += gradType[1];
    const x        = parseNumberValue(str[i]); i += x       [1];
    const y        = parseNumberValue(str[i]); i += y       [1];
    const size     = parseNumberValue(str[i]); i += size    [1];
    const angle    = parseNumberValue(str[i]); i += angle   [1];
    const aspect   = parseNumberValue(str[i]); i += aspect  [1];
    const skew     = parseNumberValue(str[i]); i += skew    [1];
    const blend    = parseNumberValue(str[i]); i += blend   [1];


    return [
        new GradientValue(stops[0], gradType[0], x[0], y[0], size[0], angle[0], aspect[0], skew[0], blend[0]),
        i - iStart ];
}
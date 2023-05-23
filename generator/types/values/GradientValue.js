class GradientValue
extends GValue
{
    stops;

    gradType;
    x1;
    y1;
    x2;
    y2;
    aspect;
    angle;



    constructor(stops    = new ListValue(),
                gradType = new NumberValue(0),
                x1       = new NumberValue(0),
                y1       = new NumberValue(0),
                x2       = new NumberValue(0),
                y2       = new NumberValue(0),
                aspect   = new NumberValue(0),
                angle    = new NumberValue(0))
    {
        super(GRADIENT_VALUE);

        this.stops    = stops   .copy();
        this.gradType = gradType.copy();
        this.x1       = x1      .copy();
        this.y1       = y1      .copy();
        this.x2       = x2      .copy();
        this.y2       = y2      .copy();
        this.aspect   = aspect  .copy();
        this.angle    = angle   .copy();

        this.valid = true;
    }


    
    copy()
    {
        const copy = new GradientValue(
            this.stops,
            this.gradType,
            this.x1,
            this.y1,
            this.x2,
            this.y2,
            this.aspect,
            this.angle);

        copy.copyBase(this);

        return copy;
    }



    isValid()
    {
        return this.stops   .isValid()
            && this.gradType.isValid()
            && this.x1      .isValid()
            && this.y1      .isValid()
            && this.x2      .isValid()
            && this.y2      .isValid()
            && this.aspect  .isValid()
            && this.angle   .isValid();
    }



    equals(grad)
    {
        return grad
            && this.stops   .equals(grad.stops   )
            && this.gradType.equals(grad.gradType)
            && this.x1      .equals(grad.x1      )
            && this.y1      .equals(grad.y1      )
            && this.x2      .equals(grad.x2      )
            && this.y2      .equals(grad.y2      )
            && this.aspect  .equals(grad.aspect  )
            && this.angle   .equals(grad.angle   );
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
            + ' ' + this.x1      .toString()
            + ' ' + this.y1      .toString()
            + ' ' + this.x2      .toString()
            + ' ' + this.y2      .toString()
            + ' ' + this.aspect  .toString()
            + ' ' + this.angle   .toString();
    }



    toDisplayString()
    {
        return      this.stops   .toDisplayString()
            + ' ' + this.gradType.toDisplayString()
            + ' ' + this.x1      .toDisplayString()
            + ' ' + this.y1      .toDisplayString()
            + ' ' + this.x2      .toDisplayString()
            + ' ' + this.y2      .toDisplayString()
            + ' ' + this.aspect  .toDisplayString()
            + ' ' + this.angle   .toDisplayString();
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
    const x1       = parseNumberValue(str[i]); i += x1      [1];
    const y1       = parseNumberValue(str[i]); i += y1      [1];
    const x2       = parseNumberValue(str[i]); i += x2      [1];
    const y2       = parseNumberValue(str[i]); i += y2      [1];
    const aspect   = parseNumberValue(str[i]); i += aspect  [1];
    const angle    = parseNumberValue(str[i]); i += angle   [1];


    return [
        new GradientValue(stops[0], gradType[0], x1[0], y1[0], x2[0], y2[0], aspect[0], angle[0]),
        i - iStart ];
}
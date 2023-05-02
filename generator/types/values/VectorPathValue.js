class VectorPathValue
extends ShapeValue
{
    points;
    degree;
    winding;
    round;



    constructor(nodeId,
                points  = new NumberValue(0), 
                degree  = new NumberValue(0), 
                winding = new NumberValue(0), 
                round   = new NumberValue(0))
    {
        super(VECTOR_PATH_VALUE, nodeId);

        this.points  = points;
        this.degree  = degree;
        this.winding = winding;
        this.round   = round;
    }



    copy()
    {
        const copy = new VectorPathValue(
            this.nodeId,
            this.points .copy(), 
            this.degree .copy(), 
            this.winding.copy(), 
            this.round  .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(rect)
    {
        return rect
            && this.points .equals(rect.points )
            && this.degree .equals(rect.degree )
            && this.winding.equals(rect.winding)
            && this.round  .equals(rect.round  );
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.points .toString()
            + ' ' + this.degree .toString()
            + ' ' + this.winding.toString()
            + ' ' + this.round  .toString();
    }



    toDisplayString()
    {
        return      this.points .toDisplayString()
            + ' ' + this.degree .toDisplayString()
            + ' ' + this.winding.toDisplayString()
            + ' ' + this.round  .toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return this.points .isValid()
            && this.degree .isValid()
            && this.winding.isValid()
            && this.round  .isValid()
            && super.isValid();
    }


    
    static NaN = new VectorPathValue(
        '',
        ListValue  .NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseVectorPathValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [VectorPathValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const points  = parseListValue  (str, i); i += points [1];
    const degree  = parseNumberValue(str[i]); i += degree [1];
    const winding = parseNumberValue(str[i]); i += winding[1];
    const round   = parseNumberValue(str[i]); i += round  [1];

    const path = new VectorPathValue(
        '', // set node ID elsewhere
        points [0],
        degree [0],
        winding[0],
        round  [0]);


    i = parseShapeBaseValue(str, i, path);

    
    return [path, i - iStart];
}

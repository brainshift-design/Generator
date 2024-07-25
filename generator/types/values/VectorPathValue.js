class VectorPathValue
extends ShapeValue
{
    points;
    closed;
    degree;
    winding;
    round;



    constructor(nodeId,
                points  = new ListValue(), 
                closed  = new NumberValue(0), 
                degree  = new NumberValue(0), 
                winding = new NumberValue(0), 
                round   = new NumberValue(0))
    {
        super(VECTOR_PATH_VALUE, nodeId);

        this.points  = points ?? new ListValue();
        this.closed  = closed;
        this.degree  = degree;
        this.winding = winding;
        this.round   = round;
    }



    static fromObject(obj)
    {
        return new VectorPathValue(
            obj.nodeId,
            new ListValue(obj.points.map(p => PointValue.fromPoint(obj.nodeId, p))), 
            new NumberValue(obj.closed ), 
            new NumberValue(obj.degree ), 
            new NumberValue(obj.winding), 
            new NumberValue(obj.round  ));
    }



    copy()
    {
        const copy = new VectorPathValue(
            this.nodeId,
            this.points .copy(), 
            this.closed .copy(), 
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
            && this.closed .equals(rect.closed )
            && this.degree .equals(rect.degree )
            && this.winding.equals(rect.winding)
            && this.round  .equals(rect.round  );
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      this.points .toString()
            + ' ' + this.closed .toString()
            + ' ' + this.degree .toString()
            + ' ' + this.winding.toString()
            + ' ' + this.round  .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return      this.points .toPreviewString()
            + ' ' + this.closed .toPreviewString()
            + ' ' + this.degree .toPreviewString()
            + ' ' + this.winding.toPreviewString()
            + ' ' + this.round  .toPreviewString();
    }



    toDisplayString()
    {
        return      this.points .toDisplayString()
            + ' ' + this.closed .toDisplayString()
            + ' ' + this.degree .toDisplayString()
            + ' ' + this.winding.toDisplayString()
            + ' ' + this.round  .toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.points .hasInitValue()
            && this.closed .hasInitValue()
            && this.degree .hasInitValue()
            && this.winding.hasInitValue()
            && this.round  .hasInitValue();
    }


    
    isValid()
    {
        return super.isValid()
            && this.points  && this.points .isValid()
            && this.closed  && this.closed .isValid()
            && this.degree  && this.degree .isValid()
            && this.winding && this.winding.isValid()
            && this.round   && this.round  .isValid();
    }


    
    static NaN = new VectorPathValue(
        '',
        ListValue  .NaN,
        NumberValue.NaN,
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
    const closed  = parseNumberValue(str[i]); i += closed [1];
    const degree  = parseNumberValue(str[i]); i += degree [1];
    const winding = parseNumberValue(str[i]); i += winding[1];
    const round   = parseNumberValue(str[i]); i += round  [1];

    const path = new VectorPathValue(
        NULL, // set node ID elsewhere
        points [0],
        closed [0],
        degree [0],
        winding[0],
        round  [0]);


    i = parseShapeBaseValue(str, i, path);

    
    return [path, i - iStart];
}

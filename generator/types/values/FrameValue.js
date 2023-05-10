class FrameValue
extends ShapeValue
{
    x;
    y;
    width;
    height;
    angle;
    round;
    objects;



    constructor(nodeId, x, y, width, height, angle, round, objects)
    {
        super(SHAPE_GROUP_VALUE, nodeId);

        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.angle   = angle;
        this.round   = round;
        this.objects = objects;
    }



    copy()
    {
        const copy = new ShapeGroupValue(
            this.nodeId,
            this.x      .copy(),
            this.y      .copy(),
            this.width  .copy(),
            this.height .copy(),
            this.angle  .copy(),
            this.round  .copy(),
            this.objects.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(group)
    {
        return group
            && this.x      .equals(group.x      )
            && this.y      .equals(group.y      )
            && this.width  .equals(group.width  )
            && this.height .equals(group.height )
            && this.angle  .equals(group.angle  )
            && this.round  .equals(group.round  )
            && this.objects.equals(group.objects);
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.x      .toString()
            + ' ' + this.y      .toString()
            + ' ' + this.width  .toString()
            + ' ' + this.height .toString()
            + ' ' + this.angle  .toString()
            + ' ' + this.round  .toString()
            + ' ' + this.objects.toString();
    }



    toDisplayString()
    {
        return      this.x      .toDisplayString()
            + ' ' + this.y      .toDisplayString()
            + ' ' + this.width  .toDisplayString()
            + ' ' + this.height .toDisplayString()
            + ' ' + this.angle  .toDisplayString()
            + ' ' + this.round  .toDisplayString()
            + ' ' + this.objects.toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return this.x      .isValid()
            && this.y      .isValid()
            && this.width  .isValid()
            && this.height .isValid()
            && this.angle  .isValid()
            && this.round  .isValid()
            && this.objects.isValid()
            && super.isValid();
    }


    
    static NaN = new FrameValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        ListValue  .NaN);
}



function parseFrameValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [FrameValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x       = parseNumberValue(str[i]); i += x      [1];
    const y       = parseNumberValue(str[i]); i += y      [1];
    const width   = parseNumberValue(str[i]); i += width  [1];
    const height  = parseNumberValue(str[i]); i += height [1];
    const angle   = parseNumberValue(str[i]); i += angle  [1];
    const round   = parseNumberValue(str[i]); i += round  [1];
    const objects = parseListValue  (str, i); i += objects[1];

    const frame = new FrameValue(
        '', // set node ID elsewhere
        x      [0],
        y      [0],
        width  [0],
        height [0],
        angle  [0],
        round  [0],
        objects[0]);


    i = parseShapeBaseValue(str, i, frame);

    
    return [frame, i - iStart];
}

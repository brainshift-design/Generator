class FrameValue
extends ShapeValue
{
    x;
    y;
    width;
    height;
    angle;
    round;
    children;



    constructor(nodeId, x, y, width, height, angle, round, children)
    {
        super(FRAME_VALUE, nodeId);

        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.angle    = angle;
        this.round    = round;
        this.children = children;
    }



    copy()
    {
        const copy = new FrameValue(
            this.nodeId,
            this.x       .copy(),
            this.y       .copy(),
            this.width   .copy(),
            this.height  .copy(),
            this.angle   .copy(),
            this.round   .copy(),
            this.children.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(frame)
    {
        return frame
            && this.x       .equals(frame.x       )
            && this.y       .equals(frame.y       )
            && this.width   .equals(frame.width   )
            && this.height  .equals(frame.height  )
            && this.angle   .equals(frame.angle   )
            && this.round   .equals(frame.round   )
            && this.children.equals(frame.children);
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.x       .toString()
            + ' ' + this.y       .toString()
            + ' ' + this.width   .toString()
            + ' ' + this.height  .toString()
            + ' ' + this.angle   .toString()
            + ' ' + this.round   .toString()
            + ' ' + this.children.toString();
    }



    toDisplayString()
    {
        return      this.x       .toDisplayString()
            + ' ' + this.y       .toDisplayString()
            + ' ' + this.width   .toDisplayString()
            + ' ' + this.height  .toDisplayString()
            + ' ' + this.angle   .toDisplayString()
            + ' ' + this.round   .toDisplayString()
            + ' ' + this.children.toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return this.x       .isValid()
            && this.y       .isValid()
            && this.width   .isValid()
            && this.height  .isValid()
            && this.angle   .isValid()
            && this.round   .isValid()
            && this.children.isValid()
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

    const x        = parseNumberValue(str[i]); i += x      [1];
    const y        = parseNumberValue(str[i]); i += y      [1];
    const width    = parseNumberValue(str[i]); i += width  [1];
    const height   = parseNumberValue(str[i]); i += height [1];
    const angle    = parseNumberValue(str[i]); i += angle  [1];
    const round    = parseNumberValue(str[i]); i += round  [1];
    const children = parseListValue  (str, i); i += children[1];

    const frame = new FrameValue(
        '', // set node ID elsewhere
        x       [0],
        y       [0],
        width   [0],
        height  [0],
        angle   [0],
        round   [0],
        children[0]);


    i = parseShapeBaseValue(str, i, frame);

    
    return [frame, i - iStart];
}

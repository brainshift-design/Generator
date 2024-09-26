class FrameValue
extends ShapeValue
{
    children;
    position;
    x;
    y;
    width;
    height;
    round;
    clip;



    constructor(nodeId, children, position, x, y, width, height, round, clip)
    {
        super(FRAME_VALUE, nodeId);

        this.children = children;
        this.position = position;
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.round    = round;
        this.clip     = clip;

        this.objects = 
               children
            && children.objects 
            ? children.objects.map(o => o.copy()) 
            : [];
    }



    copy()
    {
        const copy = new FrameValue(
            this.nodeId,
            this.children.copy(),
            this.position.copy(),
            this.x       .copy(),
            this.y       .copy(),
            this.width   .copy(),
            this.height  .copy(),
            this.round   .copy(),
            this.clip    .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(frame)
    {
        return frame
            && this.children.equals(frame.children)
            && this.position.equals(frame.position)
            && this.x       .equals(frame.x       )
            && this.y       .equals(frame.y       )
            && this.width   .equals(frame.width   )
            && this.height  .equals(frame.height  )
            && this.round   .equals(frame.round   )
            && this.clip    .equals(frame.clip    );
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return       this.children.toString()
             + ' ' + this.position.toString()
             + ' ' + this.x       .toString()
             + ' ' + this.y       .toString()
             + ' ' + this.width   .toString()
             + ' ' + this.height  .toString()
             + ' ' + this.round   .toString()
             + ' ' + this.clip    .toString()
             + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'frame';
            //   this.children.toPreviewString()
            //  + ' ' + this.position.toPreviewString()
            //  + ' ' + this.x       .toPreviewString()
            //  + ' ' + this.y       .toPreviewString()
            //  + ' ' + this.width   .toPreviewString()
            //  + ' ' + this.height  .toPreviewString()
            //  + ' ' + this.round   .toPreviewString()
            //  + ' ' + this.clip    .toPreviewString();
    }



    toDisplayString()
    {
        return       this.children.toDisplayString()
             + ' ' + this.position.toDisplayString()
             + ' ' + this.x       .toDisplayString()
             + ' ' + this.y       .toDisplayString()
             + ' ' + this.width   .toDisplayString()
             + ' ' + this.height  .toDisplayString()
             + ' ' + this.clip    .toDisplayString()
             + ' ' + this.round   .toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.children.isValid()
            && this.position.isValid()
            && this.x       .isValid()
            && this.y       .isValid()
            && this.width   .isValid()
            && this.height  .isValid()
            && this.round   .isValid()
            && this.clip    .isValid();
    }


    
    static NaN()
    {
        return new FrameValue(
            '',
            ListValue  .NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }
}



function parseFrameValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [FrameValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const children = parseListValue  (str, i); i += children[1];
    const position = parseNumberValue(str[i]); i += position[1];
    const x        = parseNumberValue(str[i]); i += x       [1];
    const y        = parseNumberValue(str[i]); i += y       [1];
    const width    = parseNumberValue(str[i]); i += width   [1];
    const height   = parseNumberValue(str[i]); i += height  [1];
    const round    = parseNumberValue(str[i]); i += round   [1];
    const clip     = parseNumberValue(str[i]); i += clip    [1];

    const frame = new FrameValue(
        '', // set node ID elsewhere
        children[0],
        position[0],
        x       [0],
        y       [0],
        width   [0],
        height  [0],
        round   [0],
        clip    [0]);


    i = parseShapeBaseValue(str, i, frame);

    
    return [frame, i - iStart];
}

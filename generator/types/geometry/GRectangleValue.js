class GRectangleValue
extends GGeometryValueBase
{
    x;
    y;
    width;
    height;
    angle;
    round;



    constructor(nodeId,
                x      = new GNumberValue(0), 
                y      = new GNumberValue(0), 
                width  = new GNumberValue(0), 
                height = new GNumberValue(0), 
                angle  = new GNumberValue(0), 
                round  = new GNumberValue(0))
    {
        super(RECTANGLE_VALUE, nodeId);

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.round  = round;

        this.result = this;
        this.valid  = true;
    }



    copy()
    {
        const rect = new GRectangleValue(
            this.nodeId,
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.angle .copy(), 
            this.round .copy());

        rect.copyBase(this);

        return rect;
    }



    isValid()
    {
        return super.isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.angle .isValid()
            && this.round .isValid();
    }



    eval(parse)
    {
        return this.result = this.copy();
    }



    toFigmaObject()
    {
        return {
            type:   RECTANGLE,
            id:     0,
            x:      this.x     .value,
            y:      this.y     .value,
            width:  this.width .value,
            height: this.height.value,
            angle:  this.angle .value,
            round:  Math.max(0, this.round.value),
            ...super.toFigmaObject()
        };
    }



    toString()
    {
        return this.isValid()
            ?         this.x     .toString()
              + ' ' + this.y     .toString()
              + ' ' + this.width .toString()
              + ' ' + this.height.toString()
              + ' ' + this.angle .toString()
              + ' ' + this.round .toString()
              + ' ' + super.toString()
            : INVALID;
    }



    static NaN = new GRectangleValue(
        '',
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN,
        GNumberValue.NaN);
}



function parseGRectangleValue(str)
{
    if (str == INVALID)
        return GRectangleValue.NaN;

    const rect = str.split(' ');

    return new GRectangleValue(
        '', // set node ID elsewhere
        new GNumberValue(parseGNumberValue(rect[0])),
        new GNumberValue(parseGNumberValue(rect[1])),
        new GNumberValue(parseGNumberValue(rect[2])),
        new GNumberValue(parseGNumberValue(rect[3])),
        new GNumberValue(parseGNumberValue(rect[4])),
        new GNumberValue(parseGNumberValue(rect[5])));
}

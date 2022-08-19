class GRectangleValue
extends GGeometryBaseValue
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
            && this.round .isValid()
            && super.isValid();
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
        return [GRectangleValue.NaN, 1];

    const _rect = str.split(' ');


    let i = 0;

    const x      = parseGNumberValue(fill[i]); i += x     [1];
    const y      = parseGNumberValue(fill[i]); i += y     [1];
    const width  = parseGNumberValue(fill[i]); i += width [1];
    const height = parseGNumberValue(fill[i]); i += height[1];
    const angle  = parseGNumberValue(fill[i]); i += angle [1];
    const round  = parseGNumberValue(fill[i]); i += round [1];


    const rect = new GRectangleValue(
        '', // set node ID elsewhere
        x     [0],
        y     [0],
        width [0],
        height[0],
        angle [0],
        round [0]);


    i = parseGGeometryBaseValue(_rect, i, rect);

    
    return [rect, i];
}

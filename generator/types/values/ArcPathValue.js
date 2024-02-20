class ArcPathValue
extends ShapeValue
{
    position;
    x;
    y;
    width;
    height;
    start;
    sweep;



    constructor(nodeId,
                position = new NumberValue(0),
                x        = new NumberValue(0), 
                y        = new NumberValue(0), 
                width    = new NumberValue(0), 
                height   = new NumberValue(0), 
                start    = new NumberValue(0),
                sweep    = new NumberValue(0))
    {
        super(ARC_PATH_VALUE, nodeId);

        this.position = position;
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.start    = start;
        this.sweep    = sweep;
    }



    copy()
    {
        const copy = new ArcPathValue(
            this.nodeId,
            this.position.copy(), 
            this.x       .copy(), 
            this.y       .copy(), 
            this.width   .copy(), 
            this.height  .copy(), 
            this.start   .copy(),
            this.sweep   .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(arc)
    {
        return arc
            && this.position.equals(arc.position)
            && this.x       .equals(arc.x       )
            && this.y       .equals(arc.y       )
            && this.width   .equals(arc.width   )
            && this.height  .equals(arc.height  )
            && this.start   .equals(arc.start   )
            && this.sweep   .equals(arc.sweep   );
    }



    async eval(parse)
    {
        return this.copy();
    }
    
    
    
    hasInitValue()
    {
        return super.hasInitValue()
            && this.position.hasInitValue()
            && this.x       .hasInitValue()
            && this.y       .hasInitValue()
            && this.width   .hasInitValue()
            && this.height  .hasInitValue()
            && this.start   .hasInitValue()
            && this.sweep   .hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.position.isValid()
            && this.x       .isValid()
            && this.y       .isValid()
            && this.width   .isValid()
            && this.height  .isValid()
            && this.start   .isValid()
            && this.sweep   .isValid();
    }



    toValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.position.toString()
            + ' ' + this.x       .toString()
            + ' ' + this.y       .toString()
            + ' ' + this.width   .toString()
            + ' ' + this.height  .toString()
            + ' ' + this.start   .toString()
            + ' ' + this.sweep   .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'arc';
            // + ' ' + this.position.toPreviewString()
            // + ' ' + this.x       .toPreviewString()
            // + ' ' + this.y       .toPreviewString()
            // + ' ' + this.width   .toPreviewString()
            // + ' ' + this.height  .toPreviewString()
            // + ' ' + this.start   .toPreviewString() + '°'
            // + ' ' + this.sweep   .toPreviewString() + '°';
    }



    toDisplayString()
    {
        return      this.position.toDisplayString()
            + ' ' + this.x       .toDisplayString()
            + ' ' + this.y       .toDisplayString()
            + ' ' + this.width   .toDisplayString()
            + ' ' + this.height  .toDisplayString()
            + ' ' + this.start   .toDisplayString()
            + ' ' + this.sweep   .toDisplayString();
    }



    static NaN = new ArcPathValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseArcPathValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [ArcPathValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const pos    = parseNumberValue(str[i]); i += pos   [1];
    const x      = parseNumberValue(str[i]); i += x     [1];
    const y      = parseNumberValue(str[i]); i += y     [1];
    const width  = parseNumberValue(str[i]); i += width [1];
    const height = parseNumberValue(str[i]); i += height[1];
    const start  = parseNumberValue(str[i]); i += start [1];
    const sweep  = parseNumberValue(str[i]); i += sweep [1];


    const arc = new ArcPathValue(
        '', // set node ID elsewhere,
        pos   [0],
        x     [0],
        y     [0],
        width [0],
        height[0],
        start [0],
        sweep [0]);


    i = parseShapeBaseValue(str, i, arc);

    
    return [arc, i - iStart];
}

class TextShapeValue
extends ShapeValue
{
    text;
    x;
    y;
    width;
    height;
    angle;
    font;
    size;



    constructor(nodeId,
                text   = new TextValue(),
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                angle  = new NumberValue(0),
                font   = new NumberValue(0),
                size   = new NumberValue(0))
    {
        super(TEXTSHAPE_VALUE, nodeId);

        this.text   = text;
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.angle  = angle;
        this.font   = font;
        this.size   = size;
    }



    copy()
    {
        const copy = new RectangleValue(
            this.nodeId,
            this.text  .copy(),
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.angle .copy(),
            this.font  .copy(),
            this.size  .copy()); 

        copy.copyBase(this);

        return copy;
    }



    equals(text)
    {
        return text
            && this.text  .equals(text.text  )
            && this.x     .equals(text.x     )
            && this.y     .equals(text.y     )
            && this.width .equals(text.width )
            && this.height.equals(text.height)
            && this.angle .equals(text.angle )
            && this.font  .equals(text.font  )
            && this.size  .equals(text.size  );
    }



    async eval(parse)
    {
        return this;
    }



    isValid()
    {
        return this.text  .isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.angle .isValid()
            && this.font  .isValid()
            && this.size  .isValid()
            && super.isValid();
    }


    
    toValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.text  .toString()
            + ' ' + this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.width .toString()
            + ' ' + this.height.toString()
            + ' ' + this.angle .toString()
            + ' ' + this.font  .toString()
            + ' ' + this.size  .toString();
    }



    toDisplayString()
    {
        return      this.text  .toDisplayString()
            + ' ' + this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.height.toDisplayString()
            + ' ' + this.angle .toDisplayString()
            + ' ' + this.font  .toDisplayString()
            + ' ' + this.size  .toDisplayString();
    }



    static NaN = new TextShapeValue(
        '',
        TextValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
}



function parseTextShapeValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [TextShapeValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const text   = parseTextValue  (str[i]); i += text  [1];
    const x      = parseNumberValue(str[i]); i += x     [1];
    const y      = parseNumberValue(str[i]); i += y     [1];
    const width  = parseNumberValue(str[i]); i += width [1];
    const height = parseNumberValue(str[i]); i += height[1];
    const angle  = parseNumberValue(str[i]); i += angle [1];
    const font   = parseNumberValue(str[i]); i += font  [1];
    const size   = parseNumberValue(str[i]); i += size  [1];


    const txts = new TextShapeValue(
        '', // set node ID elsewhere
        text  [0],
        x     [0],
        y     [0],
        width [0],
        height[0],
        angle [0]);


    i = parseShapeBaseValue(str, i, txts);

    
    return [txts, i - iStart];
}

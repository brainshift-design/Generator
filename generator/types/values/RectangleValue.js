class RectangleValue
extends ShapeValue
{
    x;
    y;
    width;
    height;
    round;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0), 
                height = new NumberValue(0), 
                round  = new NumberValue(0))
    {
        super(RECTANGLE_VALUE, nodeId, 'rectangle');

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.round  = round;
    }



    static fromObject(obj)
    {
        return new RectangleValue(
            obj.nodeId,
            new NumberValue(obj.x     ), 
            new NumberValue(obj.y     ), 
            new NumberValue(obj.width ), 
            new NumberValue(obj.height), 
            new NumberValue(obj.round ));
    }



    copy()
    {
        const copy = new RectangleValue(
            this.nodeId,
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.round .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(rect)
    {
        return rect
            && this.x     .equals(rect.x     )
            && this.y     .equals(rect.y     )
            && this.width .equals(rect.width )
            && this.height.equals(rect.height)
            && this.round .equals(rect.round );
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.width .toString()
            + ' ' + this.height.toString()
            + ' ' + this.round .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'rectangle';
            // + ' ' + this.x     .toPreviewString()
            // + ' ' + this.y     .toPreviewString()
            // + ' ' + this.width .toPreviewString()
            // + ' ' + this.height.toPreviewString()
            // + ' ' + this.round .toPreviewString();
    }



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.height.toDisplayString()
            + ' ' + this.round .toDisplayString();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        let json = '';

        
        if (options.named)
            json += '\n' + TAB(options.tab);


        json += '{\n';
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += TAB(options.tab) + '"x": '      + this.x     .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"y": '      + this.y     .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"width": '  + this.width .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"height": ' + this.height.toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"round": '  + this.round .toJsonText(options) + ',\n';


        json += this.toBaseJsonText(options);


        options.named = oldNamed;

        options.tab--;
        json += TAB(options.tab) + '}';


        return json;
    }



    toNewValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.x     .hasInitValue()
            && this.y     .hasInitValue()
            && this.width .hasInitValue()
            && this.height.hasInitValue()
            && this.round .hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.round .isValid();
    }


    
    static NaN()
    {
        return new RectangleValue(
            '',
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }
}



function parseRectangleValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [RectangleValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x      = NumberValue.parse(str[i]); i += x     [1];
    const y      = NumberValue.parse(str[i]); i += y     [1];
    const width  = NumberValue.parse(str[i]); i += width [1];
    const height = NumberValue.parse(str[i]); i += height[1];
    const round  = NumberValue.parse(str[i]); i += round [1];


    const rect = new RectangleValue(
        '', // set node ID elsewhere
        x     [0],
        y     [0],
        width [0],
        height[0],
        round [0]);


    i = parseShapeBaseValue(str, i, rect);

    
    return [rect, i - iStart];
}

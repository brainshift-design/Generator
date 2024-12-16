class StarValue
extends ShapeValue
{
    position;
    x;
    y;
    width;
    height;
    round;
    points;
    convex;



    constructor(nodeId,
                position = new NumberValue(0), 
                x        = new NumberValue(0), 
                y        = new NumberValue(0), 
                width    = new NumberValue(0), 
                height   = new NumberValue(0), 
                round    = new NumberValue(0), 
                points   = new NumberValue(0),
                convex   = new NumberValue(0))
    {
        super(STAR_VALUE, nodeId, 'star');

        this.position = position;
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.round    = round;
        this.points   = points;
        this.convex   = convex;
    }



    static fromObject(obj)
    {
        return new StarValue(
            obj.nodeId,
            new NumberValue(obj.position), 
            new NumberValue(obj.x       ), 
            new NumberValue(obj.y       ), 
            new NumberValue(obj.width   ), 
            new NumberValue(obj.height  ), 
            new NumberValue(obj.round   ),
            new NumberValue(obj.points  ),
            new NumberValue(obj.convex  ));
    }



    copy()
    {
        const copy = new StarValue(
            this.nodeId,
            this.position.copy(), 
            this.x       .copy(), 
            this.y       .copy(), 
            this.width   .copy(), 
            this.height  .copy(), 
            this.round   .copy(), 
            this.points  .copy(),
            this.convex  .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(star)
    {
        return star
            && this.position.equals(star.position)
            && this.x       .equals(star.x       )
            && this.y       .equals(star.y       )
            && this.width   .equals(star.width   )
            && this.height  .equals(star.height  )
            && this.round   .equals(star.round   )
            && this.points  .equals(star.points  )
            && this.convex  .equals(star.convex  );
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
            && this.round   .hasInitValue()
            && this.points  .hasInitValue()
            && this.convex  .hasInitValue();
    }


    
    isValid()
    {
        return super.isValid()
            && this.position.isValid()
            && this.x       .isValid()
            && this.y       .isValid()
            && this.width   .isValid()
            && this.height  .isValid()
            && this.round   .isValid()
            && this.points  .isValid()
            && this.convex  .isValid();
    }


    
    toNewValue()
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
            + ' ' + this.round   .toString()
            + ' ' + this.points  .toString()
            + ' ' + this.convex  .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return      this.position.toPreviewString()
            + ' ' + this.x       .toPreviewString()
            + ' ' + this.y       .toPreviewString()
            + ' ' + this.width   .toPreviewString()
            + ' ' + this.height  .toPreviewString()
            + ' ' + this.round   .toPreviewString()
            + ' ' + this.points  .toPreviewString()
            + ' ' + this.convex  .toPreviewString();
    }



    toDisplayString()
    {
        return      this.position.toDisplayString()
            + ' ' + this.x       .toDisplayString()
            + ' ' + this.y       .toDisplayString()
            + ' ' + this.width   .toDisplayString()
            + ' ' + this.height  .toDisplayString()
            + ' ' + this.round   .toDisplayString()
            + ' ' + this.points  .toDisplayString()
            + ' ' + this.convex  .toDisplayString();
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


        json += TAB(options.tab) + '"position": "' + EllipsePositions[this.position.value] + '",\n';
        json += TAB(options.tab) + '"x": '         + this.x     .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"y": '         + this.y     .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"width": '     + this.width .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"height": '    + this.height.toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"round": '     + this.round .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"points": '    + this.points.toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"convex": '    + this.convex.toJsonText(options) + ',\n';


        json += this.toBaseJsonText(options);


        options.named = oldNamed;

        options.tab--;
        json += TAB(options.tab) + '}';


        return json;
    }



    static NaN()
    {
        return new StarValue(
            '',
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }
}



function parseStarValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [StarValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const pos    = NumberValue.parse(str[i]); i += pos   [1];
    const x      = NumberValue.parse(str[i]); i += x     [1];
    const y      = NumberValue.parse(str[i]); i += y     [1];
    const width  = NumberValue.parse(str[i]); i += width [1];
    const height = NumberValue.parse(str[i]); i += height[1];
    const round  = NumberValue.parse(str[i]); i += round [1];
    const points = NumberValue.parse(str[i]); i += points[1];
    const convex = NumberValue.parse(str[i]); i += convex[1];


    const star = new StarValue(
        '', // set node ID elsewhere
        pos   [0],
        x     [0],
        y     [0],
        width [0],
        height[0],
        round [0],
        points[0],
        convex[0]);


    i = parseShapeBaseValue(str, i, star);

    
    return [star, i - iStart];
}

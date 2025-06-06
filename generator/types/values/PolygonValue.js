class PolygonValue
extends ShapeValue
{
    position;
    x;
    y;
    width;
    height;
    round;
    corners;



    constructor(nodeId,
                position = new NumberValue(0),
                x        = new NumberValue(0), 
                y        = new NumberValue(0), 
                width    = new NumberValue(0), 
                height   = new NumberValue(0), 
                round    = new NumberValue(0), 
                corners  = new NumberValue(0))
    {
        super(POLYGON_VALUE, nodeId, 'polygon');

        this.position = position;
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.round    = round;
        this.corners  = corners;
    }



    static fromObject(obj)
    {
        return new PolygonValue(
            obj.nodeId,
            new NumberValue(obj.position), 
            new NumberValue(obj.x       ), 
            new NumberValue(obj.y       ), 
            new NumberValue(obj.width   ), 
            new NumberValue(obj.height  ), 
            new NumberValue(obj.round   ),
            new NumberValue(obj.corners ));
    }



    copy()
    {
        const copy = new PolygonValue(
            this.nodeId,
            this.position.copy(), 
            this.x       .copy(), 
            this.y       .copy(), 
            this.width   .copy(), 
            this.height  .copy(), 
            this.round   .copy(), 
            this.corners .copy());
    
        copy.copyBase(this);

        return copy;
    }



    equals(poly)
    {
        return poly
            && this.position.equals(poly.position)
            && this.x       .equals(poly.x       )
            && this.y       .equals(poly.y       )
            && this.width   .equals(poly.width   )
            && this.height  .equals(poly.height  )
            && this.round   .equals(poly.round   )
            && this.corners .equals(poly.corners );
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
            && this.corners .hasInitValue();
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
            && this.corners .isValid();
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
            + ' ' + this.corners .toString()
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
            + ' ' + this.corners .toPreviewString();
    }



    toDisplayString()
    {
        return      this.position.toDisplayString()
            + ' ' + this.x       .toDisplayString()
            + ' ' + this.y       .toDisplayString()
            + ' ' + this.width   .toDisplayString()
            + ' ' + this.height  .toDisplayString()
            + ' ' + this.round   .toDisplayString()
            + ' ' + this.corners .toDisplayString();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const { SL, SL_, WSL } = getWhiteSpaceForJson(options);


        let json = '';

        
        if (options.named)
            json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += WSL(TAB(options.tab)) + '"position": "' + EllipsePositions[this.position.value] + '",' + SL('\n');
        json += SL_(TAB(options.tab)) + '"x": '         + this.x      .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"y": '         + this.y      .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"width": '     + this.width  .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"height": '    + this.height .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"round": '     + this.round  .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"corners": '   + this.corners.toJsonText(options) + ',' + SL('\n');


        json += this.toBaseJsonText(options);


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    static NaN()
    {
        return new PolygonValue(
            '',
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }
    
    
    
    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [PolygonValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const pos     = NumberValue.parse(str[i]); i += pos    [1];
        const x       = NumberValue.parse(str[i]); i += x      [1];
        const y       = NumberValue.parse(str[i]); i += y      [1];
        const width   = NumberValue.parse(str[i]); i += width  [1];
        const height  = NumberValue.parse(str[i]); i += height [1];
        const round   = NumberValue.parse(str[i]); i += round  [1];
        const corners = NumberValue.parse(str[i]); i += corners[1];
    
    
        const poly = new PolygonValue(
            '', // set node ID elsewhere
            pos    [0],
            x      [0],
            y      [0],
            width  [0],
            height [0],
            round  [0],
            corners[0]);
    
    
        i = ShapeValue.parse(str, i, poly);
    
        
        return [poly, i - iStart];
    }
}

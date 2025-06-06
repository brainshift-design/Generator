class LineValue
extends ShapeValue
{
    x;
    y;
    width;



    constructor(nodeId,
                x      = new NumberValue(0), 
                y      = new NumberValue(0), 
                width  = new NumberValue(0))
    {
        super(LINE_VALUE, nodeId, 'line');

        this.x     = x;
        this.y     = y;
        this.width = width;
    }



    static fromObject(obj)
    {
        return new LineValue(
            obj.nodeId,
            new NumberValue(obj.x    ), 
            new NumberValue(obj.y    ), 
            new NumberValue(obj.width));
    }



    copy()
    {
        const copy = new LineValue(
            this.nodeId,
            this.x    .copy(), 
            this.y    .copy(), 
            this.width.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(line)
    {
        return line
            && this.x    .equals(line.x    )
            && this.y    .equals(line.y    )
            && this.width.equals(line.width);
    }



    async eval(parse)
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.x     .hasInitValue()
            && this.y     .hasInitValue()
            && this.width .hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.x    .isValid()
            && this.y    .isValid()
            && this.width.isValid();
    }



    toNewValue()
    {
        return this.copy();
    }



    toString()
    {
        return      this.x    .toString()
            + ' ' + this.y    .toString()
            + ' ' + this.width.toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return      this.x    .toPreviewString()
            + ' ' + this.y    .toPreviewString()
            + ' ' + this.width.toPreviewString();
    }



    toDisplayString()
    {
        return      this.x    .toDisplayString()
            + ' ' + this.y    .toDisplayString()
            + ' ' + this.width.toDisplayString();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const { WS, SL, SL_, WSL } = getWhiteSpaceForJson(options);


        let json = '';

        
        if (options.named)
            json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += WSL(TAB(options.tab)) + '"x": '      + this.x     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"y": '      + this.y     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"width": '  + this.width .toJsonText(options) + ',' + SL('\n');


        json += this.toBaseJsonText(options);


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    static NaN()
    {
        return new LineValue(
            '',
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN());
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LineValue.NaN(), 1];


        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }


        const iStart = i;

        const x     = NumberValue.parse(str[i]); i += x    [1];
        const y     = NumberValue.parse(str[i]); i += y    [1];
        const width = NumberValue.parse(str[i]); i += width[1];


        const line = new LineValue(
            '', // set node ID elsewhere
            x    [0],
            y    [0],
            width[0]);


        i = ShapeValue.parse(str, i, line);

        
        return [line, i - iStart];
    }
}
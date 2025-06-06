class EllipseValue
extends ShapeValue
{
    position;
    x;
    y;
    width;
    height;
    round;
    start;
    sweep;
    inner;



    constructor(nodeId,
                position = new NumberValue(0),
                x        = new NumberValue(0), 
                y        = new NumberValue(0), 
                width    = new NumberValue(0), 
                height   = new NumberValue(0), 
                round    = new NumberValue(0), 
                start    = new NumberValue(0),
                sweep    = new NumberValue(0),
                inner    = new NumberValue(0))
    {
        super(ELLIPSE_VALUE, nodeId, 'ellipse');

        this.position = position;
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.round    = round;
        this.start    = start;
        this.sweep    = sweep;
        this.inner    = inner;
    }



    static fromObject(obj)
    {
        return new EllipseValue(
            obj.nodeId,
            new NumberValue(obj.position), 
            new NumberValue(obj.x       ), 
            new NumberValue(obj.y       ), 
            new NumberValue(obj.width   ), 
            new NumberValue(obj.height  ), 
            new NumberValue(obj.round   ),
            new NumberValue(obj.start   ),
            new NumberValue(obj.sweep   ),
            new NumberValue(obj.inner   ));
    }



    copy()
    {
        const copy = new EllipseValue(
            this.nodeId,
            this.position.copy(), 
            this.x       .copy(), 
            this.y       .copy(), 
            this.width   .copy(), 
            this.height  .copy(), 
            this.round   .copy(), 
            this.start   .copy(),
            this.sweep   .copy(),
            this.inner   .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(ellipse)
    {
        return ellipse
            && this.position.equals(ellipse.position)
            && this.x       .equals(ellipse.x       )
            && this.y       .equals(ellipse.y       )
            && this.width   .equals(ellipse.width   )
            && this.height  .equals(ellipse.height  )
            && this.round   .equals(ellipse.round   )
            && this.start   .equals(ellipse.start   )
            && this.sweep   .equals(ellipse.sweep   )
            && this.inner   .equals(ellipse.inner   );
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
            && this.start   .hasInitValue()
            && this.sweep   .hasInitValue()
            && this.inner   .hasInitValue();
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
            && this.start   .isValid()
            && this.sweep   .isValid()
            && this.inner   .isValid();
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
            + ' ' + this.start   .toString()
            + ' ' + this.sweep   .toString()
            + ' ' + this.inner   .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'ellipse';
            // + ' ' + this.position.toPreviewString()
            // + ' ' + this.x       .toPreviewString()
            // + ' ' + this.y       .toPreviewString()
            // + ' ' + this.width   .toPreviewString()
            // + ' ' + this.height  .toPreviewString()
            // + ' ' + this.round   .toPreviewString()
            // + ' ' + this.inner   .toPreviewString() + '%'
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
            + ' ' + this.round   .toDisplayString()
            + ' ' + this.start   .toDisplayString()
            + ' ' + this.sweep   .toDisplayString()
            + ' ' + this.inner   .toDisplayString();
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


        json += WSL(TAB(options.tab)) + '"x": '      + this.x     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"y": '      + this.y     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"width": '  + this.width .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"height": ' + this.height.toJsonText(options) + ',' + SL('\n');


        json += this.toBaseJsonText(options);


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        return json;
    }



    static NaN()
    {
        return new EllipseValue(
            '',
            NumberValue.NaN(),
            NumberValue.NaN(),
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
            return [EllipseValue.NaN(), 1];


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
        const start  = NumberValue.parse(str[i]); i += start [1];
        const sweep  = NumberValue.parse(str[i]); i += sweep [1];
        const inner  = NumberValue.parse(str[i]); i += inner [1];


        const ellipse = new EllipseValue(
            '', // set node ID elsewhere,
            pos   [0],
            x     [0],
            y     [0],
            width [0],
            height[0],
            round [0],
            start [0],
            sweep [0],
            inner [0]);


        i = ShapeValue.parse(str, i, ellipse);

        
        return [ellipse, i - iStart];
    }
}
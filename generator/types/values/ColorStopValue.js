class ColorStopValue
extends GValue
{
    static { GNode.types[COLOR_STOP_VALUE] = this; }



    fill;
    position;



    constructor(fill     = FillValue  .NaN(), 
                position = NumberValue.NaN())
    {
        if (fill.type != FILL_VALUE)
            consoleError('fill.type is ' + fill.type + ', must be FILL_VALUE');


        super(COLOR_STOP_VALUE, 'colorStop');

        this.fill     = fill    .copy();
        this.position = position.copy();

        this.valid    = true;
    }


    
    copy()
    {
        const copy = new ColorStopValue(
            this.fill    .copy(),
            this.position.copy());

        copy.copyBase(this);

        return copy;
    }



    isValid()
    {
        return this.fill    .isValid()
            && this.position.isValid();
    }



    equals(stop)
    {
        return stop
            && this.fill    .equals(stop.fill    )
            && this.position.equals(stop.position);
    }



    async eval(parse)
    {
        return this;
    }



    toNewValue()
    {
        return this.copy();
    }



    toRgba()
    {
        return this.fill.toRgba();
    }



    toString()
    {
        return      this.fill    .toString()
            + ' ' + this.position.toString();
    }



    toPreviewString()
    {
        return      this.fill    .toPreviewString()
            + ' ' + this.position.toPreviewString();
    }



    toDisplayString()
    {
        return      this.fill    .toDisplayString()
            + ' ' + this.position.toDisplayString();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const WS = s => options.whiteSpace ? s : '';


        let json = '';

        
        if (options.named)
            json += '\n' + TAB(options.tab);


        json += '{\n';
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += TAB(options.tab) + '"fill": '     + this.fill    .toJsonText(options) + ',\n';
        json += WS('\n');
        json += TAB(options.tab) + '"position": ' + this.position.toJsonText(options) + '\n';


        options.named = oldNamed;

        options.tab--;
        json += TAB(options.tab) + '}';


        options.lastExpanded = true;

        return json;
    }



    static NaN()
    {
        return new ColorStopValue(
            FillValue  .NaN(),
            NumberValue.NaN());
    }



    static parseRequest(parse)
    {
        parse.pos++; // COLOR_STOP_VALUE
    
        const stop = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(COLOR_STOP_VALUE, stop, parse);
    
        return ColorStopValue.parse(stop)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [ColorStopValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const fill     = FillValue.parse  (str, i); i += fill    [1];
        const position = NumberValue.parse(str[i]); i += position[1];
    
    
        return [
            new ColorStopValue(fill[0], position[0]),
            i - iStart ];
    }
}
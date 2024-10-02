class StrokeValue
extends GValue
{
    fills;
    weight;
    fit;
    join;
    miter;
    cap;
    dashes;



    constructor(fills  = new ListValue(), 
                weight = new NumberValue(1),
                fit    = new NumberValue(0),
                join   = new NumberValue(0),
                miter  = new NumberValue(28.96, 2),
                cap    = new NumberValue(0),
                dashes = new TextValue())
    {
        if (fills.type != LIST_VALUE)
            consoleError('fill.type is ' + fills.type + ', must be LIST_VALUE');


        super(STROKE_VALUE, 'stroke');

        this.fills  = fills .copy();
        this.weight = weight.copy();
        this.fit    = fit   .copy();
        this.join   = join  .copy();
        this.miter  = miter .copy();
        this.cap    = cap   .copy();
        this.dashes = dashes.copy();

        this.valid  = true;
    }


    
    copy()
    {
        const copy = new StrokeValue(
            this.fills .copy(),
            this.weight.copy(),
            this.fit   .copy(),
            this.join  .copy(),
            this.miter .copy(),
            this.cap   .copy(),
            this.dashes.copy());

        copy.copyBase(this);

        return copy;
    }



    hasInitValue()
    {
        return this.fills .hasInitValue()
            && this.weight.hasInitValue()
            && this.fit   .hasInitValue()
            && this.join  .hasInitValue()
            && this.miter .hasInitValue()
            && this.cap   .hasInitValue()
            && this.dashes.hasInitValue();
    }



    isValid()
    {
        return this.fills .isValid()
            && this.weight.isValid()
            && this.fit   .isValid()
            && this.join  .isValid()
            && this.miter .isValid()
            && this.cap   .isValid()
            && this.dashes.isValid();
    }



    equals(stroke)
    {
        return stroke
            && this.fills .equals(stroke.fill  )
            && this.weight.equals(stroke.weight)
            && this.fit   .equals(stroke.fit   )
            && this.join  .equals(stroke.join  )
            && this.miter .equals(stroke.miter )
            && this.cap   .equals(stroke.cap   )
            && this.dashes.equals(stroke.dashes);
    }



    async eval(parse)
    {
        return this.copy();
    }



    toValue()
    {
        return this.copy();
    }



    toRgba()
    {
        return this.fills
            && this.fills.items.length > 0
             ? rgbaLerp(
                 this.fills.items[0]    .toRgba(),
                 this.fills.items.at(-1).toRgba(),
                 0.5)
             : rgba_NaN;
    }



    toString()
    {
        return      this.fills .toString()
            + ' ' + this.weight.toString()
            + ' ' + this.fit   .toString()
            + ' ' + this.join  .toString()
            + ' ' + this.miter .toString()
            + ' ' + this.cap   .toString()
            + ' ' + this.dashes.toString();
    }



    toPreviewString()
    {
        return      this.fills .toPreviewString()
            + ' ' + this.weight.toPreviewString()
            + ' ' + this.fit   .toPreviewString()
            + ' ' + this.join  .toPreviewString()
            + ' ' + this.miter .toPreviewString()
            + ' ' + this.cap   .toPreviewString()
            + ' ' + this.dashes.toPreviewString();
    }



    toDisplayString()
    {
        return      this.fills .toDisplayString()
            + ' ' + this.weight.toDisplayString()
            + ' ' + this.fit   .toDisplayString()
            + ' ' + this.join  .toDisplayString()
            + ' ' + this.miter .toDisplayString()
            + ' ' + this.cap   .toDisplayString()
            + ' ' + this.dashes.toDisplayString();
    }



    toJsonText(options = {})
    {
        const WS = s => 
               options.whiteSpace 
            && options.lastExpanded
                ? s 
                : '';


        let json = '';

        
        if (options.named)
            json += '\n' + TAB(options.tab);


        json += '{\n';
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += TAB(options.tab) + '"fills": '   + this.fills  .toJsonText(options) + ',\n';
        json += WS('\n');
        json += TAB(options.tab) + '"weight": ' + this.weight.toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"align": "' + StrokeAlign[this.fit .value]    + '",\n';
        json += TAB(options.tab) + '"join": "'  + StrokeJoin [this.join.value]    + '",\n';
        json += TAB(options.tab) + '"miter": '  + this.miter .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"cap": "'   + StrokeCap[this.cap.value]       + '",\n';
        json += TAB(options.tab) + '"dashes": ' + this.dashes.toJsonText(options) + '\n';


        options.named = oldNamed;

        options.tab--;
        json += TAB(options.tab) + '}';


        options.lastExpanded = true;

        return json;
    }



    static NaN()
    {
        return new StrokeValue(
         new ListValue(),
         NumberValue.NaN(),
         NumberValue.NaN(),
         NumberValue.NaN(),
         NumberValue.NaN(),
         NumberValue.NaN(),
         new TextValue());
    }



    static default = Object.freeze(new StrokeValue(
        new ListValue(),
        new NumberValue(1),
        new NumberValue(0),
        new NumberValue(0),
        new NumberValue(28.96),
        new NumberValue(0),
        new TextValue()));
}



function parseStrokeValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [StrokeValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const fills  = parseListValue  (str, i); i += fills [1];
    const weight = parseNumberValue(str[i]); i += weight[1];
    const fit    = parseNumberValue(str[i]); i += fit   [1];
    const join   = parseNumberValue(str[i]); i += join  [1];
    const miter  = parseNumberValue(str[i]); i += miter [1];
    const cap    = parseNumberValue(str[i]); i += cap   [1];
    const dashes = parseTextValue  (str[i]); i += dashes[1];

    return [

        new StrokeValue(
            fills [0], 
            weight[0], 
            fit   [0], 
            join  [0], 
            miter [0], 
            cap   [0], 
            dashes[0]),
        
        i - iStart ];
}

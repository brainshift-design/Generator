class DropShadowValue
extends GValue
{
    x;
    y;
    blur;
    spread;
    fill;
    blend;
    behind;
    visible;



    constructor(x       = new NumberValue(0), 
                y       = new NumberValue(0), 
                blur    = new NumberValue(0), 
                spread  = new NumberValue(0), 
                fill    = FillValue.NaN(),
                blend   = new NumberValue(0),
                behind  = new NumberValue(0),
                visible = true)
    {
        super(DROP_SHADOW_VALUE, 'dropShadow');

        this.x       = x;
        this.y       = y;
        this.blur    = blur;
        this.spread  = spread;
        this.fill    = fill;
        this.blend   = blend;
        this.behind  = behind;
        this.visible = visible;
        
        consoleAssert(fill.type == FILL_VALUE, 'fill.type must be FILL_VALUE');
    }


    
    // static create(x, y, blur, spread, fill, blend, behind)
    // {
    //     return new FillValue(
    //         new Number,
    //         new NumberValue(opacity));
    // }



    copy()
    {
        const copy = new DropShadowValue(
            this.x     .copy(),
            this.y     .copy(),
            this.blur  .copy(),
            this.spread.copy(),
            this.fill  .copy(),
            this.blend .copy(),
            this.behind.copy(),
            this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(shadow)
    {
        return this.x     .equals(shadow.x     )
            && this.y     .equals(shadow.y     )
            && this.blur  .equals(shadow.blur  )
            && this.spread.equals(shadow.spread)
            && this.fill  .equals(shadow.fill  )
            && this.blend .equals(shadow.blend )
            && this.behind.equals(shadow.behind)
            && this.visible === shadow.visible;
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.blur  .toString()
            + ' ' + this.spread.toString()
            + ' ' + this.fill  .toString()
            + ' ' + this.blend .toString()
            + ' ' + this.behind.toString();
    }



    toPreviewString()
    {
        return      this.x     .toPreviewString()
            + ' ' + this.y     .toPreviewString()
            + ' ' + this.blur  .toPreviewString()
            + ' ' + this.spread.toPreviewString()
            + ' ' + this.fill  .toPreviewString()
            + ' ' + this.blend .toPreviewString()
            + ' ' + this.behind.toPreviewString();
    }



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.blur  .toDisplayString()
            + ' ' + this.spread.toDisplayString()
            + ' ' + this.fill  .toDisplayString()
            + ' ' + this.blend .toDisplayString()
            + ' ' + this.behind.toDisplayString();
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


        json += TAB(options.tab) + '"x": '      + this.x     .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"y": '      + this.y     .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"blur": '   + this.blur  .toJsonText(options) + ',\n';
        json += TAB(options.tab) + '"spread": ' + this.spread.toJsonText(options) + ',\n';
        json += WS('\n');
        json += TAB(options.tab) + '"fill": '   + this.fill  .toJsonText(options) + ',\n';
        json += WS('\n');
        json += TAB(options.tab) + '"blend": "' + BlendModes[this.blend.value][1] + '",\n';
        json += TAB(options.tab) + '"behind": ' + this.behind.toJsonText(options) + '\n';


        options.named = oldNamed;

        options.tab--;
        json += TAB(options.tab) + '}';


        return json;
    }



    isValid()
    {
        return this.x     .isValid()
            && this.y     .isValid()
            && this.blur  .isValid()
            && this.spread.isValid()
            && this.fill  .isValid()
            && this.blend .isValid()
            && this.behind.isValid();
    }



    static NaN()
    {
        return new DropShadowValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
              FillValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            false);
    }
}



function parseDropShadowValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [DropShadowValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const x      = parseNumberValue(str[i]); i += x     [1];
    const y      = parseNumberValue(str[i]); i += y     [1];
    const blur   = parseNumberValue(str[i]); i += blur  [1];
    const spread = parseNumberValue(str[i]); i += spread[1];
    const fill   = parseFillValue  (str, i); i += fill  [1];
    const blend  = parseNumberValue(str[i]); i += blend [1];
    const behind = parseNumberValue(str[i]); i += behind[1];


    const shadow = new DropShadowValue(
        x     [0],
        y     [0],
        blur  [0],
        spread[0],
        fill  [0],
        blend [0],
        behind[0]);


    return [shadow, i - iStart];
}

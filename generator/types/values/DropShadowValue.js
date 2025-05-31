class DropShadowValue
extends GValue
{
    static { GNode.types[DROP_SHADOW_VALUE] = this; }



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
        json += SL_(TAB(options.tab)) + '"blur": '   + this.blur  .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"spread": ' + this.spread.toJsonText(options) + ',' + SL('\n');
        json += SL(WS('\n'));
        json += SL_(TAB(options.tab)) + '"fill": '   + this.fill  .toJsonText(options) + ',' + SL('\n');
        json += SL(WS('\n'));
        json += SL_(TAB(options.tab)) + '"blend": "' + BlendModes[this.blend.value][1] + '",' + SL('\n');
        json += SL_(TAB(options.tab)) + '"behind": ' + this.behind.toJsonText(options) + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;
        
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



    static parseRequest(parse)
    {
        parse.pos++; // DROP_SHADOW_VALUE
    
        const shadow = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(DROP_SHADOW_VALUE, shadow, parse);
    
        return DropShadowValue.parse(shadow)[0];
    }



    static parse(str, i = -1)
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

        const x      = NumberValue.parse(str[i]); i += x     [1];
        const y      = NumberValue.parse(str[i]); i += y     [1];
        const blur   = NumberValue.parse(str[i]); i += blur  [1];
        const spread = NumberValue.parse(str[i]); i += spread[1];
        const fill   = FillValue.parse  (str, i); i += fill  [1];
        const blend  = NumberValue.parse(str[i]); i += blend [1];
        const behind = NumberValue.parse(str[i]); i += behind[1];


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
}
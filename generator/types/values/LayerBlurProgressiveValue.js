class LayerBlurProgressiveValue
extends GValue
{
    static { GNode.types[LAYER_PRBLUR_VALUE] = this; }



    startX      = null;
    startY      = null;
    startRadius = null;

    endX        = null;
    endY        = null;
    endRadius   = null;

    visible     = true;



    constructor(startX      = new NumberValue(0), 
                startY      = new NumberValue(0), 
                startRadius = new NumberValue(0), 
                endX        = new NumberValue(100), 
                endY        = new NumberValue(100), 
                endRadius   = new NumberValue(10), 
                visible     = true)
    {
        super(LAYER_PRBLUR_VALUE, 'layerBlurProgressive');

        this.startX      = startX;
        this.startY      = startY;
        this.startRadius = startRadius;
        this.endX        = endX;
        this.endY        = endY;
        this.endRadius   = endRadius;
        this.visible     = visible;
    }


    
    copy()
    {
        const copy = new LayerBlurProgressiveValue(
            this.startX     .copy(),
            this.startY     .copy(),
            this.startRadius.copy(),
            this.endX       .copy(),
            this.endY       .copy(),
            this.endRadius  .copy(),
            this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(blur)
    {
        return this.startX     .equals(blur.startX     )
            && this.startY     .equals(blur.startY     )
            && this.startRadius.equals(blur.startRadius)
            && this.endX       .equals(blur.endX       )
            && this.endY       .equals(blur.endY       )
            && this.endRadius  .equals(blur.endRadius  )
            && this.visible === blur.visible;
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.startX     .toString()
            + ' ' + this.startY     .toString()
            + ' ' + this.startRadius.toString()
            + ' ' + this.endX       .toString()
            + ' ' + this.endY       .toString()
            + ' ' + this.endRadius  .toString();
    }



    toPreviewString()
    {
        return      this.startX     .toPreviewString()
            + ' ' + this.startY     .toPreviewString()
            + ' ' + this.startRadius.toPreviewString()
            + ' ' + this.endX       .toPreviewString()
            + ' ' + this.endY       .toPreviewString()
            + ' ' + this.endRadius  .toPreviewString();
    }



    toDisplayString()
    {
        return      this.startX     .toDisplayString()
            + ' ' + this.startY     .toDisplayString()
            + ' ' + this.startRadius.toDisplayString()
            + ' ' + this.endX       .toDisplayString()
            + ' ' + this.endY       .toDisplayString()
            + ' ' + this.endRadius  .toDisplayString();
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


        json += WSL(TAB(options.tab)) + '"startX": '      + this.startX     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"startY": '      + this.startY     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"startRadius": ' + this.startRadius.toJsonText(options) + ',' + SL('\n');
        json += SL(WS('\n'));
        json += SL_(TAB(options.tab)) + '"endX": '        + this.endX       .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"endY": '        + this.endY       .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"endRadius": '   + this.endRadius  .toJsonText(options)       + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    isValid()
    {
        return this.startX     .isValid()
            && this.startY     .isValid()
            && this.startRadius.isValid()
            && this.endX       .isValid()
            && this.endY       .isValid()
            && this.endRadius  .isValid();
    }



    static NaN()
    {
        return new LayerBlurProgressiveValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            false);
    }



    static parseRequest(parse)
    {
        parse.pos++; // LAYER_PRBLUR_VALUE
    
        const blur = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(LAYER_PRBLUR_VALUE, blur, parse);
    
        return LayerBlurProgressiveValue.parse(blur)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LayerBlurProgressiveValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const startX      = NumberValue.parse(str[i]); i += startX     [1];
        const startY      = NumberValue.parse(str[i]); i += startY     [1];
        const startRadius = NumberValue.parse(str[i]); i += startRadius[1];
        const endX        = NumberValue.parse(str[i]); i += endX       [1];
        const endY        = NumberValue.parse(str[i]); i += endY       [1];
        const endRadius   = NumberValue.parse(str[i]); i += endRadius  [1];
    
    
        const blur = new LayerBlurProgressiveValue(
            startX     [0],
            startY     [0],
            startRadius[0],
            endX       [0],
            endY       [0],
            endRadius  [0]);
    
    
        return [blur, i - iStart];
    }
}

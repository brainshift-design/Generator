class BackBlurProgressiveValue
extends GValue
{
    static { GNode.types[BACK_PRBLUR_VALUE] = this; }



    radius;
    visible;



    constructor(startX      = new NumberValue(0), 
                startY      = new NumberValue(0), 
                startRadius = new NumberValue(0), 
                endX        = new NumberValue(100), 
                endY        = new NumberValue(100), 
                endRadius   = new NumberValue(10), 
                visible     = true)
    {
        super(BACK_PRBLUR_VALUE, 'backBlurProgressive');

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
        const copy = new BackBlurProgressiveValue(
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
        return this.startX     .equals(blur.startX)
            && this.startY     .equals(blur.startY)
            && this.startRadius.equals(blur.startRadius)
            && this.endX       .equals(blur.endX)
            && this.endY       .equals(blur.endY)
            && this.endRadius  .equals(blur.endRadius)
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
            + ' ' + this.endRadius  .toString()
            + ' ' + super           .toString();
    }



    toPreviewString()
    {
        return      this.startX     .toPreviewString()
            + ' ' + this.startY     .toPreviewString()
            + ' ' + this.startRadius.toPreviewString()
            + ' ' + this.endX       .toPreviewString()
            + ' ' + this.endY       .toPreviewString()
            + ' ' + this.endRadius  .toPreviewString()
            + ' ' + super           .toPreviewString();
    }



    toDisplayString()
    {
        return      this.startX     .toDisplayString()
            + ' ' + this.startY     .toDisplayString()
            + ' ' + this.startRadius.toDisplayString()
            + ' ' + this.endX       .toDisplayString()
            + ' ' + this.endY       .toDisplayString()
            + ' ' + this.endRadius  .toDisplayString()
            + ' ' + super           .toDisplayString();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        let json = '';

        
        const SL  = s => options.singleLine ? ''  : s;
        const SL_ = s => options.singleLine ? ' ' : s;


        if (options.named)
        json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += SL_(TAB(options.tab)) + '"radius": ' + this.radius.toJsonText(options) + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += SL_(TAB(options.tab)) + '}';


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
        return new BackBlurProgressiveValue(
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
        parse.pos++; // BACK_PRBLUR_VALUE
    
        const blur = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(BACK_PRBLUR_VALUE, blur, parse);
    
        return BackBlurProgressiveValue.parse(blur)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [BackBlurProgressiveValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const radius = NumberValue.parse(str[i]); i += radius[1];
    
    
        const shadow = new BackBlurProgressiveValue(
            radius[0]);
    
    
        return [shadow, i - iStart];
    }
}

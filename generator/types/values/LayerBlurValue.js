class LayerBlurValue
extends GValue
{
    radius;
    visible;



    constructor(radius  = new NumberValue(0), 
                visible = true)
    {
        super(LAYER_BLUR_VALUE, 'layerBlur');

        this.radius  = radius;
        this.visible = visible;
    }


    
    // static create(x, y, blur, spread, fill, blend)
    // {
    //     return new FillValue(
    //         new Number,
    //         new NumberValue(opacity));
    // }



    copy()
    {
        const copy = new LayerBlurValue(
            this.radius.copy(),
            this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(blur)
    {
        return this.radius.equals(blur.radius)
            && this.visible === blur.visible;
    }



    async eval(parse)
    {
        return this;
    }



    // toRgba()
    // {
    //     return [
    //         ...this.color.toRgb(),
    //         this.opacity.value / 100 ];
    // }



    // toFigma()
    // {
    //     return [['SOLID', this.toString()]];
    // }



    toString()
    {
        return this.radius.toString();
    }



    toPreviewString()
    {
        return this.radius.toPreviewString();
    }



    toDisplayString()
    {
        return this.radius.toDisplayString();
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
        return this.radius.isValid();
    }



    static NaN()
    {
        return new LayerBlurValue(
            NumberValue.NaN(),
            false);
    }



    static parseRequest(parse)
    {
        parse.pos++; // LAYER_BLUR_VALUE
    
        const blur = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(LAYER_BLUR_VALUE, blur, parse);
    
        return LayerBlurValue.parse(blur)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LayerBlurValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const radius = NumberValue.parse(str[i]); i += radius[1];
    
    
        const shadow = new LayerBlurValue(
            radius[0]);
    
    
        return [shadow, i - iStart];
    }
}




class LayerBlurValue
extends GValue
{
    radius;
    visible;



    constructor(radius  = new NumberValue(0), 
                visible = true)
    {
        super(LAYER_BLUR_VALUE);

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

        
        if (options.named)
            json += '\n' + TAB(options.tab);


        json += '{\n';
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += TAB(options.tab) + '"radius": ' + this.radius .toJsonText(options) + '\n';


        options.named = oldNamed;

        options.tab--;
        json += TAB(options.tab) + '}';


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
}



function parseLayerBlurValue(str, i = -1)
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

    const radius = parseNumberValue(str[i]); i += radius[1];


    const shadow = new LayerBlurValue(
        radius[0]);


    return [shadow, i - iStart];
}

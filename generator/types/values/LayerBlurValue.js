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



    toDisplayString()
    {
        return this.radius.toDisplayString();
    }



    isValid()
    {
        return super.isValid()
            && this.radius.isValid();
    }



    getNaN()
    {
        return LayerBlurValue.NaN;
    }



    static NaN = Object.freeze(new LayerBlurValue(
        NumberValue.NaN,
        false));



    // static default = Object.freeze(LayerBlurValue.create(217, 217, 217, 100));
}



function parseLayerBlurValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [LayerBlurValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const radius = parseNumberValue(str[i]); i += radius[1];


    const shadow = new LayerBlurValue(
        '', // set node ID elsewhere
        radius[0]);


    return [shadow, i - iStart];
}

class LayerTextureValue
extends GValue
{
    static { GNode.types[LAYER_TEXTURE_VALUE] = this; }



    size;
    radius;
    clipToShape;
    visible;



    constructor(size        = new NumberValue(0), 
                radius      = new NumberValue(0), 
                clipToShape = new BooleanValue(false), 
                visible     = true)
    {
        super(LAYER_TEXTURE_VALUE, 'layerTexture');

        this.size        = size;
        this.radius      = radius;
        this.clipToShape = clipToShape;

        this.visible     = visible;
    }


    
    copy()
    {
        const copy = new LayerTextureValue(
            this.size       .copy(),
            this.radius     .copy(),
            this.clipToShape.copy(),
            this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(texture)
    {
        return this.size       .equals(texture.size)
            && this.radius     .equals(texture.radius)
            && this.clipToShape.equals(texture.clipToShape)
            && this.visible === texture.visible;
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.size       .toString()
            + ' ' + this.radius     .toString()
            + ' ' + this.clipToShape.toString()
            + ' ' + super           .toString();
    }



    toPreviewString()
    {
        return      this.size       .toPreviewString()
            + ' ' + this.radius     .toPreviewString()
            + ' ' + this.clipToShape.toPreviewString()
            + ' ' + super           .toPreviewString();
    }



    toDisplayString()
    {
        return      this.size       .toDisplayString()
            + ' ' + this.radius     .toDisplayString()
            + ' ' + this.clipToShape.toDisplayString()
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


        json += SL_(TAB(options.tab)) + '"size": '        + this.size       .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"radius": '      + this.radius     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"clipToShape": ' + this.clipToShape.toJsonText(options)       + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += SL_(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    isValid()
    {
        return this.size       .isValid()
            && this.radius     .isValid()
            && this.clipToShape.isValid();
    }



    static NaN()
    {
        return new LayerTextureValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            BooleanValue.NaN(),
            false);
    }



    static parseRequest(parse)
    {
        parse.pos++; // LAYER_TEXTURE_VALUE
    
        const blur = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(LAYER_TEXTURE_VALUE, blur, parse);
    
        return LayerTextureValue.parse(blur)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LayerTextureValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const radius = NumberValue.parse(str[i]); i += radius[1];
    
    
        const texture = new LayerTextureValue(
            size[0],
            radius[0],
            clipToShape[0]);
    
    
        return [texture, i - iStart];
    }
}

class LayerBlendValue
extends GValue
{
    static { GNode.types[LAYER_BLEND_VALUE] = this; }



    opacity;
    blend;



    constructor(opacity, blend)
    {
        super(LAYER_BLEND_VALUE, 'layerBlend');

        this.opacity = opacity.copy();
        this.blend   = blend  .copy();
    }


    
    copy()
    {
        const copy = new LayerBlendValue(this.opacity, this.blend);

        copy.copyBase(this);

        return copy;
    }



    equals(layer)
    {
        return this.opacity.equals(layer.opacity)
            && this.blend  .equals(layer.blend  );
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.opacity.toString()
            + ' ' + this.blend  .toString();
    }



    toPreviewString()
    {
        return      this.opacity.toPreviewString()
            + ' ' + this.blend  .toPreviewString();
    }



    toDisplayString()
    {
        return      this.opacity.toDisplayString()
            + ' ' + this.blend  .toDisplayString();
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


        json += WSL(TAB(options.tab)) + '"opacity": ' + this.opacity.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"blend": "'  + BlendModes[this.blend.value][1] + '"'  + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    hasInitValue()
    {
        return this.opacity.hasInitValue()
            && this.blend  .hasInitValue();
    }



    isValid()
    {
        return this.opacity && this.opacity.isValid()
            && this.blend   && this.blend  .isValid();
    }



    static NaN()
    {
        return new LayerBlendValue(
            NumberValue.NaN(), 
            NumberValue.NaN());
    }



    static parseRequest(parse)
    {
        parse.pos++; // LAYER_BLEND_VALUE
    
        const layer = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(LAYER_BLEND_VALUE, layer, parse);
    
        return LayerBlendValue.parse(layer)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LayerBlendValue.NaN(), 1];


        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }


        const iStart = i;

        const opacity = NumberValue.parse(str[i]); i += opacity[1];
        const blend   = NumberValue.parse(str[i]); i += blend  [1];


        const layer = new LayerBlendValue(
            opacity[0],
            blend  [0]);

            
        return [layer, i - iStart];
    }
}
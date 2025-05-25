class LayerNoiseMultiValue
extends GValue
{
    static { GNode.types[LAYER_NOISE_MULTI_VALUE] = this; }



    size;
    density;
    opacity;
    blend;
    enabled;



    constructor(size    = new NumberValue(0.5), 
                density = new NumberValue(0.5), 
                opacity = new NumberValue(25),
                blend   = new NumberValue(0),
                enabled = true)
    {
        super(LAYER_NOISE_MULTI_VALUE, 'layerNoiseMulti');

        this.size    = size;
        this.density = density;
        this.opacity = opacity;
        this.blend   = blend;

        this.enabled = enabled;
    }


    
    copy()
    {
        const copy = new LayerNoiseMultiValue(
            this.size   .copy(),
            this.density.copy(),
            this.opacity.copy(),
            this.blend  .copy(),
            this.enabled);

        copy.copyBase(this);

        return copy;
    }



    equals(noise)
    {
        return this.size   .equals(noise.size)
            && this.density.equals(noise.density)
            && this.opacity.equals(noise.opacity)
            && this.blend  .equals(noise.blend)
            && this.enabled === noise.enabled;
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.size   .toString()
            + ' ' + this.density.toString()
            + ' ' + this.opacity.toString()
            + ' ' + this.blend  .toString()
            + ' ' + super       .toString();
    }



    toPreviewString()
    {
        return      this.size   .toPreviewString()
            + ' ' + this.density.toPreviewString()
            + ' ' + this.opacity.toPreviewString()
            + ' ' + this.blend  .toPreviewString()
            + ' ' + super       .toPreviewString();
    }



    toDisplayString()
    {
        return      this.size   .toDisplayString()
            + ' ' + this.density.toDisplayString()
            + ' ' + this.opacity.toDisplayString()
            + ' ' + this.blend  .toDisplayString()
            + ' ' + super       .toDisplayString();
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


        json += SL_(TAB(options.tab)) + '"size": '    + this.size   .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"density": ' + this.density.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"opacity": ' + this.opacity.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"blend": '   + this.blend  .toJsonText(options)       + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += SL_(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    isValid()
    {
        return this.size   .isValid()
            && this.density.isValid()
            && this.opacity.isValid()
            && this.blend  .isValid();
    }



    static NaN()
    {
        return new LayerNoiseMultiValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            false);
    }



    static parseRequest(parse)
    {
        parse.pos++; // LAYER_NOISE_MULTI_VALUE
    
        const noise = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(LAYER_NOISE_MULTI_VALUE, noise, parse);
    
        return LayerNoiseMultiValue.parse(noise)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LayerNoiseMultiValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const size    = NumberValue.parse(str[i]); i += size   [1];
        const density = NumberValue.parse(str[i]); i += density[1];
        const opacity = NumberValue.parse(str[i]); i += opacity[1];
        const blend   = NumberValue.parse(str[i]); i += blend  [1];
    
    
        const noise = new LayerNoiseMultiValue(
            size   [0],
            density[0],
            opacity[0],
            blend  [0]);
    
    
        return [noise, i - iStart];
    }
} 
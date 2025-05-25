class LayerNoiseMonoValue
extends GValue
{
    static { GNode.types[LAYER_NOISE_MONO_VALUE] = this; }



    size;
    density;
    fill;
    blend;
    enabled;



    constructor(size    = new NumberValue(0.5), 
                density = new NumberValue(100), 
                fill    = new FillValue(ColorValue.fromRgb([0, 0, 0]), new NumberValue(25)), 
                blend   = new NumberValue(0),
                enabled = true)
    {
        super(LAYER_NOISE_MONO_VALUE, 'layerNoiseMono');

        this.size    = size;
        this.density = density;
        this.fill    = fill;
        this.blend   = blend;

        this.enabled = enabled;
    }


    
    copy()
    {
        const copy = new LayerNoiseMonoValue(
            this.size   .copy(),
            this.density.copy(),
            this.fill   .copy(),
            this.blend  .copy(),
            this.enabled);

        copy.copyBase(this);

        return copy;
    }



    equals(noise)
    {
        return this.size   .equals(noise.size)
            && this.density.equals(noise.density)
            && this.fill   .equals(noise.fill)
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
            + ' ' + this.fill   .toString()
            + ' ' + this.blend  .toString()
            + ' ' + super       .toString();
    }



    toPreviewString()
    {
        return      this.size   .toPreviewString()
            + ' ' + this.density.toPreviewString()
            + ' ' + this.fill   .toPreviewString()
            + ' ' + this.blend  .toPreviewString()
            + ' ' + super       .toPreviewString();
    }



    toDisplayString()
    {
        return      this.size   .toDisplayString()
            + ' ' + this.density.toDisplayString()
            + ' ' + this.fill   .toDisplayString()
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
        json += SL_(TAB(options.tab)) + '"fill": '    + this.fill   .toJsonText(options) + ',' + SL('\n');
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
            && this.fill   .isValid()
            && this.blend  .isValid();
    }



    static NaN()
    {
        return new LayerNoiseMonoValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            FillValue  .NaN(),
            NumberValue.NaN(),
            false);
    }



    static parseRequest(parse)
    {
        parse.pos++; // LAYER_NOISE_MONO_VALUE
    
        const noise = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(LAYER_NOISE_MONO_VALUE, noise, parse);
    
        return LayerNoiseMonoValue.parse(noise)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LayerNoiseMonoValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        console.log('str[i]', str[i]);
        const size    = NumberValue.parse(str[i]); i += size   [1];
        console.log('size', size);
        console.log('str[i]', str[i]);
        const density = NumberValue.parse(str[i]); i += density[1];
        console.log('density', density);
        console.log('str[i]', str[i]);
        const fill    = FillValue  .parse(str, i); i += fill   [1];
        console.log('fill', fill);
        console.log('str[i]', str[i]);
        const blend   = NumberValue.parse(str[i]); i += blend  [1];
        console.log('blend', blend);

    
    
        const noise = new LayerNoiseMonoValue(
            size   [0],
            density[0],
            fill   [0],
            blend  [0]);
    
    
        return [noise, i - iStart];
    }
}



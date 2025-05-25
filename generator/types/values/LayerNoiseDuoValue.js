class LayerNoiseDuoValue
extends GValue
{
    static { GNode.types[LAYER_NOISE_DUO_VALUE] = this; }



    size;
    density;
    fill1;
    fill2;
    blend;
    enabled;



    constructor(size    = new NumberValue(0.5), 
                density = new NumberValue(100), 
                fill1   = new FillValue(ColorValue.fromRgb([0, 0, 0]), new NumberValue(25)), 
                fill2   = new FillValue(ColorValue.fromRgb([255, 255, 255]), new NumberValue(25)),
                blend   = new NumberValue(0),
                enabled = true)
    {
        super(LAYER_NOISE_DUO_VALUE, 'layerNoiseDuo');

        this.size    = size;
        this.density = density;
        this.fill1   = fill1;
        this.fill2   = fill2;
        this.blend   = blend;

        this.enabled = enabled;
    }


    
    copy()
    {
        const copy = new LayerNoiseDuoValue(
            this.size   .copy(),
            this.density.copy(),
            this.fill1  .copy(),
            this.fill2  .copy(),
            this.blend  .copy(),
            this.enabled);

        copy.copyBase(this);

        return copy;
    }



    equals(noise)
    {
        return this.size   .equals(noise.size)
            && this.density.equals(noise.density)
            && this.fill1  .equals(noise.fill1)
            && this.fill2  .equals(noise.fill2)
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
            + ' ' + this.fill1  .toString()
            + ' ' + this.fill2  .toString()
            + ' ' + this.blend  .toString()
            + ' ' + super       .toString();
    }



    toPreviewString()
    {
        return      this.size   .toPreviewString()
            + ' ' + this.density.toPreviewString()
            + ' ' + this.fill1  .toPreviewString()
            + ' ' + this.fill2  .toPreviewString()
            + ' ' + this.blend  .toPreviewString()
            + ' ' + super       .toPreviewString();
    }



    toDisplayString()
    {
        return      this.size   .toDisplayString()
            + ' ' + this.density.toDisplayString()
            + ' ' + this.fill1  .toDisplayString()
            + ' ' + this.fill2  .toDisplayString()
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
        json += SL_(TAB(options.tab)) + '"fill1": '   + this.fill1  .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"fill2": '   + this.fill2  .toJsonText(options) + ',' + SL('\n');
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
            && this.fill1  .isValid()
            && this.fill2  .isValid()
            && this.blend  .isValid();
    }



    static NaN()
    {
        return new LayerNoiseDuoValue(
            NumberValue.NaN(),
            NumberValue.NaN(),
            FillValue  .NaN(),
            FillValue  .NaN(),
            NumberValue.NaN(),
            false);
    }



    static parseRequest(parse)
    {
        parse.pos++; // LAYER_NOISE_DUO_VALUE
    
        const noise = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(LAYER_NOISE_DUO_VALUE, noise, parse);
    
        return LayerNoiseDuoValue.parse(noise)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LayerNoiseDuoValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const size    = NumberValue.parse(str[i]); i += size   [1];
        const density = NumberValue.parse(str[i]); i += density[1];
        const fill1   = FillValue  .parse(str, i); i += fill1  [1];
        const fill2   = FillValue  .parse(str, i); i += fill2  [1];
        const blend   = NumberValue.parse(str[i]); i += blend  [1];
    
    
        const noise = new LayerNoiseDuoValue(
            size   [0],
            density[0],
            fill1  [0],
            fill2  [0],
            blend  [0]);
    
    
        return [noise, i - iStart];
    }
} 
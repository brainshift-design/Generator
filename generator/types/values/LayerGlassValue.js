class LayerGlassValue
extends GValue
{
    static { GNode.types[LAYER_GLASS_VALUE] = this; }



    intensity;
    angle;
    refraction;
    depth;
    dispersion;
    radius;
    visible;



    constructor(intensity  = new NumberValue(0), 
                angle      = new NumberValue(0), 
                refraction = new NumberValue(0), 
                depth      = new NumberValue(0), 
                dispersion = new NumberValue(0), 
                radius     = new NumberValue(0), 
                visible    = true)
    {
        super(LAYER_GLASS_VALUE, 'layerGlass');

        this.intensity  = intensity;
        this.angle      = angle;
        this.refraction = refraction;
        this.depth      = depth;
        this.dispersion = dispersion;
        this.radius     = radius;

        this.visible    = visible;
    }


    
    copy()
    {
        const copy = new LayerGlassValue(
            this.intensity .copy(),
            this.angle     .copy(),
            this.refraction.copy(),
            this.depth     .copy(),
            this.dispersion.copy(),
            this.radius    .copy(),
            this.visible);

        copy.copyBase(this);

        return copy;
    }



    equals(glass)
    {
        return this.intensity .equals(glass.intensity)
            && this.angle     .equals(glass.angle)
            && this.refraction.equals(glass.refraction)
            && this.depth     .equals(glass.depth)
            && this.dispersion.equals(glass.dispersion)
            && this.radius    .equals(glass.radius)
            && this.visible === glass.visible;
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.intensity .toString()
            + ' ' + this.angle     .toString()
            + ' ' + this.refraction.toString()
            + ' ' + this.depth     .toString()
            + ' ' + this.dispersion.toString()
            + ' ' + this.radius    .toString()
            + ' ' + super          .toString();
    }



    toPreviewString()
    {
        return      this.intensity .toPreviewString()
            + ' ' + this.angle     .toPreviewString()
            + ' ' + this.refraction.toPreviewString()
            + ' ' + this.depth     .toPreviewString()
            + ' ' + this.dispersion.toPreviewString()
            + ' ' + this.radius    .toPreviewString()
            + ' ' + super          .toPreviewString();
    }



    toDisplayString()
    {
        return      this.intensity .toDisplayString()
            + ' ' + this.angle     .toDisplayString()
            + ' ' + this.refraction.toDisplayString()
            + ' ' + this.depth     .toDisplayString()
            + ' ' + this.dispersion.toDisplayString()
            + ' ' + this.radius    .toDisplayString()
            + ' ' + super          .toDisplayString();
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        const { SL, SL_, WSL } = getWhiteSpaceForJson(options);


        let json = '';

        
        if (options.named)
        json += SL('\n' + TAB(options.tab));


        json += '{' + SL('\n');
        options.tab++;

        const oldNamed = options.named;
        options.named = true;


        json += WSL(TAB(options.tab)) + '"intensity": '  + this.intensity .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"angle": '      + this.angle     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"refraction": ' + this.refraction.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"depth": '      + this.depth     .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"dispersion": ' + this.dispersion.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"radius": '     + this.radius    .toJsonText(options)       + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;


        return json;
    }



    isValid()
    {
        return this.intensity .isValid()
            && this.angle     .isValid()
            && this.refraction.isValid()
            && this.depth     .isValid()
            && this.dispersion.isValid()
            && this.radius    .isValid();
    }



    static NaN()
    {
        return new LayerGlassValue(
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
        parse.pos++; // LAYER_GLASS_VALUE
    
        const blur = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(LAYER_GLASS_VALUE, blur, parse);
    
        return LayerGlassValue.parse(blur)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [LayerGlassValue.NaN(), 1];
    
    
        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }
    
    
        const iStart = i;
    
        const size        = NumberValue.parse(str[i]); i += size       [1];
        const radius      = NumberValue.parse(str[i]); i += radius     [1];
        const clipToShape = NumberValue.parse(str[i]); i += clipToShape[1];
    
    
        const glass = new LayerGlassValue(
            intensity [0],
            angle     [0],
            refraction[0],
            depth     [0],
            dispersion[0],
            radius    [0]);
    
    
        return [glass, i - iStart];
    }
}

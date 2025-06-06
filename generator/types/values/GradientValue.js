class GradientValue
extends GValue
{
    static { GNode.types[GRADIENT_VALUE] = this; }



    stops;
 
    gradType;
    position;
    x;
    y;
    size;
    angle;
    aspect;
    skew;
    blend;

    diagAspect;



    constructor(stops      = new ListValue(),
                gradType   = new NumberValue(0),
                position   = new NumberValue(0),
                x          = new NumberValue(0),
                y          = new NumberValue(0),
                size       = new NumberValue(0),
                angle      = new NumberValue(0),
                aspect     = new NumberValue(0),
                diagAspect = false,
                skew       = new NumberValue(0),
                blend      = new NumberValue(0))
    {
        super(GRADIENT_VALUE, 'gradient');

        this.stops      = stops;
        this.gradType   = gradType;
        this.position   = position;
        this.x          = x;
        this.y          = y;
        this.size       = size;
        this.angle      = angle;
        this.aspect     = aspect;
        this.diagAspect = diagAspect;
        this.skew       = skew;
        this.blend      = blend;

        this.valid      = true;
    }


    
    copy()
    {
        const copy = new GradientValue(
            this.stops     ?.copy(),
            this.gradType  ?.copy(),
            this.position  ?.copy(),
            this.x         ?.copy(),
            this.y         ?.copy(),
            this.size      ?.copy(),
            this.angle     ?.copy(),
            this.aspect    ?.copy(),
            this.diagAspect,
            this.skew      ?.copy(),
            this.blend     ?.copy());

        copy.copyBase(this);

        return copy;
    }



    isValid()
    {
        return this.stops   .isValid()
            && this.gradType.isValid()
            && this.position.isValid()
            && this.x       .isValid()
            && this.y       .isValid()
            && this.size    .isValid()
            && this.angle   .isValid()
            && this.aspect  .isValid()
            && this.skew    .isValid()
            && this.blend   .isValid();
    }



    equals(grad)
    {
        return grad
            && this.stops   .equals(grad.stops   )
            && this.gradType.equals(grad.gradType)
            && this.position.equals(grad.position)
            && this.x       .equals(grad.x       )
            && this.y       .equals(grad.y       )
            && this.size    .equals(grad.size    )
            && this.angle   .equals(grad.angle   )
            && this.aspect  .equals(grad.aspect  )
            && this.diagAspect == grad.diagAspect
            && this.skew    .equals(grad.skew    )
            && this.blend   .equals(grad.blend   );
    }



    async eval(parse)
    {
        return this;
    }



    toNewValue()
    {
        return this.copy();
    }



    toString()
    {
        return      (this.stops   ?.toString() ?? '?')
            + ' ' + (this.gradType?.toString() ?? '?,?')
            + ' ' + (this.position?.toString() ?? '?,?')
            + ' ' + (this.x       ?.toString() ?? '?,?')
            + ' ' + (this.y       ?.toString() ?? '?,?')
            + ' ' + (this.size    ?.toString() ?? '?,?')
            + ' ' + (this.angle   ?.toString() ?? '?,?')
            + ' ' + (this.aspect  ?.toString() ?? '?,?')
            + ' ' + ((this.diagAspect ? '1' : '0') ?? '?,?')
            + ' ' + (this.skew    ?.toString() ?? '?,?')
            + ' ' + (this.blend   ?.toString() ?? '?,?');
    }



    toRgba()
    {
        let rgba = rgba_NaN;

        for (const stop of this.stops.items)
        {
            rgba = 
                rgbaIsNaN(rgba)
                ? stop.fill.toRgba()
                : rgbaMuls(rgbaAdd(rgba, stop.fill.toRgba()), 0.5);
        }

        return rgba;
    }


    
    toPreviewString()
    {
        return      this.stops   .toPreviewString()
            + ' ' + this.gradType.toPreviewString()
            + ' ' + this.position.toPreviewString()
            + ' ' + this.x       .toPreviewString()
            + ' ' + this.y       .toPreviewString()
            + ' ' + this.size    .toPreviewString()
            + ' ' + this.angle   .toPreviewString()
            + ' ' + this.aspect  .toPreviewString()
            + ' ' + (this.diagAspect ? '1' : '0')
            + ' ' + this.skew    .toPreviewString()
            + ' ' + this.blend   .toPreviewString();
    }



    toDisplayString()
    {
        return      this.stops   .toDisplayString()
            + ' ' + this.gradType.toDisplayString()
            + ' ' + this.position.toDisplayString()
            + ' ' + this.x       .toDisplayString()
            + ' ' + this.y       .toDisplayString()
            + ' ' + this.size    .toDisplayString()
            + ' ' + this.angle   .toDisplayString()
            + ' ' + this.aspect  .toDisplayString()
            + ' ' + (this.diagAspect ? '1' : '0')
            + ' ' + this.skew    .toDisplayString()
            + ' ' + this.blend   .toDisplayString();
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


        json += WSL(TAB(options.tab)) + '"stops": '    + this.stops   .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"gradType": ' + this.gradType.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"position": ' + this.position.toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"x": '        + this.x       .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"y": '        + this.y       .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"size": '     + this.size    .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"angle": '    + this.angle   .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"aspect": '   + this.aspect  .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"skew": '     + this.skew    .toJsonText(options) + ',' + SL('\n');
        json += SL_(TAB(options.tab)) + '"blend": "'   + BlendModes[this.blend.value][1]   + '"' + SL('\n');


        options.named = oldNamed;

        options.tab--;
        json += WSL(TAB(options.tab)) + '}';


        options.lastExpanded = !options.singleLine;

        return json;
    }



    static NaN()
    {
        return new GradientValue(
            ListValue  .NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            NumberValue.NaN(),
            false,
            NumberValue.NaN(),
            NumberValue.NaN());
    }



    static parseRequest(parse)
    {
        parse.pos++; // GRADIENT_VALUE
    
        const grad = parse.move();
    
        if (parse.settings.logRequests) 
            logReqValue(GRADIENT_VALUE, grad, parse);
    
        return GradientValue.parse(grad)[0];
    }



    static parse(str, i = -1)
    {
        if (   i <  0 && str    == NAN_DISPLAY
            || i >= 0 && str[i] == NAN_DISPLAY)
            return [GradientValue.NaN(), 1];


        if (i < 0)
        {
            str = str.split(' ');
            i   = 0;
        }


        const iStart = i;

        const stops      = ListValue.parse  (str, i); i += stops   [1];
        const gradType   = NumberValue.parse(str[i]); i += gradType[1];
        const position   = NumberValue.parse(str[i]); i += position[1];
        const x          = NumberValue.parse(str[i]); i += x       [1];
        const y          = NumberValue.parse(str[i]); i += y       [1];
        const size       = NumberValue.parse(str[i]); i += size    [1];
        const angle      = NumberValue.parse(str[i]); i += angle   [1];
        const aspect     = NumberValue.parse(str[i]); i += aspect  [1];
        const diagAspect = parseInt(str[i]) == 1;    i ++;
        const skew       = NumberValue.parse(str[i]); i += skew    [1];
        const blend      = NumberValue.parse(str[i]); i += blend   [1];


        return [
            new GradientValue(
                stops   [0], 
                gradType[0], 
                position[0],
                x       [0], 
                y       [0], 
                size    [0], 
                angle   [0], 
                aspect  [0], 
                diagAspect,
                skew    [0], 
                blend   [0]),
            i - iStart ];
    }
}

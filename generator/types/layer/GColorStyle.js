class GColorStyle
extends GOperator
{
    static { GNode.types[COLOR_STYLE] = this; }



    id;

    colorStyle;
    genValue;

    //existing;
    linked;



    constructor(nodeId, options, styleId)
    {
        super(COLOR_STYLE, nodeId, options);

        this.id == styleId;
    }



    copy()
    {
        const copy = new GColorStyle(this.nodeId, this.options);

        copy.id = this.id;

        if (this.colorStyle) copy.colorStyle = this.colorStyle.copy();
        if (this.genValue  ) copy.genValue   = this.genValue  .copy();
        
      //copy.existing = this.existing;
        copy.linked   = this.linked;

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        this.value = await evalColorValue(this.genValue, parse);


        if (   this.value.isValid()
            && this.linked)
            // (  !this.existing
            //     || this.linked))
        {
            if (this.value.type == COLOR_VALUE)
                this.value = FillValue.fromRgb(scaleRgb(this.value.toRgb()), 0xff);

            const rgba       = this.value.toRgba();
            const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);

            this.evalStyle({rgba: rgbaStripe});
        }
        else
            this.value = FillValue.NaN();


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }



    evalStyle(options = {})
    {
        if (!this.options.enabled)
            return;

            
        const colorStyle = new FigmaColorStyle(this.nodeId, this.id, this.name);

        //colorStyle.existing = this.existing;


        colorStyle.paints = 
        [
            [ 'SOLID', 
                      Math.round(options.rgba[0] * 0xff)
              + ' ' + Math.round(options.rgba[1] * 0xff)
              + ' ' + Math.round(options.rgba[2] * 0xff)
              + ' ' + Math.round(options.rgba[3] * 100 ) ]
        ];


        this.colorStyle = colorStyle;
    }



    isValid()
    {
        return this.genValue && this.genValue.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.genValue) this.genValue.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.genValue) this.genValue.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.genValue) this.genValue.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const style = new GColorStyle(nodeId, options);
    
        style.existing = options.existing;
    
    
        if (parse.settings.logRequests) 
            logReq(style, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, style);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
        parse.inParam = false;
    
    
        style.id       = parse.move();
        style.name     = options.nodeName;
        
        style.genValue = genParse(parse);
    
        
        parse.nTab--;
    
        
        style.linked = style.id != NULL;
    
    
        genParseNodeEnd(parse, style);
        return style;
    }
}
class GVariable
extends GOperator
{
    id;

    variable;
    genValue;

    //existing;
    linked;



    constructor(nodeId, options, styleId)
    {
        super(VARIABLE, nodeId, options);

        this.id == styleId;
    }



    copy()
    {
        const copy = new GColorStyle(this.nodeId, this.options);

        copy.id       = this.id;
        copy.variable = this.variable.copy();
        copy.genValue = this.genValue.copy();
        
        //copy.existing   = this.existing;
        copy.linked   = this.linked;

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        this.value = (await this.genValue.eval(parse)).toValue();


        // if (   this.value.isValid()
        //     && this.linked)
        //     // (  !this.existing
        //     //     || this.linked))
        // {
        //     if (this.value.type == COLOR_VALUE)
        //         this.value = FillValue.fromRgb(scaleRgb(this.value.toRgb()), 0xff);

        //     const rgba       = this.value.toRgba();
        //     const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);

        //     this.evalStyle({rgba: rgbaStripe});
        // }
        // else
            this.value = NullValue;


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }



    evalVariable(options = {})
    {
        if (!this.options.enabled)
            return;

            
        // const colorStyle = new FigmaColorStyle(this.nodeId, this.id, this.name);

        // //colorStyle.existing = this.existing;


        // colorStyle.paints = 
        // [
        //     [ 'SOLID', 
        //               Math.round(options.rgba[0] * 0xff)
        //       + ' ' + Math.round(options.rgba[1] * 0xff)
        //       + ' ' + Math.round(options.rgba[2] * 0xff)
        //       + ' ' + Math.round(options.rgba[3] * 100 ) ]
        // ];


        // this.variable = colorStyle;
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



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.genValue) this.genValue.invalidateInputs(parse, from);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.genValue) this.genValue.iterateLoop(parse);
    }
}
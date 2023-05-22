class GGradient
extends GOperator
{
    inputs = [];

    x1 = null;
    y1 = null;
    x2 = null;
    y2 = null;
    x3 = null;
    y3 = null;



    constructor(nodeId, options)
    {
        super(GRADIENT, nodeId, options);
    }



    copy()
    {
        const copy = new GGradient(this.nodeId, this.options);

        copy.copyBase(this);

        copy.inputs = this.inputs.map(i => i.copy());

        if (this.x1) copy.x1 = this.x1.copy();
        if (this.y1) copy.y1 = this.y1.copy();
        if (this.x2) copy.x2 = this.x2.copy();
        if (this.y2) copy.y2 = this.y2.copy();
        if (this.x3) copy.x3 = this.x3.copy();
        if (this.y3) copy.y3 = this.y3.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        const x1 = this.x1 ? (await this.x1.eval(parse)).toValue() : null;
        const y1 = this.y1 ? (await this.y1.eval(parse)).toValue() : null;
        const x2 = this.x2 ? (await this.x2.eval(parse)).toValue() : null;
        const y2 = this.y2 ? (await this.y2.eval(parse)).toValue() : null;
        const x3 = this.x3 ? (await this.x3.eval(parse)).toValue() : null;
        const y3 = this.y3 ? (await this.y3.eval(parse)).toValue() : null;


        // if (this.input)
        // {
        //     const input = (await this.input.eval(parse)).toValue();

        //     this.value = new GradientValue(
        //         x1 ?? input.x1,
        //         y1 ?? input.y1,
        //         x2 ?? input.x2,
        //         y2 ?? input.y2,
        //         x3 ?? input.x3,
        //         y3 ?? input.y3);
        // }
        // else
        // {
        //     this.value = new GradientValue(
        //         x1, 
        //         y1, 
        //         x2, 
        //         y2, 
        //         x3,
        //         y3);
        // }


        this.updateValues =
        [
            ['x1', x1],
            ['y1', y1],
            ['x2', x2],
            ['y2', y2],
            ['x3', x3],
            ['y3', y3]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));

        if (this.x1) this.x1.pushValueUpdates(parse);
        if (this.y1) this.y1.pushValueUpdates(parse);
        if (this.x2) this.x2.pushValueUpdates(parse);
        if (this.y2) this.y2.pushValueUpdates(parse);
        if (this.x3) this.x3.pushValueUpdates(parse);
        if (this.y3) this.y3.pushValueUpdates(parse);
    }    
    
    
    toValue()
    {
        return new StrokeValue(
            this.options.enabled
            ? this.validateFill(this.fill ? this.fill.toValue() : this.input.fill.toValue())
            : FillValue.NaN,
            this.weight ? this.weight.toValue() : this.input.weight.toValue(),
            this.fit    ? this.fit   .toValue() : this.input.fit   .toValue(),
            this.join   ? this.join  .toValue() : this.input.join  .toValue(),
            this.miter  ? this.miter .toValue() : this.input.miter .toValue());
    }                 



    isValid()
    {
        return this.fill  .isValid()
            && this.weight.isValid()
            && this.fit   .isValid()
            && this.join  .isValid()
            && this.miter .isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input ) this.input .invalidate();
        if (this.fill  ) this.fill  .invalidate();
        if (this.weight) this.weight.invalidate();
        if (this.fit   ) this.fit   .invalidate();
        if (this.join  ) this.join  .invalidate();
        if (this.miter ) this.miter .invalidate();
    }
}
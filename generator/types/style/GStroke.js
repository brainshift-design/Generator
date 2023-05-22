class GStroke
extends GOperator
{
    input  = null;

    fill   = null;
    weight = null;
    fit    = null;
    join   = null;
    miter  = null;



    constructor(nodeId, options)
    {
        super(STROKE, nodeId, options);
    }



    copy()
    {
        const copy = new GStroke(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.fill  ) copy.fill   = this.fill  .copy();
        if (this.weight) copy.weight = this.weight.copy();
        if (this.fit   ) copy.fit    = this.fit   .copy();
        if (this.join  ) copy.join   = this.join  .copy();
        if (this.miter ) copy.miter  = this.miter .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        let fill = this.fill ? (await this.fill.eval(parse)).toValue() : null;

        fill = this.validateFill(fill);


        const weight = this.weight ? (await this.weight.eval(parse)).toValue() : null;
        const fit    = this.fit    ? (await this.fit   .eval(parse)).toValue() : null;
        const join   = this.join   ? (await this.join  .eval(parse)).toValue() : null;
        const miter  = this.miter  ? (await this.miter .eval(parse)).toValue() : null;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new StrokeValue(
                fill   ?? input.fill,
                weight ?? input.weight,
                fit    ?? input.fit,
                join   ?? input.join,
                miter  ?? input.miter);
        }
        else
        {
            this.value = new StrokeValue(
                fill, 
                weight, 
                fit, 
                join,
                miter);
        }


        this.updateValues =
        [
            ['fill',   this.value.fill  ],
            ['weight', this.value.weight],
            ['fit',    this.value.fit   ],
            ['join',   this.value.join  ],
            ['miter',  this.value.miter ]
        ];
        

        this.validate();

        return this;
    }



    validateFill(fill)
    {
        if (!fill)
            return null;


        if (fill.type == COLOR_VALUE)
            return FillValue.fromRgb(scaleRgb(fill.toRgb()), 0xff);
        else
            return fill;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input ) this.input .pushValueUpdates(parse);
        if (this.fill  ) this.fill  .pushValueUpdates(parse);
        if (this.weight) this.weight.pushValueUpdates(parse);
        if (this.fit   ) this.fit   .pushValueUpdates(parse);
        if (this.join  ) this.join  .pushValueUpdates(parse);
        if (this.miter ) this.miter .pushValueUpdates(parse);
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
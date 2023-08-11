class GStroke
extends GOperator1
{
    fills  = null;
    weight = null;
    fit    = null;
    join   = null;
    miter  = null;
    cap    = null;
    dashes = null;



    constructor(nodeId, options)
    {
        super(STROKE, nodeId, options);
    }



    copy()
    {
        const copy = new GStroke(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.fills ) copy.fills  = this.fills .copy();
        if (this.weight) copy.weight = this.weight.copy();
        if (this.fit   ) copy.fit    = this.fit   .copy();
        if (this.join  ) copy.join   = this.join  .copy();
        if (this.miter ) copy.miter  = this.miter .copy();
        if (this.cap   ) copy.cap    = this.cap   .copy();
        if (this.dashes) copy.dashes = this.dashes.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        let fills = this.fills ? (await this.fills.eval(parse)).toValue() : null;

        fills = this.validateFills(fills);


        const weight = this.weight ? (await this.weight.eval(parse)).toValue() : null;
        const fit    = this.fit    ? (await this.fit   .eval(parse)).toValue() : null;
        const join   = this.join   ? (await this.join  .eval(parse)).toValue() : null;
        const miter  = this.miter  ? (await this.miter .eval(parse)).toValue() : null;
        const cap    = this.cap    ? (await this.cap   .eval(parse)).toValue() : null;
        const dashes = this.dashes ? (await this.dashes.eval(parse)).toValue() : null;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new StrokeValue(
                fills  ?? input.fills,
                weight ?? input.weight,
                fit    ?? input.fit,
                join   ?? input.join,
                miter  ?? input.miter,
                cap    ?? input.cap,
                dashes ?? input.dashes);
        }
        else
        {
            this.value = new StrokeValue(
                fills, 
                weight, 
                fit, 
                join,
                miter,
                cap,
                dashes);
        }


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);
        

        if (!this.weight) this.weight = this.value.weight.copy();
        if (!this.fit   ) this.fit    = this.value.fit   .copy();
        if (!this.join  ) this.join   = this.value.join  .copy();
        if (!this.miter ) this.miter  = this.value.miter .copy();
        if (!this.cap   ) this.cap    = this.value.cap   .copy();
        if (!this.dashes) this.dashes = this.value.dashes.copy();


        this.validate();

        return this;
    }



    validateFills(fills)
    {
        if (!fills)
            return null;

            
        if (fills.type == COLOR_VALUE)
            return new ListValue([FillValue.fromRgb(scaleRgb(fills.toRgb()), 255)]);

        else if (fills.type ==     FILL_VALUE
              || fills.type == GRADIENT_VALUE)
            return new ListValue([fills]);
        else
        {
            consoleAssert(fills.type == LIST_VALUE, 'stroke.fills must be a LIST_VALUE');
            return fills;
        }
    }



    toValue()
    {
        return new StrokeValue(
            this.options.enabled
            ? this.validateFills(this.fills ? this.fills.toValue() : this.input.fills.toValue())
            : new ListValue(),
            this.weight ? this.weight.toValue() : this.input.weight.toValue(),
            this.fit    ? this.fit   .toValue() : this.input.fit   .toValue(),
            this.join   ? this.join  .toValue() : this.input.join  .toValue(),
            this.miter  ? this.miter .toValue() : this.input.miter .toValue(),
            this.cap    ? this.cap   .toValue() : this.input.cap   .toValue(),
            this.dashes ? this.dashes.toValue() : this.input.dashes.toValue());
    }                 



    isValid()
    {
        return super.isValid()
            && this.fills  && this.fills .isValid()
            && this.weight && this.weight.isValid()
            && this.fit    && this.fit   .isValid()
            && this.join   && this.join  .isValid()
            && this.miter  && this.miter .isValid()
            && this.cap    && this.cap   .isValid()
            && this.dashes && this.dashes.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.fills ) this.fills .pushValueUpdates(parse);
        if (this.weight) this.weight.pushValueUpdates(parse);
        if (this.fit   ) this.fit   .pushValueUpdates(parse);
        if (this.join  ) this.join  .pushValueUpdates(parse);
        if (this.miter ) this.miter .pushValueUpdates(parse);
        if (this.cap   ) this.cap   .pushValueUpdates(parse);
        if (this.dashes) this.dashes.pushValueUpdates(parse);
    }    
    
    

    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.fills ) this.fills .invalidateInputs(from);
        if (this.weight) this.weight.invalidateInputs(from);
        if (this.fit   ) this.fit   .invalidateInputs(from);
        if (this.join  ) this.join  .invalidateInputs(from);
        if (this.miter ) this.miter .invalidateInputs(from);
        if (this.cap   ) this.cap   .invalidateInputs(from);
        if (this.dashes) this.dashes.invalidateInputs(from);
    }
}
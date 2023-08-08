class GColorStop
extends GOperator1
{
    fill     = null;
    position = null;



    constructor(nodeId, options)
    {
        super(COLOR_STOP, nodeId, options);
    }



    copy()
    {
        const copy = new GColorStop(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.fill    ) copy.fill     = this.fill    .copy();
        if (this.position) copy.position = this.position.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        let fill = this.fill ? (await this.fill.eval(parse)).toValue() : null;

        fill = this.validateFill(fill);


        const position = this.position ? (await this.position.eval(parse)).toValue() : null;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new ColorStopValue(
                fill     ?? input.fill,
                position ?? input.position);
        }
        else
        {
            this.value = new ColorStopValue(
                fill, 
                position);
        }


        this.setUpdateValues(parse, 
        [
            ['value', this.value]
        ]);
        

        if (!this.fill    ) this.fill     = this.value.fill    .copy();
        if (!this.position) this.position = this.value.position.copy();


        this.validate();

        return this;
    }



    validateFill(fill)
    {
        if (!fill)
            return null;


        if (fill.type == COLOR_VALUE)
            return FillValue.fromRgb(scaleRgb(fill.toRgb()), 100);
        else
            return fill;
    }



    toValue()
    {
        return new ColorStopValue(
            this.options.enabled
            ? this.validateFill(this.fill ? this.fill.toValue() : this.input.fill.toValue())
            : FillValue.NaN,
            this.position ? this.position.toValue() : this.input.position.toValue());
    }                 



    isValid()
    {
        return this.fill    .isValid()
            && this.position.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.fill    ) this.fill    .pushValueUpdates(parse);
        if (this.position) this.position.pushValueUpdates(parse);
    }    

    
    
    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.fill    ) this.fill    .invalidateInputs(from);
        if (this.position) this.position.invalidateInputs(from);
    }
}
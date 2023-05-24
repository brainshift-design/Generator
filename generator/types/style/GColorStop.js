class GColorStop
extends GOperator
{
    input    = null;

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

        if (this.input) 
            copy.input = this.input.copy();

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


        this.updateValues =
        [
            ['fill',     this.value.fill    ],
            ['position', this.value.position]
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

        if (this.input   ) this.input   .pushValueUpdates(parse);
        if (this.fill    ) this.fill    .pushValueUpdates(parse);
        if (this.position) this.position.pushValueUpdates(parse);
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



    invalidate()
    {
        super.invalidate();

        if (this.input   ) this.input   .invalidate();
        if (this.fill    ) this.fill    .invalidate();
        if (this.position) this.position.invalidate();
    }
}
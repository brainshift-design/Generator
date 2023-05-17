class GFill
extends GOperator
{
    input   = null;

    color   = null;
    opacity = null;



    constructor(nodeId, options)
    {
        super(FILL, nodeId, options);
    }



    copy()
    {
        const copy = new GFill(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.color  ) copy.color   = this.color  .copy();
        if (this.opacity) copy.opacity = this.opacity.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
``

        const color   = this.color   ? (await this.color  .eval(parse)).toValue() : null;
        const opacity = this.opacity ? (await this.opacity.eval(parse)).toValue() : null;

        
        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new FillValue(
                color   ?? input.color,
                opacity ?? input.opacity);
        }
        else
        {
            this.value = new FillValue(color, opacity);
        }


        this.updateValues =
        [
            ['color',   this.value.color  ],
            ['opacity', this.value.opacity]
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input  ) this.input  .pushValueUpdates(parse);
        if (this.color  ) this.color  .pushValueUpdates(parse);
        if (this.opacity) this.opacity.pushValueUpdates(parse);
    }
    
    
    
    toValue()
    {
        return this.options.enabled
            ? new FillValue(
                this.color   ? this.color  .toValue() : this.input.color  .toValue(),
                this.opacity ? this.opacity.toValue() : this.input.opacity.toValue())
            : FillValue.NaN;
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input  ) this.input  .invalidate();
        if (this.color  ) this.color  .invalidate();
        if (this.opacity) this.opacity.invalidate();
    }
}
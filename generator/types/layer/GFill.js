class GFill
extends GOperator1
{
    color   = null;
    opacity = null;
    blend   = null;



    constructor(nodeId, options)
    {
        super(FILL, nodeId, options);
    }



    copy()
    {
        const copy = new GFill(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.color  ) copy.color   = this.color  .copy();
        if (this.opacity) copy.opacity = this.opacity.copy();
        if (this.blend  ) copy.blend   = this.blend  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let color   = this.color   ? (await this.color  .eval(parse)).toValue() : null;
        let opacity = this.opacity ? (await this.opacity.eval(parse)).toValue() : null;
        let blend   = this.blend   ? (await this.blend  .eval(parse)).toValue() : null;

        
        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new FillValue(
                color   ?? input.color,
                opacity ?? input.opacity,
                blend   ?? input.blend);
        }
        else
        {
            this.value = new FillValue(
                color, 
                opacity,
                blend);
        }


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);
        

        if (!this.color  ) this.color   = this.value.color  .copy();
        if (!this.opacity) this.opacity = this.value.opacity.copy();
        if (!this.blend  ) this.blend   = this.value.blend  .copy();


        this.validate();

        return this;
    }



    toValue()
    {
        return this.options.enabled
            ? new FillValue(
                this.color   ? this.color  .toValue() : this.input.value.color  .toValue(),
                this.opacity ? this.opacity.toValue() : this.input.value.opacity.toValue(),
                this.blend   ? this.blend  .toValue() : this.input.value.blend  .toValue())
            : FillValue.NaN;
    }



    isValid()
    {
        return (!this.input || this.input.isValid())
            && this.color   && this.color  .isValid()
            && this.opacity && this.opacity.isValid()
            && this.blend   && this.blend  .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.color  ) this.color  .pushValueUpdates(parse);
        if (this.opacity) this.opacity.pushValueUpdates(parse);
        if (this.blend  ) this.blend  .pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.color  ) this.color  .invalidateInputs(from);
        if (this.opacity) this.opacity.invalidateInputs(from);
        if (this.blend  ) this.blend  .invalidateInputs(from);
    }
}
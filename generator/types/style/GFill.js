class GFill
extends GOperator
{
    input   = null;

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

        if (this.input) 
            copy.input = this.input.copy();

        if (this.color  ) copy.color   = this.color  .copy();
        if (this.opacity) copy.opacity = this.opacity.copy();
        if (this.blend  ) copy.blend   = this.blend  .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
``

        const color   = this.color   ? (await this.color  .eval(parse)).toValue() : null;
        const opacity = this.opacity ? (await this.opacity.eval(parse)).toValue() : null;
        const blend   = this.blend   ? (await this.blend  .eval(parse)).toValue() : null;

        
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


        this.updateValues =
        [
            ['color',   this.value.color  ],
            ['opacity', this.value.opacity],
            ['blend',   this.value.blend  ]
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
        if (this.blend  ) this.blend  .pushValueUpdates(parse);
    }
    
    
    
    toValue()
    {
        return this.options.enabled
            ? new FillValue(
                this.color   ? this.color  .toValue() : this.input.color  .toValue(),
                this.opacity ? this.opacity.toValue() : this.input.opacity.toValue(),
                this.blend   ? this.blend  .toValue() : this.input.blend  .toValue())
            : FillValue.NaN;
    }



    isValid()
    {
        return this.color  .isValid()
            && this.opacity.isValid()
            && this.blend  .isValid();
    }



    invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.input  ) this.input  .invalidateInputs(from);
        if (this.color  ) this.color  .invalidateInputs(from);
        if (this.opacity) this.opacity.invalidateInputs(from);
        if (this.blend  ) this.blend  .invalidateInputs(from);
    }
}
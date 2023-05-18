class GInnerShadow
extends GOperator
{
    input  = null;

    x      = null;
    y      = null;
    blur   = null;
    spread = null;
    fill   = null;
    blend  = null;



    constructor(nodeId, options)
    {
        super(INNER_SHADOW, nodeId, options);
    }



    copy()
    {
        const copy = new GInnerShadow(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.x     ) copy.x      = this.x     .copy();
        if (this.y     ) copy.y      = this.y     .copy();
        if (this.blur  ) copy.blur   = this.blur  .copy();
        if (this.spread) copy.spread = this.spread.copy();
        if (this.fill  ) copy.fill   = this.fill  .copy();
        if (this.blend ) copy.blend  = this.blend .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
``

        const x      = this.x      ? (await this.x     .eval(parse)).toValue() : null;
        const y      = this.y      ? (await this.y     .eval(parse)).toValue() : null;
        const blur   = this.blur   ? (await this.blur  .eval(parse)).toValue() : null;
        const spread = this.spread ? (await this.spread.eval(parse)).toValue() : null;
        const fill   = this.fill   ? (await this.fill  .eval(parse)).toValue() : null;
        const blend  = this.blend  ? (await this.blend .eval(parse)).toValue() : null;

        
        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new InnerShadowValue(
                x      ?? input.x,
                y      ?? input.y,
                blur   ?? input.blur,
                spread ?? input.spread,
                fill   ?? input.fill,
                blend  ?? input.blend,
                this.options.enabled);
        }
        else
        {
            this.value = new InnerShadowValue(
                x, 
                y, 
                blur, 
                spread, 
                fill, 
                blend,
                this.options.enabled);
        }


        this.updateValues =
        [
            ['x',      this.value.x     ],
            ['y',      this.value.y     ],
            ['blur',   this.value.blur  ],
            ['spread', this.value.spread],
            ['fill',   this.value.fill  ],
            ['blend',  this.value.blend ],
        ];
        

        this.validate();

        return this;
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input ) this.input .pushValueUpdates(parse);
        if (this.x     ) this.x     .pushValueUpdates(parse);
        if (this.y     ) this.y     .pushValueUpdates(parse);
        if (this.blur  ) this.blur  .pushValueUpdates(parse);
        if (this.spread) this.spread.pushValueUpdates(parse);
        if (this.fill  ) this.fill  .pushValueUpdates(parse);
        if (this.blend ) this.blend .pushValueUpdates(parse);
    }
    
    
    
    toValue()
    {
        return new InnerShadowValue(
            this.x      ? this.x     .toValue() : this.input.x     .toValue(),
            this.y      ? this.y     .toValue() : this.input.y     .toValue(),
            this.blur   ? this.blur  .toValue() : this.input.blur  .toValue(),
            this.spread ? this.spread.toValue() : this.input.spread.toValue(),
            this.fill   ? this.fill  .toValue() : this.input.fill  .toValue(),
            this.blend  ? this.blend .toValue() : this.input.blend .toValue(),
            this.options.enabled);
    }



    isValid()
    {
        return this.x     .isValid()
            && this.y     .isValid()
            && this.blur  .isValid()
            && this.spread.isValid()
            && this.fill  .isValid()
            && this.blend .isValid();
    }



    invalidate()
    {
        super.invalidate();

        if (this.input ) this.input .invalidate();
        if (this.x     ) this.x     .invalidate();
        if (this.y     ) this.y     .invalidate();
        if (this.blur  ) this.blur  .invalidate();
        if (this.spread) this.spread.invalidate();
        if (this.fill  ) this.fill  .invalidate();
        if (this.blend ) this.blend .invalidate();
    }
}
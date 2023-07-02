class GDropShadow
extends GOperator1
{
    x      = null;
    y      = null;
    blur   = null;
    spread = null;
    fill   = null;
    blend  = null;
    behind = null;



    constructor(nodeId, options)
    {
        super(DROP_SHADOW, nodeId, options);
    }



    copy()
    {
        const copy = new GDropShadow(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.x     ) copy.x      = this.x     .copy();
        if (this.y     ) copy.y      = this.y     .copy();
        if (this.blur  ) copy.blur   = this.blur  .copy();
        if (this.spread) copy.spread = this.spread.copy();
        if (this.fill  ) copy.fill   = this.fill  .copy();
        if (this.blend ) copy.blend  = this.blend .copy();
        if (this.behind) copy.behind = this.behind.copy();

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
        const behind = this.behind ? (await this.behind.eval(parse)).toValue() : null;

        
        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new DropShadowValue(
                x      ?? input.x,
                y      ?? input.y,
                blur   ?? input.blur,
                spread ?? input.spread,
                fill   ?? input.fill,
                blend  ?? input.blend,
                behind ?? input.behind,
                this.options.enabled);
        }
        else
        {
            this.value = new DropShadowValue(
                x, 
                y, 
                blur, 
                spread, 
                fill, 
                blend, 
                behind,
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
            ['behind', this.value.behind]
        ];
        

        this.validate();

        return this;
    }



    toValue()
    {
        return new DropShadowValue(
            this.x      ? this.x     .toValue() : this.input.x     .toValue(),
            this.y      ? this.y     .toValue() : this.input.y     .toValue(),
            this.blur   ? this.blur  .toValue() : this.input.blur  .toValue(),
            this.spread ? this.spread.toValue() : this.input.spread.toValue(),
            this.fill   ? this.fill  .toValue() : this.input.fill  .toValue(),
            this.blend  ? this.blend .toValue() : this.input.blend .toValue(),
            this.behind ? this.behind.toValue() : this.input.behind.toValue(),
            this.options.enabled);
    }



    isValid()
    {
        return this.x     .isValid()
            && this.y     .isValid()
            && this.blur  .isValid()
            && this.spread.isValid()
            && this.fill  .isValid()
            && this.blend .isValid()
            && this.behind.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.x     ) this.x     .pushValueUpdates(parse);
        if (this.y     ) this.y     .pushValueUpdates(parse);
        if (this.blur  ) this.blur  .pushValueUpdates(parse);
        if (this.spread) this.spread.pushValueUpdates(parse);
        if (this.fill  ) this.fill  .pushValueUpdates(parse);
        if (this.blend ) this.blend .pushValueUpdates(parse);
        if (this.behind) this.behind.pushValueUpdates(parse);
    }
    
    
    
   invalidateInputs(from)
    {
        super.invalidateInputs(from);

        if (this.x     ) this.x     .invalidateInputs(from);
        if (this.y     ) this.y     .invalidateInputs(from);
        if (this.blur  ) this.blur  .invalidateInputs(from);
        if (this.spread) this.spread.invalidateInputs(from);
        if (this.fill  ) this.fill  .invalidateInputs(from);
        if (this.blend ) this.blend .invalidateInputs(from);
        if (this.behind) this.behind.invalidateInputs(from);
    }
}
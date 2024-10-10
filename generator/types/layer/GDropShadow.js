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

    
    
    reset()
    {
        super.reset();
        
        this.x      = null;
        this.y      = null;
        this.blur   = null;
        this.spread = null;
        this.fill   = null;
        this.blend  = null;
        this.behind = null;
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


        const input  = await evalValue      (this.input,  parse);
        const x      = await evalNumberValue(this.x,      parse);
        const y      = await evalNumberValue(this.y,      parse);
        const blur   = await evalNumberValue(this.blur,   parse);
        const spread = await evalNumberValue(this.spread, parse);
        let   fill   = await evalFillValue  (this.fill,   parse);
        const blend  = await evalNumberValue(this.blend,  parse);
        const behind = await evalNumberValue(this.behind, parse);


        if (   fill
            && fill.type == COLOR_VALUE)
            fill = new FillValue(fill);

        
        if (input)
        {
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


        this.setUpdateValues(parse,
        [
            ['x',      this.value.x     ],
            ['y',      this.value.y     ],
            ['blur',   this.value.blur  ],
            ['spread', this.value.spread],
            ['fill',   this.value.fill  ],
            ['blend',  this.value.blend ],
            ['behind', this.value.behind]
        ]);
        

        if (!this.x     ) this.x      = this.value.x     .copy();
        if (!this.y     ) this.y      = this.value.y     .copy();
        if (!this.blur  ) this.blur   = this.value.blur  .copy();
        if (!this.spread) this.spread = this.value.spread.copy();
        if (!this.fill  ) this.fill   = this.value.fill  .copy();
        if (!this.blend ) this.blend  = this.value.blend .copy();
        if (!this.behind) this.behind = this.value.behind.copy();


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value
             ? this.value.copy()
             : null;
    }



    isValid()
    {
        return super.isValid()
            && this.x      && this.x     .isValid()
            && this.y      && this.y     .isValid()
            && this.blur   && this.blur  .isValid()
            && this.spread && this.spread.isValid()
            && this.fill   && this.fill  .isValid()
            && this.blend  && this.blend .isValid()
            && this.behind && this.behind.isValid();
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
    
    
    
   invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.x     ) this.x     .invalidateInputs(parse, from, force);
        if (this.y     ) this.y     .invalidateInputs(parse, from, force);
        if (this.blur  ) this.blur  .invalidateInputs(parse, from, force);
        if (this.spread) this.spread.invalidateInputs(parse, from, force);
        if (this.fill  ) this.fill  .invalidateInputs(parse, from, force);
        if (this.blend ) this.blend .invalidateInputs(parse, from, force);
        if (this.behind) this.behind.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.x     ) this.x     .iterateLoop(parse);
        if (this.y     ) this.y     .iterateLoop(parse);
        if (this.blur  ) this.blur  .iterateLoop(parse);
        if (this.spread) this.spread.iterateLoop(parse);
        if (this.fill  ) this.fill  .iterateLoop(parse);
        if (this.blend ) this.blend .iterateLoop(parse);
        if (this.behind) this.behind.iterateLoop(parse);
    }
}
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



    reset()
    {
        super.reset();

        this.color   = null;
        this.opacity = null;
        this.blend   = null;
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



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'color':   return this.input ? this.value.color   : this.color;
            case 'opacity': return this.input ? this.value.opacity : this.opacity;
            case 'blend':   return this.input ? this.value.blend   : this.blend;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input   = await evalFillValue  (this.input,   parse);
        let   color   = await evalColorValue (this.color,   parse);
        let   opacity = await evalNumberValue(this.opacity, parse);
        let   blend   = await evalNumberValue(this.blend,   parse);


        if (input)
        {
            this.value        = input.toValue();
            this.value.nodeId = this.nodeId;

            this.value.copyCustomParams(input);

            if (color  )  this.value.color   = color;    else  color   = this.value.color;
            if (opacity)  this.value.opacity = opacity;  else  opacity = this.value.opacity;
            if (blend  )  this.value.blend   = blend;    else  blend   = this.value.blend;
        }
        else if ((!color   || color  .type == COLOR_VALUE )
              && (!opacity || opacity.type == NUMBER_VALUE)
              && (!blend   || blend  .type == NUMBER_VALUE))
        {
            this.value = new FillValue(
                color, 
                opacity,
                blend);
        }
        else
            this.value = FillValue.NaN.copy();


        this.setUpdateValues(parse,
        [
            ['value',   this.value],
            ['color',   color     ],
            ['opacity', opacity   ],
            ['blend',   blend     ]
        ]);
        

        // if (!this.color  ) this.color   = this.value.color  .copy();
        // if (!this.opacity) this.opacity = this.value.opacity.copy();
        // if (!this.blend  ) this.blend   = this.value.blend  .copy();


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
            : FillValue.NaN.copy();
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
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.color  ) this.color  .invalidateInputs(parse, from, force);
        if (this.opacity) this.opacity.invalidateInputs(parse, from, force);
        if (this.blend  ) this.blend  .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.color  ) this.color  .iterateLoop(parse);
        if (this.opacity) this.opacity.iterateLoop(parse);
        if (this.blend  ) this.blend  .iterateLoop(parse);
    }
}
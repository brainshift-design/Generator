class GColorStop
extends GOperator1
{
    fill     = null;
    position = null;



    constructor(nodeId, options)
    {
        super(COLOR_STOP, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.fill     = null;
        this.position = null;
    }



    copy()
    {
        const copy = new GColorStop(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.fill    ) copy.fill     = this.fill    .copy();
        if (this.position) copy.position = this.position.copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'fill':      return this.input ? this.value.fill     : this.fill;
            case 'position':  return this.input ? this.value.position : this.position;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
        
        
        const input    = await evalColorStopValue(this.input,    parse);
        let   fill     = await evalFillValue     (this.fill,     parse);
        let   position = await evalNumberValue   (this.position, parse);
        
        fill = this.validateFill(fill);


        if (input)
        {
            this.value        = input.toNewValue();
            this.value.nodeId = this.nodeId;

            this.value.copyCustomParams(input);

            if (fill    )  this.value.fill     = fill;      else  fill     = this.value.fill;
            if (position)  this.value.position = position;  else  position = this.value.position;
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



    toNewValue()
    {
        return new ColorStopValue(
            this.options.enabled
            ? this.validateFill(this.fill ? this.fill.toNewValue() : this.input.fill.toNewValue())
            : FillValue.NaN(),
            this.position ? this.position.toNewValue() : this.input.position.toNewValue());
    }                 



    isValid()
    {
        return (!this.input || this.input.isValid())
            && this.fill     && this.fill    .isValid()
            && this.position && this.position.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.fill    ) this.fill    .pushValueUpdates(parse);
        if (this.position) this.position.pushValueUpdates(parse);
    }    

    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.fill    ) this.fill    .invalidateInputs(parse, from, force);
        if (this.position) this.position.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.fill    ) this.fill    .iterateLoop(parse);
        if (this.position) this.position.iterateLoop(parse);
    }
}
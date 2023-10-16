class GConvertP3
extends GOperator1
{
    from = null;



    constructor(nodeId, options)
    {
        super(COLOR_CONVERT_P3, nodeId, options);
    }


    
    reset()
    {
        super.reset();

        this.from = null;
    }



    copy()
    {
        const copy = new GConvertP3(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.value) copy.value = this.value.copy();
        if (this.from ) copy.from  = this.from .copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const from = this.from ? (await this.from.eval(parse)).toValue().toInteger() : null;


        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            if (this.options.enabled)
            {
                this.value = ColorValue.fromRgb(
                    from.value == 0 
                    ? scaleRgb(srgb2p3(input.toRgb()))
                    : scaleRgb(p32srgb(input.toRgb())));
            }
            else
                this.value = input;
        }
        else
            this.value = ColorValue.NaN.copy();


        
        this.setUpdateValues(parse,
        [
            ['value',   this.value],
            ['quality', from      ]
        ]);

        
        this.validate();

        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.from && this.from.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.from) this.from.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.from) this.from.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.from) this.from.iterateLoop(parse);
    }
}

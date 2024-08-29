class GColorDeltaE
extends GOperator2
{
    constructor(nodeId, options)
    {
        super(COLOR_DELTA_E, nodeId, options);
    }



    copy()
    {
        const copy = new GColorDeltaE(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const input0 = await evalColorValue(this.input0, parse);
        const input1 = await evalColorValue(this.input1, parse);

        
        if (   input0 && input0.type == COLOR_VALUE 
            && input1 && input1.type == COLOR_VALUE)
        {
            if (   input0.isValid()
                && input1.isValid())
                this.value = new NumberValue(deltaE(input0.toRgb(), input1.toRgb()) * 100, 1);
            else
                this.value = NumberValue.NaN.copy();
        }
        else
            this.value = NumberValue.NaN.copy();
        

        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['value', this.value       ]
        ],
        true);


        this.validate();


        return this;
    }



    isValid()
    {
        return super.isValid()
            && this.standard && this.standard.isValid()
            && (!this.contrast || this.contrast.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.standard) this.standard.pushValueUpdates(parse);
        if (this.contrast) this.contrast.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.standard) this.standard.invalidateInputs(parse, from, force);
        if (this.contrast) this.contrast.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.standard) this.standard.iterateLoop(parse);
        if (this.contrast) this.contrast.iterateLoop(parse);
    }
}

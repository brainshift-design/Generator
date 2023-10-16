class GBackBlur
extends GOperator1
{
    radius = null;



    constructor(nodeId, options)
    {
        super(BACK_BLUR, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.radius = null;
    }



    copy()
    {
        const copy = new GBackBlur(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.radius) copy.radius = this.radius.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;
``

        const radius = this.radius ? (await this.radius.eval(parse)).toValue() : null;

        
        if (this.input)
        {
            const input = (await this.input.eval(parse)).toValue();

            this.value = new BackBlurValue(
                radius ?? input.radius,
                this.options.enabled);
        }
        else
        {
            this.value = new BackBlurValue(
                radius,
                this.options.enabled);
        }


        this.setUpdateValues(parse,
        [
            ['radius', this.value.radius]
        ]);
        

        if (!this.radius) this.radius = this.value.radius.copy();


        this.validate();

        return this;
    }



    toValue()
    {
        return new BackBlurValue(
            this.radius ? this.radius.toValue() : this.input.radius.toValue(),
            this.options.enabled);
    }



    isValid()
    {
        return super.isValid()
            && this.radius && this.radius.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.radius) this.radius.pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.radius) this.radius.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.radius) this.radius.iterateLoop(parse);
    }
}
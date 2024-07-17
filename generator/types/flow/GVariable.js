class GVariable
extends GOperator
{
    varValue = null;



    constructor(nodeId, options)
    {
        super(VARIABLE, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.varValue = null;
    }



    copy()
    {
        const copy = new GColorStyle(this.nodeId, this.options);

        if (this.varValue) copy.varValue = this.varValue.copy();
        
        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

        
        this.value = 
            this.varValue
            ? (await this.varValue.eval(parse)).toValue()
            : new NullValue();


        this.setUpdateValues(parse,
        [
            ['value', this.value]
        ]);


        this.validate();

        return this;
    }



    evalVariable(options = {})
    {
        if (!this.options.enabled)
            return;
    }



    isValid()
    {
        return this.varValue && this.varValue.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.varValue) this.varValue.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.varValue) this.varValue.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.varValue) this.varValue.iterateLoop(parse);
    }
}
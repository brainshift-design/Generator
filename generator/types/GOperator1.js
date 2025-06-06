class GOperator1
extends GOperator
{
    input = null;



    reset()
    {
        super.reset();

        this.input = null;
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.input) this.input = base.input.copy();
    }



    isCached()
    {
        return super.isCached()
            && (  !this.input 
                || this.input.isCached());
    }



    isValid()
    {
        return this.input && this.input.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input) this.input.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input) this.input.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input) this.input.iterateLoop(parse);
    }



    getConditionNode()
    {
        if (    this.input
            &&  this.input.getConditionNode
            && !this.input.notCondition)
            return this.input.getConditionNode();
        
        return this;
    }



    setConditionInput(input)
    {
        this.input = input;
    }
}
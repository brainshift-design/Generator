class GArithmetic
extends GOperator
{
    inputs = [];



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    isValid()
    {
        return  this.inputs.length > 0
            && !this.inputs.find(i => !i.isValid());
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        this.inputs.forEach(i => i.invalidateInputs(parse, from));
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        this.inputs.forEach(i => i.iterateLoop(parse));
    }
}

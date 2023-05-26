class GArithmetic
extends GNumberType
{
    inputs = [];



    isCached()
    {
        for (const input of this.inputs)
            if (!input.isCached())
                return false;

        return super.isCached();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        this.inputs.forEach(i => i.pushValueUpdates(parse));
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        this.inputs.forEach(i => i.invalidateInputs());
    }
}

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



    invalidate()
    {
        super.invalidate();

        this.inputs.forEach(i => i.invalidate());
    }
}

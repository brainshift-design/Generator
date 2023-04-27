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



    invalidate()
    {
        super.invalidate();

        this.inputs.forEach(i => i.invalidate());
    }
}

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
}

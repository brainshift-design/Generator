class GNumberType
extends GOperator
{
    value;
    


    copyBase(base)
    {
        super.copyBase(base);

        if (base.value) this.value = base.value.copy();
    }



    toValue()
    {
        return this.value.copy();
    }
}
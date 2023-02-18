class GNumberType
extends GOperator
{
    value;
    


    copyBase(src)
    {
        super.copyBase(src);

        if (src.value) this.value = src.value.copy();
    }



    toValue()
    {
        return this.value.copy();
    }
}
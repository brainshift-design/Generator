class GColorType
extends GOperator
{
    value;
    


    copyBase(src)
    {
        super.copyBase(src);

        this.value = src.value.copy();
    }



    toValue()
    {
        return this.value.copy();
    }
}
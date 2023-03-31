class GTextType
extends GOperator
{
    value = null;
    


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
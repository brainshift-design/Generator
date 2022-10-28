class GNumberType
extends GOperator
{
    value;
    


    toValue()
    {
        return new NumberValue(
            this.value.value,
            this.value.decimals);
    }
}
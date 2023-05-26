class GConditionBase
extends GNumberType
{
    input0 = null;
    input1 = null;



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input0) this.input0.pushValueUpdates(parse);
        if (this.input1) this.input1.pushValueUpdates(parse);
    }



    invalidateInputs()
    {
        super.invalidateInputs();

        if (this.input0) this.input0.invalidateInputs();
        if (this.input1) this.input1.invalidateInputs();
    }
}



async function evalConditionInputs(input0, input1, op, parse) 
{
    const val0 = input0 ? (await input0.eval(parse)).toValue() : NumberValue.NaN;
    const val1 = input1 ? (await input1.eval(parse)).toValue() : NumberValue.NaN;

    if (   val0.isValid() 
        && val1.isValid())
        return new NumberValue(op(val0.toNumber(), val1.toNumber()) ? 1 : 0);
    else                  
        return NumberValue.NaN;
}
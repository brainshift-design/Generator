class GConditionBase
extends GNumberType
{
    input0 = null;
    input1 = null;
}



async function evalConditionInputs(input0, input1, op, parse) 
{
    const val0 = input0 ? (await input0.eval(parse)).toValue() : NumberValue.NaN;
    const val1 = input1 ? (await input1.eval(parse)).toValue() : NumberValue.NaN;

    if (   input0 
        && input1)
        return new NumberValue(op(val0.toNumber(), val1.toNumber()) ? 1 : 0);
    else                  
        return NumberValue.NaN;
}
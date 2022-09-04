function logReqNumberValue(val, parse)
{
    parse.log += parse.tab + NUMBER_VALUE + ' ' + displayValue(NUMBER_VALUE, val);
}



function logReqNumber(num, parse)
{
    parse.log += parse.tab + NUMBER;
    parse.log += logReqNodeId(num);
}



function logReqLimits(lim, nValues, parse)
{
    parse.log += parse.tab + NUMBER_LIMITS;
    parse.log += logReqNodeId(lim);

    if (nValues > -1)
        parse.log += ' ' + nValues;
}



function logReqArithmetic(arith, type, nValues, parse)
{
    parse.log += parse.tab + type;
    parse.log += logReqNodeId(arith);
    parse.log += ' ' + nValues;
}



function logReqInterpolate(lerp, nValues, parse)
{
    parse.log += parse.tab + NUMBER_INTERPOLATE;
    parse.log += logReqNodeId(lerp);
    parse.log += ' ' + nValues;
}
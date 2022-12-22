function logReqNumberValue(val, parse)
{
    parse.log += parse.tab + NUMBER_VALUE + ' ' + displayValue(NUMBER_VALUE, val);
}



function logReqNumber(num, parse)
{
    parse.log += parse.tab + NUMBER;
    parse.log += logReqNodeId(num);
}



function logReqLimits(lim, nInputs, parse)
{
    parse.log += parse.tab + NUMBER_LIMITS;
    parse.log += logReqNodeId(lim);

    if (nInputs > -1)
        parse.log += ' ' + nInputs;
}



function logReqSeries(rnd, parse)
{
    parse.log += parse.tab + NUMBER_SERIES;
    parse.log += logReqNodeId(rnd);
}



function logReqRandom(rnd, parse)
{
    parse.log += parse.tab + NUMBER_RANDOM;
    parse.log += logReqNodeId(rnd);
}



function logReqMath(math, nInputs, parse)
{
    parse.log += parse.tab + NUMBER_MATH;
    parse.log += logReqNodeId(math);
    parse.log += ' ' + nInputs;
}



function logReqArithmetic(arith, type, nInputs, parse)
{
    parse.log += parse.tab + type;
    parse.log += logReqNodeId(arith);
    parse.log += ' ' + nInputs;
}



function logReqInterpolate(lerp, nInputs, parse)
{
    parse.log += parse.tab + NUMBER_INTERPOLATE;
    parse.log += logReqNodeId(lerp);
    parse.log += ' ' + nInputs;
}
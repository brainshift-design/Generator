function logReqNumberValue(val, parse, ignore)
{
    parse.log += parse.tab + NUMBER_VALUE + ' ' + displayValue(NUMBER_VALUE, val);
}



function logReqNumber(num, parse, ignore)
{
    parse.log += parse.tab + NUMBER;
    parse.log += logReqNodeId(num, ignore);
}



function logReqRound(round, nInputs, parse, ignore)
{
    parse.log += parse.tab + NUMBER_ROUND;
    parse.log += logReqNodeId(round, ignore);

    if (   !ignore
        && nInputs > -1)
        parse.log += ' ' + nInputs;
}



function logReqLimits(lim, nInputs, parse, ignore)
{
    parse.log += parse.tab + NUMBER_LIMITS;
    parse.log += logReqNodeId(lim, ignore);

    if (   !ignore
        && nInputs > -1)
        parse.log += ' ' + nInputs;
}



function logReqSeries(series, parse, ignore)
{
    parse.log += parse.tab + NUMBER_SERIES;
    parse.log += logReqNodeId(series, ignore);
}



function logReqRandom(rnd, parse, ignore)
{
    parse.log += parse.tab + NUMBER_RANDOM;
    parse.log += logReqNodeId(rnd, ignore);
}



function logReqMath(math, nInputs, parse, ignore)
{
    parse.log += parse.tab + NUMBER_MATH;
    parse.log += logReqNodeId(math, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqArithmetic(arith, type, nInputs, parse, ignore)
{
    parse.log += parse.tab + type;
    parse.log += logReqNodeId(arith, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqInterpolate(lerp, nInputs, parse, ignore)
{
    parse.log += parse.tab + NUMBER_INTERPOLATE;
    parse.log += logReqNodeId(lerp, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqBoolean(bool, nInputs, parse, ignore)
{
    parse.log += parse.tab + NUMBER_BOOLEAN;
    parse.log += logReqNodeId(bool, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqCondition(cond, nInputs, parse, ignore)
{
    parse.log += parse.tab + NUMBER_CONDITION;
    parse.log += logReqNodeId(cond, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqConditionBase(cond, type, nInputs, parse, ignore)
{
    parse.log += parse.tab + type;
    parse.log += logReqNodeId(cond, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}
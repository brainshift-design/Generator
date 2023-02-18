function logReqNumberValue(val, parse, ignore)
{
    parse.log += parse.tab + NUMBER_VALUE + ' ' + displayValue(NUMBER_VALUE, val);
}



// function logReqMath(math, nInputs, parse, ignore)
// {
//     parse.log += parse.tab + NUMBER_MATH;
//     parse.log += logReqNodeId(math, ignore);

//     if (!ignore)
//         parse.log += ' ' + nInputs;
// }



// function logReqArithmetic(arith, type, nInputs, parse, ignore)
// {
//     parse.log += parse.tab + type;
//     parse.log += logReqNodeId(arith, ignore);

//     if (!ignore)
//         parse.log += ' ' + nInputs;
// }



// function logReqInterpolate(lerp, nInputs, parse, ignore)
// {
//     parse.log += parse.tab + NUMBER_INTERPOLATE;
//     parse.log += logReqNodeId(lerp, ignore);

//     if (!ignore)
//         parse.log += ' ' + nInputs;
// }



// function logReqBoolean(bool, nInputs, parse, ignore)
// {
//     parse.log += parse.tab + NUMBER_BOOLEAN;
//     parse.log += logReqNodeId(bool, ignore);

//     if (!ignore)
//         parse.log += ' ' + nInputs;
// }



// function logReqCondition(cond, nInputs, parse, ignore)
// {
//     parse.log += parse.tab + NUMBER_CONDITION;
//     parse.log += logReqNodeId(cond, ignore);

//     if (!ignore)
//         parse.log += ' ' + nInputs;
// }



// function logReqConditionBase(cond, type, nInputs, parse, ignore)
// {
//     parse.log += parse.tab + type;
//     parse.log += logReqNodeId(cond, ignore);

//     if (!ignore)
//         parse.log += ' ' + nInputs;
// }
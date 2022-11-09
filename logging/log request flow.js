function logReqListValue(list, parse)
{
    parse.log += parse.tab + LIST_VALUE + ' ' + displayValue(LIST_VALUE, list);
}



function logReqList(list, nValues, parse)
{
    parse.log += parse.tab + NUMBER_MATH;
    parse.log += logReqNodeId(list);
    parse.log += ' ' + nValues;
}
function logReqList(list, nValues, parse)
{
    parse.log += parse.tab + NUMBER_MATH;
    parse.log += logReqNodeId(list);
    parse.log += ' ' + nValues;
}
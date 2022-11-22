function logReqListValue(list, parse)
{
    parse.log += parse.tab + LIST_VALUE + ' ' + displayValue(LIST_VALUE, list);
}



function logReqList(list, nValues, parse)
{
    parse.log += parse.tab + LIST;
    parse.log += logReqNodeId(list);
    parse.log += ' ' + nValues;
}



function logReqItems(items, parse)
{
    parse.log += parse.tab + ITEMS;
    parse.log += logReqNodeId(items);
}



function logReqRepeat(rep, nValues, parse)
{
    parse.log += parse.tab + REPEAT;
    parse.log += logReqNodeId(rep);
    parse.log += ' ' + nValues;
}
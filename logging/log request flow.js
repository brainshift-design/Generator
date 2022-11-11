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



function logReqListItems(list, nValues, parse)
{
    parse.log += parse.tab + LIST_ITEMS;
    parse.log += logReqNodeId(list);
    parse.log += ' ' + nValues;
}
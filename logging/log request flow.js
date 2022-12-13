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



function logReqItems(items, nValues, parse)
{
    parse.log += parse.tab + ITEMS;
    parse.log += logReqNodeId(items);
    parse.log += ' ' + nValues;
}



function logReqStart(rep, nValues, parse)
{
    parse.log += parse.tab + START;
    parse.log += logReqNodeId(rep);
    parse.log += ' ' + nValues;
}



function logReqRepeat(rep, nValues, parse)
{
    parse.log += parse.tab + REPEAT;
    parse.log += logReqNodeId(rep);
    parse.log += ' ' + nValues;
}



function logReqCache(rep, nValues, parse)
{
    parse.log += parse.tab + CACHE;
    parse.log += logReqNodeId(rep);
    parse.log += ' ' + nValues;
}
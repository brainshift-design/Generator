function logReqListValue(list, parse)
{
    parse.log += parse.tab + LIST_VALUE + ' ' + displayValue(LIST_VALUE, list);
}



function logReqList(list, nInputs, parse)
{
    parse.log += parse.tab + LIST;
    parse.log += logReqNodeId(list);
    parse.log += ' ' + nInputs;
}



function logReqItems(items, nInputs, parse)
{
    parse.log += parse.tab + ITEMS;
    parse.log += logReqNodeId(items);
    parse.log += ' ' + nInputs;
}



function logReqSelect(sel, nInputs, parse)
{
    parse.log += parse.tab + SELECT;
    parse.log += logReqNodeId(sel);
    parse.log += ' ' + nInputs;
}



function logReqStart(rep, nInputs, parse)
{
    parse.log += parse.tab + START;
    parse.log += logReqNodeId(rep);
    parse.log += ' ' + nInputs;
}



function logReqRepeat(rep, nInputs, parse)
{
    parse.log += parse.tab + REPEAT;
    parse.log += logReqNodeId(rep);
    parse.log += ' ' + nInputs;
}



function logReqCache(rep, nInputs, parse)
{
    parse.log += parse.tab + CACHE;
    parse.log += logReqNodeId(rep);
    parse.log += ' ' + nInputs;
}
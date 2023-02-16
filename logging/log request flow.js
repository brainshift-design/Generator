function logReqComment(cmnt, parse, ignore)
{
    parse.log += parse.tab + COMMENT;
    parse.log += logReqNodeId(cmnt, ignore);
}



function logReqListValue(list, parse, ignore)
{
    parse.log += parse.tab + LIST_VALUE + ' ' + displayValue(LIST_VALUE, list);
}



function logReqList(list, nInputs, parse, ignore)
{
    parse.log += parse.tab + LIST;
    parse.log += logReqNodeId(list, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqItems(items, nInputs, parse, ignore)
{
    parse.log += parse.tab + ITEMS;
    parse.log += logReqNodeId(items, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqSelect(sel, nInputs, parse, ignore)
{
    parse.log += parse.tab + SELECT;
    parse.log += logReqNodeId(sel, ignore);
    
    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqIfElse(ifElse, nInputs, parse, ignore)
{
    parse.log += parse.tab + IF_ELSE;
    parse.log += logReqNodeId(ifElse, ignore);
    
    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqStart(rep, nInputs, parse, ignore)
{
    parse.log += parse.tab + START;
    parse.log += logReqNodeId(rep, ignore);
    
    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqRepeat(rep, nInputs, parse, ignore)
{
    parse.log += parse.tab + REPEAT;
    parse.log += logReqNodeId(rep, ignore);
    
    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqCache(cache, nInputs, parse, ignore)
{
    parse.log += parse.tab + CACHE;
    parse.log += logReqNodeId(cache, ignore);
    
    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqCopy(copy, nInputs, parse, ignore)
{
    parse.log += parse.tab + COPY;
    parse.log += logReqNodeId(copy, ignore);
    
    if (!ignore)
        parse.log += ' ' + nInputs;
}
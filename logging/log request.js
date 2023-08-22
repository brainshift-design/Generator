function logRequest(parse)
{
    let log = '';

    if (   parse.updateNodeId  != '' 
        || parse.updateParamId != '')
        log = '↓ ' + logReqId(parse.updateNodeId) + '.' + logReqId(parse.updateParamId);

    log += parse.log;

    console.log(
        '%c%s', 
        'background: #60aa60; color: #fff', 
         log);
}



function logReq(node, parse, ignore, nInputs = -1)
{
    parse.log += parse.tab + node.type;
    parse.log += logReqNodeId(node, ignore);

    if (    nInputs > -1
        && !ignore)
        parse.log += ' ' + nInputs;
}



function logReqNodeId(node, ignore = false)
{
    return ' ' 
         + logReqId(node.nodeId) 
         + ' ' + logReqId(node.nodeName)
         + (!ignore
            ? logReqOptions(node)
            : '');
}



function logReqId(nodeId)
{
    return nodeId == '' ? '\'\'' : nodeId;
}



function logReqOptions(node)
{
    let log = '';

    if ( node.options.active      ) log += ' ' + ACTIVE;
    if ( node.options.beforeActive) log += ' ' + BEFORE_ACTIVE;
    if (!node.options.enabled     ) log += ' ' + DISABLED;

    if (!node.cached              ) log += ' ' + NOCACHE;

    return log;
}



function logReqParam(param, type, parse)
{
    parse.log += 
                parse.tab + PARAM
        + ' ' + type 
        + ' ' + logReqId(param.nodeId) 
        + '.' + logReqId(param.paramId);
}



function logReqNode(node, parse)
{
    parse.log += parse.tab + node.type;
    parse.log += logReqNodeId(node);
}



function logReqColorContrast(lerp, nInputs, valueIndex, parse, ignore)
{
    parse.log += parse.tab + COLOR_CONTRAST;
    parse.log += logReqNodeId(lerp, ignore);

    if (!ignore)
    {
        parse.log += ' ' + nInputs;

        if (nInputs == 1)
            parse.log += ' ' + valueIndex;
    }
}



function logReqValue(type, val, parse)
{
    parse.log += parse.tab + type + ' ' + displayValue(type, val);
}



// function logReqListValue(list, parse, ignore)
// {
//     parse.log += parse.tab + LIST_VALUE + ' ' + displayValue(LIST_VALUE, list);
// }



// function logReqColorValue(val, parse, ignore)
// {
//     parse.log += parse.tab + COLOR_VALUE + ' ' + displayValue(COLOR_VALUE, val);
// }



// function logReqNumberValue(val, parse, ignore)
// {
//     parse.log += parse.tab + NUMBER_VALUE + ' ' + displayValue(NUMBER_VALUE, val);
// }



// function logReqFillValue(fill, parse, ignore)
// {
//     parse.log += parse.tab + FILL_VALUE + ' ' + displayValue(FILL_VALUE, fill);
// }



// function logReqStrokeValue(stroke, parse, ignore)
// {
//     // parse.log += parse.tab + STROKE_VALUE + ' ' + displayValue(STROKE_VALUE, stroke);
// }



// function logReqColorStopValue(stop, parse, ignore)
// {
//     // parse.log += parse.tab + COLOR_STOP_VALUE + ' ' + displayValue(COLOR_STOP_VALUE, stop);
// }

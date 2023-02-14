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
    if (!node.options.cached      ) log += ' ' + NOCACHE;

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
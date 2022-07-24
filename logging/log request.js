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



function logReqNodeId(node)
{
    return ' ' 
         + logReqId(node.nodeId)
         + logReqActive(node);
}



function logReqId(nodeId)
{
    return nodeId == '' ? '\'\'' : nodeId;
}



function logReqActive(node)
{
    return node.active
         ? ' ' + ACTIVE
         : '';
}



function logReqParam(param, parse)
{
    parse.log += parse.tab + PARAM;
    parse.log += 
          ' ' + logReqId(param.nodeId) 
        + '.' + logReqId(param.paramId);
}



function logReqNode(node, type, parse)
{
    parse.log += parse.tab + type;
    parse.log += logReqNodeId(node);
}
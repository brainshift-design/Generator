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



function logReqParam(req)
{
    const tag     = req.request[req.pos++];
    const nodeId  = req.request[req.pos++];
    const paramId = req.request[req.pos++];

    const _nodeId = logReqId(nodeId);

    return req.tab + tag + ' ' + _nodeId + '.' + paramId;
}



function logReqNode(node, type, parse)
{
    parse.log += parse.tab + type;
    parse.log += logReqNodeId(node);
}



// function logReqNode(req, type, _paramIds)
// {
//     const tab = req.tab;

//     req.nTab++;


//     const tag    = req.request[req.pos++];
//     const nodeId = req.request[req.pos++];
//     const active = logReqActive(req);


//     let log = tab + tag + ' ' + nodeId + active;

//     let paramIds;


//     if (req.request[req.pos] == type)
//     {
//         log += logReq(req);
//         paramIds = req.request[req.pos++].split(',');
//     }
//     else
//         paramIds = _paramIds;
    

//     for (const i of paramIds)
//         log += logReq(req);


//     req.nTab--;

//     return log;
// }
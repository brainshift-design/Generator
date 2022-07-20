// function logReq(req)
// {
//     const next = req.request[req.pos];


//          if (next == PARAM             ) return logReqParam      (req);

//     else if (next == NUMBER_VALUE      ) return logReqNumValue   (req);
//     else if (next == NUMBER            ) return logReqNumber     (req);
//     else if (next == NUMBER_LIMITS     ) return logReqLimits     (req);
//     else if (next == NUMBER_ADD         
//           || next == NUMBER_SUBTRACT    
//           || next == NUMBER_MULTIPLY    
//           || next == NUMBER_DIVIDE
//           || next == NUMBER_MODULO
//           || next == NUMBER_EXPONENT   ) return logReqArithmetic (req);
//     else if (next == NUMBER_INTERPOLATE) return logReqInterpolate(req);

//     else if (next == COLOR             ) return logReqColor      (req);

//     else if (next == RECTANGLE         ) return logReqRectangle  (req);
//     else if (next == LINE              ) return logReqLine       (req);
//     else if (next == ELLIPSE           ) return logReqEllipse    (req);
//     else if (next == POLYGON           ) return logReqPolygon    (req);
//     else if (next == STAR              ) return logReqStar       (req);

    
//     req.so++;

//     return '';


//     // return JSON.stringify(req.request)        
//     //     .split('""').join('\'\'')  //.replaceAll('""', '\'\'')
//     //     .split('"') .join('')      //.replaceAll('"', '')
//     //     .split('[') .join('')      //.replaceAll('[', '')
//     //     .split(']') .join('')      //.replaceAll(']', '')
//     //     .split(',') .join(' ');    //.replaceAll(',', ' '));
// }



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



function logReqNumberValue(val, parse)
{
    parse.log += parse.tab + NUMBER_VALUE + ' ' + val;
}



function logReqNumber(num, parse)
{
    parse.log += parse.tab + NUMBER;
    parse.log += logReqNodeId(num);
}



function logReqLimits(lim, nValues, parse)
{
    parse.log += parse.tab + NUMBER_LIMITS;
    parse.log += logReqNodeId(lim);

    if (nValues > -1)
        parse.log += ' ' + nValues;
}



function logReqArithmetic(arith, type, nValues, parse)
{
    parse.log += parse.tab + type;
    parse.log += logReqNodeId(arith);
    parse.log += ' ' + nValues;
}



function logReqInterpolate(lerp, nValues, parse)
{
    parse.log += parse.tab + NUMBER_INTERPOLATE;
    parse.log += logReqNodeId(lerp);
    parse.log += ' ' + nValues;
}



function logReqColor    (req) { return logReqNode(req, COLOR,     ['space', 'c1', 'c2', 'c3']); }
function logReqRectangle(req) { return logReqNode(req, RECTANGLE, ['x', 'y', 'width', 'height', 'angle', 'round']); }
function logReqLine     (req) { return logReqNode(req, LINE,      ['x', 'y', 'width', 'angle']); }
function logReqEllipse  (req) { return logReqNode(req, ELLIPSE,   ['x', 'y', 'width', 'height', 'angle']); }
function logReqPolygon  (req) { return logReqNode(req, POLYGON,   ['x', 'y', 'width', 'height', 'angle', 'round', 'corners']); }
function logReqStar     (req) { return logReqNode(req, STAR,      ['x', 'y', 'width', 'height', 'angle', 'round', 'points', 'convex']); }



function logReqNode(req, type, _paramIds)
{
    const tab = req.tab;

    req.nTab++;


    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);


    let log = tab + tag + ' ' + nodeId + active;

    let paramIds;


    if (req.request[req.pos] == type)
    {
        log += logReq(req);
        paramIds = req.request[req.pos++].split(',');
    }
    else
        paramIds = _paramIds;
    

    for (const i of paramIds)
        log += logReq(req);


    req.nTab--;

    return log;
}
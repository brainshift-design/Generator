function logReq(req)
{
    const next = req.request[req.pos];


         if (next == PARAM             ) return logReqParam            (req);

    else if (next == NUMBER_VALUE      ) return logReqNumValue         (req);
    else if (next == NUMBER            ) return logReqNumber           (req);
    else if (next == NUMBER_ADD         
          || next == NUMBER_SUBTRACT    
          || next == NUMBER_MULTIPLY    
          || next == NUMBER_DIVIDE
          || next == NUMBER_MODULO
          || next == NUMBER_EXPONENT   ) return logReqNumberArithmetic (req);
    else if (next == NUMBER_INTERPOLATE) return logReqNumberInterpolate(req);

    else if (next == COLOR             ) return logReqColor            (req);

    else if (next == RECTANGLE         ) return logReqRectangle        (req);
    else if (next == LINE              ) return logReqLine             (req);
    else if (next == ELLIPSE           ) return logReqEllipse          (req);
    else if (next == POLYGON           ) return logReqPolygon          (req);
    else if (next == STAR              ) return logReqStar             (req);

    
    req.so++;

    return '';


    // return JSON.stringify(req.request)        
    //     .split('""').join('\'\'')  //.replaceAll('""', '\'\'')
    //     .split('"') .join('')      //.replaceAll('"', '')
    //     .split('[') .join('')      //.replaceAll('[', '')
    //     .split(']') .join('')      //.replaceAll(']', '')
    //     .split(',') .join(' ');   //.replaceAll(',', ' '));
}



function logReqActive(req)
{
    return req.request[req.pos] == ACTIVE
         ? ' ' + req.request[req.pos++]
         : '';
}



function logReqParam(req)
{
    // if (req.request[req.pos] != PARAM) 
    //     return '';
        
    const tag     = req.request[req.pos++];
    const nodeId  = req.request[req.pos++];
    const paramId = req.request[req.pos++];

    //req.skipNewLine = true;

    //const val     = logReq(req);
    const _nodeId = logReqId(nodeId);

    return req.tab + tag + ' ' + _nodeId + '.' + paramId;// + ' ' + val;
}



function logReqNumberNodeId(req)
{
    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);
    
    return tag + ' ' + logReqId(nodeId) + active;
}



function logReqNumValue(req)
{
    const tag = req.request[req.pos++];
    const val = req.request[req.pos++]; // N

    return req.tab + tag + ' ' + val;
}



function logReqNumber(req)
{
    const tab = req.tab;

    req.nTab++;

    const node = logReqNumberNodeId(req);
    const num  = logReq(req);    
    
    req.nTab--;

    return tab + node + ' ' + num;
}



function logReqNumberArithmetic(req)
{
    const tab = req.tab;

    req.nTab++;

    const node    = logReqNumberNodeId(req);
    const nValues = req.request[req.pos++];
    
    let log = tab + node + ' ' + nValues;

    for (let i = 0; i < nValues; i++)
        log += logReq(req);

    req.nTab--;

    return log;
}



function logReqNumberInterpolate(req)
{
    const tab = req.tab;

    req.nTab++;

    const node    = logReqNumberNodeId(req);
    const nValues = req.request[req.pos++];


    let log = tab + node + ' ' + nValues;

    if (nValues == 2)
    {
        const num0 = logReq(req);
        const num1 = logReq(req);
        const amt  = logReq(req);

        log += num0 + num1 + amt;
    }
    else if (nValues == 1)
    {
        const num = logReq(req);
        const amt = logReq(req);

        log += num + amt;
    }
    else if (nValues == 0)
    {
        const amt = logReq(req);

        log += amt;
    }


    req.nTab--;

    return log;
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
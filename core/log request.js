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

    else if (next == RECTANGLE         ) return logReqRectangle        (req);
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
    if (req.request[req.pos] != PARAM) 
        return '';
        
    const tag        = req.request[req.pos++];
    const nodeId     = req.request[req.pos++];
    const paramIndex = req.request[req.pos++];

    req.skipNewLine = true;

    const val     = logReq(req);
    const _nodeId = logReqNodeId(nodeId);

    return req.tab + tag + ' ' + _nodeId + ' ' + paramIndex + ' ' + val;
}



function logReqNumberNodeId(req)
{
    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);
    
    return tag + ' ' + logReqNodeId(nodeId) + active;
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

        log += num;
    }


    req.nTab--;

    return log;
}



function logReqRectangle(req)
{
    const tab = req.tab;

    req.nTab++;


    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);


    let log = tab + tag + ' ' + nodeId + active;

    let indices;


    if (req.request[req.pos] == RECTANGLE)
    {
        log += logReq(req);
        indices = req.request[req.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(6).keys()];
    

    for (const i of indices)
    {
        if (i < 6)
            log += logReq(req);
    }


    req.nTab--;

    return log;
}



function logReqEllipse(req)
{
    const tab = req.tab;

    req.nTab++;


    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);


    let log = tab + tag + ' ' + nodeId + active;

    let indices;


    if (req.request[req.pos] == ELLIPSE)
    {
        log += logReq(req);
        indices = req.request[req.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(5).keys()];
    

    for (const i of indices)
    {
        if (i < 5)
            log += logReq(req);
    }


    req.nTab--;

    return log;
}



function logReqPolygon(req)
{
    const tab = req.tab;

    req.nTab++;


    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);


    let log = tab + tag + ' ' + nodeId + active;

    let indices;


    if (req.request[req.pos] == POLYGON)
    {
        log += logReq(req);
        indices = req.request[req.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(7).keys()];
    

    for (const i of indices)
    {
        if (i < 7)
            log += logReq(req);
    }


    req.nTab--;

    return log;
}



function logReqStar(req)
{
    const tab = req.tab;

    req.nTab++;


    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);


    let log = tab + tag + ' ' + nodeId + active;

    let indices;


    if (req.request[req.pos] == STAR)
    {
        log += logReq(req);
        indices = req.request[req.pos++].split(',').map(s => parseInt(s));
    }
    else
        indices = [...Array(8).keys()];
    

        for (const i of indices)
    {
        if (i < 8)
            log += logReq(req);
    }


    req.nTab--;

    return log;
}
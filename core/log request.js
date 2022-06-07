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
    
    //req.pos++;


    // const tab        = TAB;
    // let   pos        = NL + tab.repeat(req.nTab++);

    const tag        = req.request[req.pos++];
    const nodeId     = req.request[req.pos++];
    const paramIndex = req.request[req.pos++];

    const val        = logReq(req);

    
    return tag + ' ' + nodeId + ' ' + paramIndex + ' ' + val;
}



function logReqNumberNodeId(req)
{
    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);
    
    return tag + ' ' + nodeId + ' ' + active;
}



function logReqNumValue(req)
{
    const tab = TAB;
    let   pos = NL + tab.repeat(req.nTab++);

    const tag = req.request[req.pos++];
    const val = req.request[req.pos++]; // N

    return pos + tag + ' ' + val;
}



function logReqNumber(req)
{
    const tab    = TAB;
    let   pos    = NL + tab.repeat(req.nTab++);

    const node = logReqNumberNodeId(req);
    const num  = logReq(req);    
    
    return pos + node + ' ' + num;
}



function logReqNumberArithmetic(req)
{
    const tab     = TAB;
    let   pos     = NL + tab.repeat(req.nTab++);

    const node    = logReqNumberNodeId(req);
    const nValues = req.request[req.pos++];
    
    let log = pos + node + ' ' + nValues;

    for (let i = 0; i < nValues; i++)
        log += logReq(req);

    return log;
}



function logReqNumberInterpolate(req)
{
    const tab     = TAB;
    let   pos     = NL + tab.repeat(req.nTab++);

    const node    = logReqNumberNodeId(req);
    const nValues = req.request[req.pos++];


    let log = pos + node + ' ' + nValues;

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


    return log;
}



function logReqRectangle(req)
{
    const tab    = TAB;
    let   pos    = NL + tab.repeat(req.nTab++);


    const tag    = req.request[req.pos++];
    const nodeId = req.request[req.pos++];
    const active = logReqActive(req);


    let log = pos + tag + ' ' + nodeId + ' ' + active;

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
        switch (i)
        {
        case 0: log += logReq(req); break;
        case 1: log += logReq(req); break;
        case 2: log += logReq(req); break;
        case 3: log += logReq(req); break;
        case 4: log += logReq(req); break;
        case 5: log += logReq(req); break;
        }
    }


    return log;
}
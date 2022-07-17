class RequestSettings
{
    request;
    pos;

    so          = 0;
    nTab        = 0;

    skipNewLine = false;


    constructor(req, pos)
    {
        this.request = req;
        this.pos     = pos;
    }


    get tab() 
    { 
        if (this.skipNewLine)
        {
            this.skipNewLine = false;
            return '';
        }
        else 
            return NL + TAB.repeat(Math.max(0, this.nTab)); 
    }
}



function logFunction(funcName)
{
    console.log(
        '%c ' + funcName + '() ', 
        'background: #09f; color: white;');
}



function logSavedNode(nodeKey)
{
    let txt = figGetPageData(nodeKey, false)
        .replace('{\n', '')
        .replace('\n}', '')

        .replace('[\n' + TAB, '')
        .replace('\n' + TAB + ']', '')

        .split(TAB + '"params":\n').join('') // have to do .split().join() because there's no .replace() in TS

        .split('": "').join(': ')
        .split('", "').join(': ')

        .split(TAB + '"').join(TAB)
        .split(TAB + TAB + '["').join(TAB + TAB)
        
        .split('",\n').join('\n')
        .split('"\n').join('\n')
        
        .split('"],\n').join('\n');


    if (txt[txt.length-1] == '"')    
        txt = txt.substring(0, txt.length - 1);

    if (txt.substring(txt.length-2) == '"]')    
        txt = txt.substring(0, txt.length - 2);


    console.log(
        '%c%s\n%c%s', 
        'background: #fdb', 
         noNodeTag(nodeKey), 
        'background: #fed;',    
         txt);
}



function logSavedConn(connKey)
{
    const parts = noConnTag(connKey).split(' ');

    const conn = 
          parts[0] + '.' + parts[1]
        + ' → '
        + parts[2] + '.' + parts[3];

    console.log(
        '%c%s', 
        'background: #cfc', 
        conn); 
}



function logRequest(request, updateNodeId, updateParamId)
{
    const req = new RequestSettings(request, 2);


    let log = '';

    if (   updateNodeId  != '' 
        || updateParamId != '')
        log = '↓ ' + logReqId(updateNodeId) + '.' + logReqId(updateParamId);
    else
        req.skipNewLine = true;


    const stackOverflowProtect = 100;

    while (   req.pos < req.request.length 
           && req.so  < stackOverflowProtect)
        log += logReq(req);


    console.log(
        '%c%s', 
        'background: #60aa60; color: #fff', 
         log);
}



function logReqId(nodeId)
{
    return nodeId == '' ? '\'\'' : nodeId;
}



function logParamUpdates(updateNodeId, updateParamId, values)
{
    let log     = '';
    let newLine = true;

    if (   updateNodeId  != '' 
        || updateParamId != '')
        log = '↓ ' + logReqId(updateNodeId) + '.' + logReqId(updateParamId);
    else
        newLine = false;

          
    let i    = 0;
    let nTab = 0;

    while (i < values.length)
    {
        const nodeId  = values[i++];
        const nValues = parseInt(values[i++]);

        log += 
              (newLine ? NL : '') + TAB.repeat(Math.max(0, nTab))
            + nodeId;// + ' ' + nValues;

        newLine = true;

        nTab++;

        for (let j = 0; j < nValues; j++)
        {
            const index = values[i++];
            const value = values[i++];

            log += 
                  NL + TAB.repeat(Math.max(0, nTab))
                + index + ' ' + value;
        }

        nTab--;
    }


    console.log(
        '%c%s', 
        'background: #e70; color: white;', 
        log);
}



function logObjectUpdates(objects)
{
    console.log(
        '%cobjects', 
        'background: #07e; color: white;', 
        objects);
}
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

        // .replaceAll('": "', ': ')
        // .replaceAll('":\n', ':\n')
        // .replaceAll('",\n', ':\n')
        // .replaceAll('"', '') // the very last one
        
        .replaceAll(TAB + '"params":\n', '')

        .replaceAll('": "', ': ')
        .replaceAll('", "', ': ')
        
        .replaceAll(TAB + '"', TAB)
        .replaceAll(TAB + TAB + '["', TAB + TAB)

        .replaceAll('",\n', '\n')
        .replaceAll('"\n', '\n')
        
        //.replaceAll('":\n', '\n')
    
        .replaceAll('"],\n', '\n');
        // .replaceAll('"]', '') // the very last one


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
    let conn = '';

    const parts = noConnTag(connKey).split(' ');

    for (let i = 0; i < parts.length; i++)
    {
        conn += parts[i];

             if (i == 1)             conn += ' -> ';
        else if (i < parts.length-1) conn += ' ';
    }
    
    console.log(
        '%c%s', 
        'background: #cfc', 
        conn); 
}



function logRequest(request, updateNodeId, updateParamIndex)
{
    const req = new RequestSettings(request, 2);


    let log = logReqNodeId(updateNodeId) + ' ' + updateParamIndex;


    const stackOverflowProtect = 100;

    while (   req.pos < req.request.length 
           && req.so  < stackOverflowProtect)
        log += logReq(req);


    console.log(
        '%c%s', 
        'background: #60aa60; color: #fff', 
         log);
}



function logReqNodeId(nodeId)
{
    return nodeId == '' ? '\'\'' : nodeId;
}



function logParamUpdates(values)
{
    let str = logReqNodeId(values[0]) + ' ' + values[1];
    
    let i    = 2;
    let nTab = 0;

    while (i < values.length)
    {
        const nodeId  = values[i++];
        const nValues = parseInt(values[i++]);

        str += 
              NL + TAB.repeat(Math.max(0, nTab))
            + nodeId + ' ' + nValues;

        nTab++;

        for (let j = 0; j < nValues; j++)
        {
            const index = values[i++];
            const value = values[i++];

            str += 
                  NL + TAB.repeat(Math.max(0, nTab))
                + index + ' ' + value;
        }

        nTab--;
    }


    console.log(
        '%c%s', 
        'background: #e70; color: white;', 
        str);
}



function logObjectUpdates(objects)
{
    console.log(
        '%cobjects', 
        'background: #07e; color: white;', 
        objects);
}
class RequestSettings
{
    request;
    pos;

    so            = 0;
    nTab          = 0;
  
    skipNewLine   = false;

    loggedNodeIds = [];
    


    constructor(request, pos)
    {
        this.request = request;
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



function logFunction(funcName, obj = null)
{
    let str = funcName;

    if (obj)
        str = obj.id + '.' + str;

    console.log(
        '%c ' + str + ' ', 
        'background: #fc0; color: #632;');
}



function logValueUpdates(updateNodeId, updateParamId, values)
{
    //console.log('values = ', values);

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
            const type  = values[i++];
            const value = values[i++];

            log += 
                  NL + TAB.repeat(Math.max(0, nTab))
                + index + ' ' + displayValue(type, value);
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



function logSaveNodes(nodeJson)
{
    console.log('%cSAVING NODES\n' + nodeJson, 'color: black; background: #ddeeff;');
}
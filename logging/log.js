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



function log(str)
{
    debugInfo.innerHTML = str;
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



function logString(str, color = 'white', background = 'red')
{
    console.log(
        '%c ' + str + ' ', 
        'background: ' + background + '; color: ' + color + ';');
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
        const nInputs = parseInt(values[i++]);

        log += 
              (newLine ? NL : '') + TAB.repeat(Math.max(0, nTab))
            + nodeId;// + ' ' + nInputs;

        newLine = true;

        nTab++;

        for (let j = 0; j < nInputs; j++)
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



function logStyleUpdates(styles)
{
    console.log(
        '%cstyles', 
        'background: #b4d; color: white;', 
        styles);
}



function logSaveNodes(nodeJson)
{
    console.log('%cSAVING NODES\n' + nodeJson, 'color: black; background: #ddeeff;');
}



function logSaveConnections(conns)
{
    let log = 'SAVING ' + conns.length + ' ' + countString('CONNECTION', conns.length);

    for (const conn of conns)
        log += '\n' + conn.toJson();

    console.log(
        '%c' + log, 
        'color: black; background: #ddeeff;');
}



function logUpdateSavedConnections(conns)
{
    let log = 'UPDATING ' + conns.length + ' ' + countString('SAVED CONNECTION', conns.length);

    for (const conn of conns)
        log += '\n' + conn.toJson();

    console.log(
        '%c' + log, 
        'color: black; background: #ddeeff;');
}



function logUndoStack()
{
    let log = 'UNDO STACK:\n';

    for (const act of actionManager.actions)
        log += act.name + '\n';

        console.log('%c%s', 'background: #ffd; color: #b80;', log);
    }



function logRedoStack()
{
    let log = 'REDO STACK:\n';

    for (const act of actionManager.redoActions)
        log += act.name + '\n';

    console.log('%c%s', 'background: #fff4e8; color: #c64;', log);
}
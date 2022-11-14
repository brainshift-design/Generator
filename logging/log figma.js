function logSavedNode(nodeKey)
{
    let log = figGetPageData(nodeKey, false)
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


    if (log[log.length-1] == '"')    
        log = log.substring(0, log.length - 1);

    if (log.substring(log.length-2) == '"]')    
        log = log.substring(0, log.length - 2);


    console.log(
        '%c%s\n%c%s', 
        'background: #fdb', 
         noNodeTag(nodeKey), 
        'background: #fed;',    
         log);
}



function logSavedConn(conn)
{
    const log = 
          conn.outputNodeId + '.' + conn.outputId
        + ' ' + rightArrowChar(parseBool(conn.list)) + ' '
        + conn.inputNodeId + '.' + conn.inputId;

    console.log(
        '%c%s', 
        'background: #cfc', 
        log); 
}
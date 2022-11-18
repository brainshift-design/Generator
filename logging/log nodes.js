function logSavedNode(nodeKey)
{
    let log = formatSavedNodeJson(figGetPageData(nodeKey, false));

    console.log(
        '%c%s\n%c%s', 
        'background: #fdb', 
         noNodeTag(nodeKey), 
        'background: #fed;',    
         log);
}



function formatSavedNodeJson(json)
{
    let formJson = json
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


    if (formJson[formJson.length-1] == '"')    
        formJson = formJson.substring(0, formJson.length - 1);

    if (formJson.substring(formJson.length-2) == '"]')    
        formJson = formJson.substring(0, formJson.length - 2);

    return formJson;
}



function formatSavedNodeDataJson(json)
{
    let formJson = json
        .replace('{\n', '')
        .replace('\n}', '')
        .replace('[\n' + TAB, '')
        .replace('\n' + TAB + ']', '');

        // .split(TAB + '"params":\n').join('') // have to do .split().join() because there's no .replace() in TS

        // .split('": "').join(': ')
        // .split('", "').join(': ')

        // .split(TAB + '"').join(TAB)
        // .split(TAB + TAB + '["').join(TAB + TAB)
        
        // .split('",\n').join('\n')
        // .split('"\n').join('\n')
        
        // .split('"],\n').join('\n');


    // if (formJson[formJson.length-1] == '"')    
    //     formJson = formJson.substring(0, formJson.length - 1);

    // if (formJson.substring(formJson.length-2) == '"]')    
    //     formJson = formJson.substring(0, formJson.length - 2);

    return formJson;
}



function logSavedConn(conn)
{
    const strConn = getConnString(conn);

    console.log(
        '%c%s', 
        'background: #cfc', 
        strConn); 
}
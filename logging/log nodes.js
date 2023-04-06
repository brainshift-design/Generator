function logSavedNode(nodeKey, darkMode)
{
    const log  = formatSavedNodeJson(figGetPageData(nodeKey, false));

    if (darkMode)
    {
        console.log(
            '%c%s\n%c%s', 
            'background: #fa24; color: white;', 
            noNodeTag(nodeKey), 
            'background: #fa44; color: white;',
            log);
    }
    else
    {
        console.log(
            '%c%s\n%c%s', 
            'background: #fdb; color: black;', 
            noNodeTag(nodeKey), 
            'background: #fed; color: black;',
            log);
    }
}



function formatSavedNodeJson(json)
{
    let formJson = json
        .replace('{\n', '')
        .replace('\n}', '')

        .replace('[\n' + HTAB, '')
        .replace('\n' + HTAB + ']', '')

        .split(HTAB + '"params":\n').join('') // have to do .split().join() because there's no .replace() in TS

        .split('": "').join(': ')
        .split('", "').join(': ')

        .split(HTAB + '"').join(HTAB)
        .split(HTAB + HTAB + '["').join(HTAB + HTAB)
        
        .split('",\n').join('\n')
        .split('"\n').join('\n')
        
        .split('"],\n').join('\n');


    if (formJson[formJson.length-1] == '"')
        formJson = formJson.substring(0, formJson.length - 1);

    if (formJson.substring(formJson.length-2) == '"]')    
        formJson = formJson.substring(0, formJson.length - 2);

    return formJson;
}



function formatSavedDataJson(json)
{
    let formJson = json
        .replace('{\n', '')
        .replace('\n}', '')
        .replace('[\n' + HTAB, '')
        .replace('\n' + HTAB + ']', '');

    return formJson;
}



function logSavedConn(conn, darkMode)
{
    const strConn = connToString(conn, true);

    if (darkMode)
    {
        console.log(
            '%c%s', 
            'background: #4f44; color: white', 
            strConn); 
    }
    else
    {
        console.log(
            '%c%s', 
            'background: #cfc; color: black;', 
            strConn); 
    }
}
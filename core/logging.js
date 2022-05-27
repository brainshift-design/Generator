function logFunction(funcName)
{
    console.log(
        '%c ' + funcName + '() ', 
        'background: #09f; color: white;');
}



function logSavedNode(nodeKey)
{
    console.log(
        '%c%s\n%c%s', 
        'background: #fdb', 
        noNodeTag(nodeKey), 
        'background: #fed;',    
        figGetPageData(nodeKey, false)
            .replace('{\n', '')
            .replace('\n}', '')
            .replace('[\n', '')
            .replace('\n  ]', ''));
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



function logRequest(request)
{
    // typescript doesn't implement String.replaceAll(), 
    // and because this file is included by both JS and TS,
    // I'm using .split().join()

    console.log(
        '%c%s', 
        'background: #60aa60; color: #fff', 
        JSON.stringify(request)        
            .split('""').join('\'\'')  //.replaceAll('""', '\'\'')
            .split('"') .join('')      //.replaceAll('"', '')
            .split('[') .join('')      //.replaceAll('[', '')
            .split(']') .join('')      //.replaceAll(']', '')
            .split(',') .join(' '));   //.replaceAll(',', ' '));
}



function logUpdateParamValues(values)
{
    console.log(
        '%cvalues', 
        'background: #e70; color: white;', 
        values);
}
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



function logObjectUpdates(objects)
{
    console.log(
        '%cobjects', 
        'background: #07e; color: white;', 
        objects);
}
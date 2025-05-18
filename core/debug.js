var showDebugInfo = false;
var debugText     = '';

var debugFlag1    = false;
var debugNodeId   = 'list2';




function nodeIdArrayToString(nodeIds)
{
    let str = '';

    for (let i = 0; i < nodeIds.length; i++)
    {
        if (i > 0) str += ', ';
        str += nodeIds[i];
    }

    return str;
}



function nodeArrayToString(nodes)
{
    let str = '';

    nodes.map(n => n ? n.id : 'undefined').join(', ');

    // for (let i = 0; i < nodes.length; i++)
    // {
    //     if (i > 0) str += ', ';
    //     str += nodes[i] ? nodes[i].id : 'undefined';
    // }

    return str;
}



function updateDebugInfo()
{
    if (showDebugInfo)
    {
        debugInfoText.style.display = 'inline-block';
        debugInfoText.innerHTML = debugText;
    }
    else
        debugInfoText.style.display = 'none';
}
var showDebugInfo = false;

var debugFlag1    = false;
var debugNodeId   = 'repeat';




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

        debugInfoText.innerHTML =
                        'pan = '  + graph.currentPage.pan.x.toFixed(2) + ', ' + graph.currentPage.pan.y.toFixed(2)
            + '<br/>' + 'zoom = ' + graph.currentPage.zoom.toFixed(4);
    }
    else
        debugInfoText.style.display = 'none';
}
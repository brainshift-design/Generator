function updateCanvas()
{
    parent.postMessage({ pluginMessage: 
    { 
        cmd:  'updateCanvas',
        data: graph.activeNode.output.data
    }}, '*');
}
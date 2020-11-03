onmessage = function(e)
{
    parent.postMessage({ pluginMessage: 
    { 
        cmd:  'updateCanvas',
        data: e.data.graph.activeNode.output.data
    }}, '*');
};


// function updateCanvas()
// {

// }
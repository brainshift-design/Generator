onmessage = function(e)
{
    if (e.data.msg === 'generate')
    {
        console.log(e.data.graph);
    }

    // parent.postMessage({ pluginMessage: 
    // { 
    //     cmd:  'updateCanvas',
    //     data: e.data.graph.activeNode.output.data
    // }}, '*');
};


// function updateCanvas()
// {

// }
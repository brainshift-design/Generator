var worker = new Worker(
    window.URL.createObjectURL(
        new Blob([generateWorker.textContent])));
      

function updateCanvas()
{
    worker.postMessage(
    {
        msg:    'generate',
        graph:  graph.activeNode.output.data
    });
}


worker.onmessage = function(e)
{
    if (e.data.cmd == 'updateCanvas')
    {
        parent.postMessage({ pluginMessage: 
        { 
            cmd:  'updateCanvas',
            data: e.data.objects
        }}, '*');
    }
};
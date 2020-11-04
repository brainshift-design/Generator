var worker = new Worker(
    window.URL.createObjectURL(
        new Blob([generateWorker.textContent])));
      

function updateCanvas()
{
    if (graph.mutex)
    {
        graph.defer = true;
        return;
    }

    graph.mutex = true;


    var updateData = graph.activeNode.output.data;

    if (!isEmptyObject(updateData))
    {
        worker.postMessage(
        {
            msg:    'generate',
            graph:  updateData
        });
    }
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

        graph.mutex = false;

        if (graph.defer)
        {
            graph.defer = false;
            updateCanvas();
        }
    }
};
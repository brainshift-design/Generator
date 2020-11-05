var worker = new Worker(
    window.URL.createObjectURL(
        new Blob([generateWorker.textContent])));


worker.onmessage = function(e)
{
    if (e.data.cmd == 'regenerateNode')
    {
        parent.postMessage({ pluginMessage: 
        { 
            cmd:   'regenerateNode',
            nodeId: e.data.nodeId,
            data:   e.data.objects
        }}, '*');

        graph.mutex = false;


        if (graph.defer)
        {
            graph.defer = false;
            regenerateNodeOutput(graph.activeNode.output);
        }
    }
};
      

function regenerateNodeOutput(output)
{
    if (graph.mutex)
    {
        graph.defer = true;
        return;
    }
    
    graph.mutex = true;
    
    
    if (!isEmptyObject(output.data))
    {
        worker.postMessage(
        {
            msg:   'regenerateNode',
            nodeId: output._op.id,
            data:   output.data
        });
    }
}

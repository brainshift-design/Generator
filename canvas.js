var worker = new Worker(
    window.URL.createObjectURL(
        new Blob([generateWorker.textContent])));


worker.onmessage = function(e)
{
    if (e.data.cmd == 'regenerateNodeOutput')
    {
        parent.postMessage({ pluginMessage: 
        { 
            cmd:   'regenerateNodeOutput',
            nodeId: e.data.nodeId,
            data:   e.data.objects
        }}, '*');

        graph.mutex = false;


        if (graph.deferOutputs.length > 0)
        {
            var deferOutputs = Array.from(graph.deferOutputs);
            graph.deferOutputs = [];

            regenerateNodeOutputs(deferOutputs);
        }
    }
};
      

function regenerateNodeOutputs(outputs)
{
    if (graph.mutex)
    {
        for (const output of outputs)
            graph.deferOutputs.push(output);

        return;
    }
    
    graph.mutex = true;
    

    for (const output of outputs)
    {
        if (!isEmptyObject(output.data))
        {
            worker.postMessage(
            {
                msg:   'regenerateNodeOutput',
                nodeId: output._op.id,
                data:   output.data
            });
        }
    }
}

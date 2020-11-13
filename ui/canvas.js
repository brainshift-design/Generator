var worker = new Worker(
    window.URL.createObjectURL(
        new Blob([generateWorker.textContent])));


worker.onmessage = function(e)
{
    if (e.data.cmd == 'regenerate')
    {
        const node = graph.nodeFromId(e.data.nodeId);
        var removeList = [];
    
        for (const obj of node.cachedObjects)
        {
            if (!e.data.objects.find(o => o.itemId === obj.itemId))
                removeList.push(obj);    
        }

        if (removeList.length > 0)
        {
            parent.postMessage({ pluginMessage: 
            { 
                cmd: 'removeList',
                data: removeList
            }}, '*');
        }

        parent.postMessage({ pluginMessage: 
        { 
            cmd:   'regenerate',
            nodeId: e.data.nodeId,
            data:   e.data.objects
        }}, '*');    

        node.cachedObjects = e.data.objects;
        graph.mutex = false;

        
        if (graph.deferOutputs.length > 0)
        {
            var deferOutputs = Array.from(graph.deferOutputs);
            graph.deferOutputs = [];

            regenerate(deferOutputs);
        }
    }
};
      

function regenerate(outputs)
{
    if (graph.mutex)
    {
        graph.deferOutputs = [];

        for (const output of outputs)
            graph.deferOutputs.push(output);

        return;
    }
    
    graph.mutex = true;
    var posted = false;

    for (const output of outputs)
    {
        if (!isEmptyObject(output.data))
        {
            worker.postMessage(
            {
                msg:   'regenerate',
                nodeId: output.op.id,
                data:   output.data
            });

            posted = true;
        }
    }

    if (!posted)
        graph.mutex = false;
}

const graph = new Graph();


function createNode(opType)
{
    graph.createNode(opType);

    generator.postMessage({
        msg:   'createNode', 
        opType: opType
    });
}


function connect(output, input)
{
    graph.connect(output, input);

    generator.postMessage({
        msg:   'connect', 
        output: output.op.id, 
        input:  
        [
            input.op.id, 
            input.op.inputs.indexOf(input)
        ]
    });
}


function disconnect(input)
{
    graph.disconnect(input);

    generator.postMessage({
        msg:  'disconnect', 
        input: input
    });
}


/////////////////////////////////////////////////////////////////////


var generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));


generator.onmessage = function(e)
{
    if (e.data.cmd == 'regenerateObjects')
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
                cmd: 'removeObjectList',
                data: removeList
            }}, '*');
        }

        parent.postMessage({ pluginMessage: 
        { 
            cmd:   'regenerateObjects',
            nodeId: e.data.nodeId,
            data:   e.data.objects
        }}, '*');    

        node.cachedObjects = e.data.objects;
        graph.mutex = false;

        
        if (graph.deferOutputs.length > 0)
        {
            var deferNodes = Array.from(graph.deferNodes);
            graph.deferNodes = [];

            generate(deferNodes);
        }
    }
};
      

function generate(nodes)
{
    if (graph.mutex)
    {
        graph.deferNodes = [];

        for (const node of nodes)
            graph.deferNodes.push(node);

        return;
    }
    
    graph.mutex = true;
    var posted = false;


    const nodeIds = nodes.map(n => n.id);

    console.log('canvas generate(nodes)');
    console.log(nodeIds);
    generator.postMessage(
    {
        msg:  'generate',
        nodes: nodeIds
    });

    posted = true;


    if (!posted)
        graph.mutex = false;
}
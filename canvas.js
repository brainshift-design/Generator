const graph = new Graph();


function createNode(opType)
{
    const node = graph.createNode(opType);

    generator.postMessage({
        msg:   'createNode', 
        opType: opType,
        nodeId: node.id
    });
}


function connect(output, input)
{
    graph.connect(output, input);

    generator.postMessage({
        msg:   'connect', 
        output: output.op.id, 
        inputs:  
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

    generator.postMessage(
    {
        msg:    'generate',
        nodeIds: nodeIds
    });

    posted = true;


    if (!posted)
        graph.mutex = false;
}


/////////////////////////////////////////////////////////////////////


var generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));


generator.onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'makeActive':
        {
            const node = graph.nodeFromId(e.data.nodeId);
            node.makeActive();
            break;
        }
        case 'updateData':
        {
            // const node = graph.nodeFromId(e.data.nodeId);
            // var removeList = [];
        
            // for (const obj of node.cachedObjects)
            // {
            //     if (!e.data.objects.find(o => o.itemId === obj.itemId))
            //         removeList.push(obj);    
            // }

            // if (removeList.length > 0)
            // {
            //     parent.postMessage({ pluginMessage: 
            //     { 
            //         cmd: 'removeObjectList',
            //         data: removeList
            //     }}, '*');
            // }

            parent.postMessage({ pluginMessage: 
            { 
                cmd:    'updateObjects',
                objects: e.data.data
            }}, '*');    

            //node.cachedObjects = e.data.objects;
            graph.mutex = false;

            
            if (graph.deferNodes.length > 0)
            {
                var deferNodes = Array.from(graph.deferNodes);
                graph.deferNodes = [];

                generate(deferNodes);
            }

            break;
        }
    }
};
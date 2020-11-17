const graph = new Graph();


function createNode(opType)
{
    const node = graph.createNode(opType);

    generator.postMessage({
        msg:   'createNode', 
        opType: opType,
        nodeId: node.id
    });

    if (graph.selected.length > 0)
    {
        const selNode = graph.nodes.find(n => n.selected);
        const inputs  = node.inputs.filter(i => i.dataType == selNode.dataType);

        if (   !!selNode
            && selNode.output
            && inputs.length > 0)
            connect(selNode.output, inputs[0]);
    }
    
    graph.selected = [node];
}


function setNodeId(nodeId, newId)
{
    const node = graph.nodeFromId(nodeId);

    node.id = newId;

    generator.postMessage({
        msg:   'setNodeId', 
        nodeId: nodeId,
        newId:  newId
    });
}


function connect(output, input)
{
    graph.connect(output, input);

    generator.postMessage({
        msg:   'connect', 
        output: output.op.id, 
        inputs:  
        [{
            nodeId: input.op.id, 
            index:  input.op.inputs.indexOf(input)
        }]
    });
}


function disconnect(input)
{
    const connectedOutput = input.connectedOutput;

    graph.disconnect(input);

    generator.postMessage({
        msg: 'disconnect',
        outputNodeId: connectedOutput.op.id,
        input:
        {
            nodeId: input.op.id, 
            index:  input.op.inputs.indexOf(input)
        }
    });
}


function setParam(param, value)
{
    generator.postMessage({
        msg:   'setParam', 
        nodeId: param.op.id, 
        param:  param.name,
        value:  value
    });
}


function invalidate(node)
{
    generator.postMessage({
        msg:   'invalidate', 
        nodeId: node.id
    });
}


function removeNodeOutput(node)
{
    parent.postMessage({ pluginMessage: 
    { 
        cmd:   'removeNodeObjects',
        nodeId: node.id
    }}, '*');
}


/////////////////////////////////////////////////////////////////////


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

    generator.postMessage({
        msg:    'generate',
        nodeIds: nodeIds
    });

    posted = true;


    if (!posted)
        graph.mutex = false;
}


/////////////////////////////////////////////////////////////////////


const generator = new Worker(
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
        case 'showParamValue':
        {
            const node  = graph.nodeFromId(e.data.nodeId);
            const param = node.params.find(p => p.name == e.data.param);
            param.control.setValue(e.data.value, false);
            break;
        }
        case 'requestGenerate':
        {
            const nodes = [];

            for (const nodeId of e.data.nodeIds)
            {
                const node = graph.nodes.find(n => n.id == nodeId);

                if (!nodes.includes(node.activeNodeInTree))
                    nodes.push(node.activeNodeInTree);
            }

            generate(nodes);
            break;
        }
        case 'reset':
        {
            const node = graph.nodes.find(n => n.id == e.data.nodeId);

            generator.postMessage({
                cmd:   'reset',
                nodeId: node.activeNodeInTree.id
            });    

            break;
        }
        case 'recreateObjects':
        {
            parent.postMessage({ pluginMessage: 
            { 
                cmd:    'recreateObjects',
                nodeIds: e.data.nodeIds,
                objects: e.data.objects
            }}, '*');    

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
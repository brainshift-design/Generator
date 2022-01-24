const autoSaveDelay = 2; // seconds




// function saveToLocalFile(filename, str) 
// {
//     const link = document.createElement('a');
//     link.style.display = 'none';
    
//     link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
//     link.setAttribute('download', filename);
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }



function loadGraph(json)
{
    graph.clear();

    const data = JSON.parse(json);

    graphView.setPanAndZoom(
        { x: parseFloat(data.panx), 
          y: parseFloat(data.pany) },
        parseFloat(data.zoom));

    graph.addNodes(loadNodes(data), false);
    loadConnections(data);
}



function loadNodes(data)
{
    //console.log(data);
    
    const nodes = [];
    
    for (const _node of data.nodes)
    {
        const node = graph.createNode(_node.type);

        node.name   = _node.name;
        node.loaded = true;

        if (  _node.params
            || node.alwaysLoadParams)
            node.loadParams(_node);

        setNodePosition(
            node, 
            parseFloat(_node.x), 
            parseFloat(_node.y));

        nodes.push(node);
    }

    return nodes;
}



function loadConnections(data)
{
    for (const _conn of data.connections)
        Connection.parseJson(_conn);
}



function autoSave()
{
    uiSetPluginData("graph", graph.toJson());
    setTimeout(autoSave, autoSaveDelay * 1000);
}
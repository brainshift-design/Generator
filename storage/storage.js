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


    graphView.setZoomAndPan(
        parseFloat(data.zoom),
        { x: parseFloat(data.panx), 
          y: parseFloat(data.pany) });


    for (const _node of data.nodes)
    {
        const node  = graph.createNode(_node.type);

        node.name   = _node.name;
        node.loaded = true;

        setNodePosition(
            node, 
            parseFloat(_node.x), 
            parseFloat(_node.y));

        if (  _node.params
            || node.alwaysLoadParams)
            node.loadParams(_node);
    }


    for (const _conn of data.connections)
        Connection.parseJson(_conn);
}
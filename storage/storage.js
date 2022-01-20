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
    const data = JSON.parse(json);


    graphView.setZoomAndPan(
        data.zoom,
        data.panx, 
        data.pany);


    for (const _node of data.nodes)
    {
        const node = graph.createNode(_node.type);

        node.name = _node.name;

        setNodePosition(
            node, 
            _node.nodex, 
            _node.nodey);

        node.loadParams(_node);
    }


    for (const _conn of data.connections)
    {

    }
}
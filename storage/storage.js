function saveToLocalFile(filename, str) 
{
    const link = document.createElement('a');
    link.style.display = 'none';
    
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
    link.setAttribute('download', filename);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



function loadGraph(json)
{
    console.log('loadGraph()');
    const reader = new FileReader();

    reader.onload = () =>
    {
        graph.clear();

        
        let load = JSON.parse(reader.result);

        for (const nodeInfo of load.nodes)
        {
            let node = uiCreateNode(nodeInfo.type, false);
            node.name = nodeInfo.name;
        }
    };

    reader.readAsText(json);
}
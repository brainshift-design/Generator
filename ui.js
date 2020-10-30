//save('state', null);
//save('windowWidth', null);
//save('windowHeight', null);


parent.postMessage({ pluginMessage: 
{ 
    cmd:    'loadState',
    onLoad: 'loadState'
}}, '*');


onmessage = (e) =>
{
    var msg = e.data.pluginMessage;
}


/////////////////////////////////////////////////////////


var graph = new Graph();

graph.add(new OpRect());

graph.activeNode = graph.nodes[graph.nodes.length-1];
updateCanvas(graph);
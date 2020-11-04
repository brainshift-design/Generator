//save('state', null);
//save('windowWidth', null);
//save('windowHeight', null);

initSelect(presets,
[
    {value: '', text: 'untitled'},
]);


parent.postMessage({ pluginMessage: 
{ 
    cmd:    'loadState',
    onLoad: 'loadState'
}}, '*');


// onmessage = (e) =>
// {
//     var msg = e.data.pluginMessage;
// }



/////////////////////////////////////////////////////////


var graph = new Graph();

var opRect    = new OpRect();
var opSpread1 = new OpSpread();
var opSpread2 = new OpSpread();

graph.addNode(opRect);
graph.addNode(opSpread1);
graph.addNode(opSpread2);

graph.connect(opRect.output, opSpread1.inputs[0]);
graph.connect(opSpread1.output, opSpread2.inputs[0]);
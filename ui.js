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



// var opRect    = new OpRect();
// var opSpread1 = new OpSpread();
// var opSpread2 = new OpSpread();

// graph.addNode(opRect);
// graph.addNode(opSpread1);
// graph.addNode(opSpread2);

// opRect   .output.connect(opSpread1.inputs[0]);
// opSpread1.output.connect(opSpread2.inputs[0]);
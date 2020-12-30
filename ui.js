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


onmessage = e =>
{
    var msg = e.data.pluginMessage;

    switch (msg.cmd)
    {
        case 'forwardToGen': 
            generator.postMessage(msg.forward); 
            break;

        // case 'updatePanAndZoom':
        //     graphView.updatePanAndZoom();
        //     break;
    }
}

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
            generator.postMessage(msg.msg); 
            break;

        // case 'updatePanAndZoom':
        //     graphView.updatePanAndZoom();
        //     break;
    }
}


function uiNotify(text)
{
    parent.postMessage({ pluginMessage:
    { 
        cmd: 'notify',
        text: text
    }}, '*');    
}
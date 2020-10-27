parent.postMessage({ pluginMessage: 
{ 
    cmd:    'loadState',
    onLoad: 'loadState'
}}, '*');


onmessage = (e) =>
{
    var msg = e.data.pluginMessage;

    if (msg.cmd == 'loadState')
        loadState(msg.state);
}

//save('state', null);
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

let metricsEvents = [];

const ignoreUsers = ['673258279043070642'];



setInterval(() => pingMetrics(),  60000);
setInterval(() => updateMetrics(), 5000);



const METRICS_PING        = 'PING';
const METRICS_MENU_BUTTON = 'MENU_BUTTON';
const METRICS_MENU_ITEM   = 'MENU_ITEM';
const METRICS_WINDOW_SIZE = 'WINDOW_SIZE';
const METRICS_PAN_ZOOM    = 'PAN_ZOOM';
const METRICS_DEBUG_MODE  = 'DEBUG_MODE';
const METRICS_LOAD_PRESET = 'LOAD_PRESET';
const METRICS_SEARCH      = 'SEARCH';
const METRICS_ACTION_DO   = 'ACTION_DO';
const METRICS_ACTION_UNDO = 'ACTION_UNDO';
const METRICS_ACTION_REDO = 'ACTION_REDO';
const METRICS_CLICK_LINK  = 'CLICK_LINK';
const METRICS_ERROR       = 'ERROR';



function createMetricsEvent(type, data = '')
{
    // console.log('type =', type);
    // console.log('data =', data);
    
    const event =
    {
        userId:           currentUser.id,
        sessionId:        sessionId,
        generatorVersion: generatorVersion,
        dateTime:         new Date(),
        type:             type,
        data:             data
    };

    return event;
}



function addMetricsEvent(type, data, atStart = false)
{
    const event = createMetricsEvent(type, data);

    if (atStart) metricsEvents.unshift(event);
    else         metricsEvents.push   (event);
}



function pingMetrics()
{
    if (  !document.hasFocus()
        || ignoreUsers.includes(currentUser.id))
        return;


    postToServer(
    {
        action: 'updateMetrics',
        events:  JSON.stringify([createMetricsEvent(METRICS_PING)])
    })
    .then(response =>
    {   
        const update = generatorVersion < response.latestVersion;

        btnMain.setIcon(update ? iconGeneratorUpdate : iconGenerator);

        updateElementDisplay(menuItemRestartSep.div, update);
        updateElementDisplay(menuItemRestart   .div, update);
    })
    .catch(error =>
    {
        consoleError();
    });
}



function updateMetrics()
{
    if (   metricsEvents.length == 0
        || ignoreUsers.includes(currentUser.id))
        return;

    const events = [...metricsEvents];
    metricsEvents = [];


    postToServer(
    {
        action: 'updateMetrics',
        events:  JSON.stringify(events)
    })
    .then(response =>
    {   
        //console.log('metricsEvents =', events); 
    })
    .catch(error =>
    {
        consoleError();
    });
}



function hashUserId(userId, rounds = 10, salt = '')
{
    const saltBuffer = new Uint8Array(16);
    
    crypto.getRandomValues(saltBuffer);

    if (salt == '')
    {
        salt = Array.from(saltBuffer)
            .map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2))
            .join('');
    }
    

    const encoder = new TextEncoder();
    const data    = encoder.encode(userId + salt);
  
    let hash = sha256(data);
  
    for (let i = 0; i < rounds - 1; i++)
        hash = sha256(hash);

 
    return { 
        hash: hash.slice(0, 16), 
        salt };
}

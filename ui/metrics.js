let metricsEvents = [];

const ignoreUsers = ['673258279043070642'];



setInterval(() => pingMetrics(),  60000);
setInterval(() => updateMetrics(), 5000);



const METRICS_PING        = 'PING';
const METRICS_MENU_BUTTON = 'MENU_BUTTON';
const METRICS_MENU_ITEM   = 'MENU_ITEM';
const METRICS_WINDOW_SIZE = 'WINDOW_SIZE';
const METRICS_PAN_ZOOM    = 'PAN_ZOOM';
const METRICS_PARAM_VALUE = 'PARAM_VALUE';
const METRICS_NODE_NAME   = 'NODE_NAME';
const METRICS_DEBUG_MODE  = 'DEBUG_MODE';
const METRICS_LOAD_PRESET = 'LOAD_PRESET';
const METRICS_SEARCH      = 'SEARCH';
const METRICS_ACTION_DO   = 'ACTION_DO';
const METRICS_ACTION_UNDO = 'ACTION_UNDO';
const METRICS_ACTION_REDO = 'ACTION_REDO';



function createMetricsEvent(type, data)
{
    console.log('type =', type);
    console.log('data =', data);
    
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
        events:  JSON.stringify([createMetricsEvent(METRICS_PING, NULL)])
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
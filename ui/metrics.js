let metricsEvents = [];


const ignoreUsers = 
[
    '673258279043070642'
];



setInterval(() => pingMetrics(),  60000);
setInterval(() => updateMetrics(), 5000);



const METRICS_PING            = 'PING';
const METRICS_MENU_BUTTON     = 'MENU_BUTTON';
const METRICS_MENU_ITEM       = 'MENU_ITEM';
const METRICS_WINDOW_SIZE     = 'WINDOW_SIZE';
const METRICS_PAN_ZOOM        = 'PAN_ZOOM';
const METRICS_DEBUG_MODE      = 'DEBUG_MODE';
const METRICS_LOAD_PRESET     = 'LOAD_PRESET';
const METRICS_LOAD_FILE       = 'LOAD_FILE';
const METRICS_IMPORT_FILE     = 'IMPORT_FILE';
const METRICS_LOAD_TEMPLATE   = 'LOAD_TEMPLATE';
const METRICS_SAVE_TEMPLATE   = 'SAVE_TEMPLATE';
const METRICS_DELETE_TEMPLATE = 'DELETE_TEMPLATE';
const METRICS_SEARCH          = 'SEARCH';
const METRICS_ACTION_DO       = 'ACTION_DO';
const METRICS_ACTION_UNDO     = 'ACTION_UNDO';
const METRICS_ACTION_REDO     = 'ACTION_REDO';
const METRICS_CLICK_LINK      = 'CLICK_LINK';
const METRICS_ERROR           = 'ERROR';
const METRICS_CRASH           = 'CRASH';
const METRICS_SHARE_ON_X      = 'SHARE_ON_X';



function createMetricsEvent(_event, data = '')
{
    // console.log('event =', event);
    // console.log('data =', data);
    
    const event =
    {
        figmaId:   currentUser.id,
        sessionId: sessionId,
        version:   generatorVersion,
        dateTime:  new Date(),
        event:     _event,
        data:      data
    };

    return event;
}



function addMetricsEvent(_event, data = '', atStart = false)
{
    const event = createMetricsEvent(_event, data);

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
    if (  !settings.shareUsageMetrics
        || metricsEvents.length == 0
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
        consoleError(error);
    });
}
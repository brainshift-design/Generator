let metricsEvents = [];



setInterval(() => updateMetrics(), 10000);



const METRICS_PING        = 'PING';
const METRICS_MENU_BUTTON = 'MENUBTN';
const METRICS_MENU_ITEM   = 'MENUITEM';
const METRICS_WINDOW_SIZE = 'WNDSIZE';
const METRICS_PARAM_VALUE = 'PARAMVAL';
const METRICS_NODE_NAME   = 'NODENAME';
const METRICS_DATA_MODE   = 'DATAMODE';
const METRICS_LOAD_PRESET = 'LOADPRESET';
const METRICS_SEARCH      = 'SEARCH';
const METRICS_ACTION_DO   = 'ACTDO';
const METRICS_ACTION_UNDO = 'ACTUNDO';
const METRICS_ACTION_REDO = 'ACTREDO';



function addMetricsEvent(type, data, atStart = false)
{
    const event =
    {
        userId:    currentUser.id,
        sessionId: sessionId,
        dateTime:  new Date(),
        type:      type,
        data:      data
    };

    if (atStart) metricsEvents.unshift(event);
    else         metricsEvents.push   (event);
}



function updateMetrics()
{
    addMetricsEvent(METRICS_PING, NULL, true);

    
    postToServer(
    {
        action: 'updateMetrics',
        events:  JSON.stringify(metricsEvents)
    })
    .then(response =>
    {   
        //console.log('metricsEvents =', metricsEvents); 
        metricsEvents = [];
    })
    .catch(error =>
    {
        consoleError();
    });
}
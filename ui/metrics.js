let metricsEvents = [];



setInterval(() => updateMetrics(), 60000);



const METRICS_PING        = 'PING';
const METRICS_MENU_BUTTON = 'MENU_BUTTON';
const METRICS_MENU_ITEM   = 'MENU_ITEM';
const METRICS_WINDOW_SIZE = 'WINDOW_SIZE';
const METRICS_PARAM_VALUE = 'PARAM_VALUE';
const METRICS_NODE_NAME   = 'NODE_NAME';
const METRICS_DATA_MODE   = 'DATA_MODE';
const METRICS_LOAD_PRESET = 'LOAD_PRESET';
const METRICS_SEARCH      = 'SEARCH';
const METRICS_ACTION_DO   = 'ACTION_DO';
const METRICS_ACTION_UNDO = 'ACTION_UNDO';
const METRICS_ACTION_REDO = 'ACTION_REDO';



function addMetricsEvent(type, data, atStart = false)
{
    // console.log('type =', type);
    // console.log('data =', data);
    
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
        //console.log('metricsEvents =', [...metricsEvents]); 
        metricsEvents = [];


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
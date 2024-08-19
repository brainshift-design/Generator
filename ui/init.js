var generatorStarted   = false;


var uiFigMessages      = []; // messages from UI to Figma
var genMessages        = []; // messages from UI to Generator

var genMessagePosted   = false;


var tutorialsShown     = false;


var allUpdateNodes     = [];


//var currentSessionId = '';


var sessionId          = ''; // for metrics



// uiClearAllLocalData();
//uiQueueMessageToFigma({cmd: 'figLogAllLocalData', darkMode: darkMode});

// uiClearLocalData('windowWidth');
// uiClearLocalData('windowHeight');

// uiClearLocalData('showRequests');
// uiClearLocalData('showWhatsNew');

//uiSetLocalData('enableBetaFeatures', 'true');
//uiSetLocalData('sessionId', '');
//uiSetLocalData('logLoading', 'true');

//uiRemoveConnsToNodes(['num3']);
//uiRemoveSavedNodesAndConns(['color']);

//uiRemovePluginDataFromAllLocalStyles();

//uiCleanAllIds();



// uiRemoveAllSavedNodesAndConns();
// uiRemoveAllSavedPages();



var currentUser     = null;
//var currentUserHash = null;



var panMode             = false;

var     copiedNodesJson = '';
var duplicatedNodesJson = '';

var pasteOffset         = point(0,  0);
var pasteOffsetDelta    = point(50, 50);



const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));

        
generator.onmessage = event =>
{
    if (!event.data) 
        return;


    if (event.data.type === 'error') 
    {
        initCrashDialog(event, error);
        showCrashDialog();
    
        addMetricsEvent('CRASH', error);
    } 
    else if (event.data.type === 'unhandledrejection') 
    {
        initCrashDialog(event, event.reason);
        showCrashDialog();
    
        addMetricsEvent('CRASH', event.reason);
    }
};



//clearConsole();


initUtilContext();


initLoadingOverlay();
initEulaDialog();
initWhatsNewDialog();
initAboutDialog();
initQuestionDialog();
initQuestion2Dialog();
initQuestion3Dialog();
initRestartDialog();
    
// initSnapshots();
//console.log(xy2XYZ(0.3127, 0.3290));


uiQueueMessageToFigma({cmd: 'figStartGenerator'});



async function uiReturnFigStartGenerator(msg)
{
    sessionId       = createRandomString(16);

    currentUser     = msg.currentUser;
    tutorialsShown  = msg.tutorials;

    
    loadLocalSettings();


    initDebugMode(); // must be done after currentUser is initialized


    figFonts           = [...msg.fonts];
    figUniqueFontNames = [...new Set(msg.fonts.map(f => f.fontName.family))];


    uiQueueMessageToGenerator(
    {
        cmd:            'initFonts',
        fonts:           figFonts,
        uniqueFontNames: figUniqueFontNames
    });


    graphView.updateMeasureData();

    viewportRect  = msg.viewportRect;
    viewportZoom  = msg.viewportZoom;

    window.width  = msg.windowWidth;
    window.height = msg.windowHeight;

    documentBodyClient = clientRect(document.body);


    initThemeColors();
    initKeyboardPanel();
    initSubscriptionDialog();
    initPresets();
    initWindowSizers();


    if (msg.isLocked)
        showMultiplayerDialog();
    else
        validateInit(msg.showQuestionnaire);
}



function initGenerator(activate)
{
    window.focus();

    pingMetrics();
    

    uiGetLocalData('showWhatsNew');
    //showWhatsNewDialog(); // uncomment to edit the dialog


    setTimeout(() => loadingGraphic.style.display = 'block', 300);

    uiQueueMessageToFigma({cmd: 'figFinishStart'});

    uiQueueMessageToFigma({
        cmd:      'figLoadNodesAndConns',
        debugMode: settings.debugMode });


    // if (activate)
    //     showSubscriptionDialog(activate);


    //initCrashDialog(); // for testing
    //showCrashDialog(); // crash dialog

    setTimeout(() => 
    {
        updateObjectCountDisplay();

        if (!settings.debugMode)
            enableFeatures(subscribed());
    }, 
    500);


    updateUserTemplatesFromDB();
}



function validateInit()
{
    try
    {
        uiGetValueFromFigma('getPaidStatus').then(response =>
        {
            subscriptionActive = response.value === 'PAID';


            if (!subscriptionActive)
            {
                checkActiveSubscription(currentUser.id).then(result =>
                {
                    if (result == 2)
                        subscriptionActive = true;
        
                    uiSetLocalData('pro', subscriptionActive);
                    finalizeInit(result == 1);

                    startUserSession();
                })
                .catch(error =>
                {
                    uiError('Error while checking for subscription.');
                    finalizeInit(false);

                    startUserSession();
                });
            }
            else
            {
                uiSetLocalData('pro', subscriptionActive);
                finalizeInit(subscriptionActive);

                startUserSession();
            }

            
            uiSetLocalData(
                'pro', 
                subscriptionActive);
        })
        .catch(error =>
        {
            uiError('Error while checking for subscription.');
            finalizeInit(false);
        });
    }
    catch (e)
    {
        console.error('Error connecting to license server...');
        console.error(e);
    }
    
    
    // const result = getSubscriptionIsActive();

    // subscriptionActive = result == 2;

    // finalizeInit(
    //     eulaAgreed, 
    //     result > 0
    //     ? result == 1
    //     : false);
}



function finalizeInit(activate)
{
    initGenerator(activate);

    if (settings.debugMode)
        addMetricsEvent(METRICS_DEBUG_MODE, NULL);

    else
    {
        postToServer(
        {
            action:   'getUserStartupInfo',
            figmaId:   currentUser.id,
            question: 'found'
        })
        .then(response =>
        {
            if (!ignoreUsers.includes(currentUser.id))
            {
                if (!response.hasQuestionnaire)
                    showQuestionDialog();

                else if (response.nSessions == 5)
                    showQuestion2Dialog();

                else if (response.nSessions == 13)
                    showQuestion3Dialog();
            }
        })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
    }
}



function getCurrentDateString()
{
    const today = new Date();

    const year  = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day   = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}



function startUserSession()
{
    if (   ignoreUsers.includes(currentUser.id)
        || sessionStartPosted)
        return;


    postToServer(
    {
        action:          'startUserSession',
        figmaId:          currentUser.id,
        figmaName:        currentUser.name,
        figmaPhotoUrl:    currentUser.photoUrl ?? '',
        sessionId:        sessionId,
        generatorVersion: generatorVersion,
        paid:             subscriptionActive === true ? 'true' : 'false'
    });


    sessionStartPosted = true;
}
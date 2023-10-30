var generatorStarted   = false;


var uiFigMessages      = []; // messages from UI to Figma
var genMessages        = []; // messages from UI to Generator

var genMessagePosted   = false;


var tutorialsShown     = false;
var tutorialsSeen      = false;


var allUpdateNodes     = [];


//var currentSessionId = '';
var subscriptionActive = false;



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



var currentUser  = null;



const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));


var panMode             = false;

var     copiedNodesJson = '';
var duplicatedNodesJson = '';

var pasteOffset         = point(0,  0);
var pasteOffsetDelta    = point(50, 50);



clearConsole();


initUtilContext();


initLoadingOverlay();
initDataMode();
initEulaDialog();
initWhatsNewDialog();
initAboutDialog();


uiQueueMessageToFigma({cmd: 'figStartGenerator'});



async function uiReturnFigStartGenerator(msg)
{
    currentUser   = msg.currentUser;
    tutorialsSeen = msg.tutorials;


    loadLocalSettings();


    figFonts           = [...msg.fonts];
    figUniqueFontNames = [...new Set(msg.fonts.map(f => f.fontName.family))];


    uiQueueMessageToGenerator(
    {
        cmd:            'initFonts',
        fonts:           figFonts,
        uniqueFontNames: figUniqueFontNames
    });


    graphView.updateMeasureData();

    viewportRect = msg.viewportRect;
    viewportZoom = msg.viewportZoom;


    initThemeColors();
    initKeyboardPanel();
    initSubscriptionDialog();
    initPresets();
    initWindowSizers();


    if (msg.isLocked)
        showMultiplayerDialog();
    else
        validateInit(msg.eula);
}



function initGenerator()
{
    uiGetLocalData('showWhatsNew');

    setTimeout(() => loadingGraphic.style.display = 'block', 300);

    uiQueueMessageToFigma({cmd: 'figFinishStart'});

    uiQueueMessageToFigma({
        cmd:     'figLoadNodesAndConns',
        dataMode: settings.dataMode });
}



// function createSessionId()
// {
//     const date = getCurrentDateString();
//     const hash = hashLicenseString(currentUser.id + date, licenseHashSize);
//     const enc  = sign(hash, licenseKeys.private);
    
//     return arrayToBase32(enc);
// }



function subscribed()
{
    return subscriptionActive;//false;//currentSessionId == createSessionId();
}



function validateInit(eulaAgreed)
{
    try
    {
        checkActiveSubscription(currentUser.id).then(result =>
        {
            subscriptionActive = result;
            console.log('subscriptionActive =', subscriptionActive);
            finalizeInit(eulaAgreed);
        })
        .catch(error =>
        {
            uiError('Error while checking for subscription.')
            finalizeInit(eulaAgreed);
        });
    }
    catch (e)
    {
        console.error('Error connecting to license server...');
        console.error(e);
    }
}



function finalizeInit(eulaAgreed)
{
    if (!settings.dataMode)
        enableFeatures(subscribed());

    if (!eulaAgreed)
        showEulaDialog();
    else
        initGenerator();
}



function getCurrentDateString()
{
    const today = new Date();

    const year  = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day   = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
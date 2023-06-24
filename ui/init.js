
var generatorStarted = false;


var uiFigMessages    = []; // messages from UI to Figma
var genMessages      = []; // messages from UI to Generator

var genMessagePosted = false;


var allUpdateNodes   = [];



// uiClearAllLocalData();
//uiQueueMessageToFigma({cmd: 'figLogAllLocalData', darkMode: darkMode});

// uiClearLocalData('windowWidth');
// uiClearLocalData('windowHeight');
//uiClearLocalData('subscription');

// uiClearLocalData('showRequests');
//uiClearLocalData('showWhatsNew');

//uiSetLocalData('enableBetaFeatures', 'true');
//uiSetLocalData('logLoading', 'true');

//uiRemoveConnsToNodes(['num3']);
//uiRemoveSavedNodesAndConns(['color']);
//uiRemovePluginDataFromAllLocalStyles();

//uiCleanAllIds();



//uiRemoveAllSavedNodesAndConns();
//uiRemoveAllSavedPages();



var currentUser = null;
var subscription  = NULL;


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
    currentUser = msg.currentUser;
    //subscription  = msg.subscription;


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
    initWindowSizers();


    if (await checkTrialExists())
    {
        if (await checkSubOrTrialActive()) 
            initGenerator();
        else
            showSubscriptionDialog(false);
    }
    else
    {
        showEulaDialog();
    }
}



function initGenerator()
{
    uiGetLocalData('showWhatsNew');

    setTimeout(() => loadingGraphic.style.display = 'block', 300);

    uiQueueMessageToFigma({
        cmd:     'figLoadNodesAndConns',
        dataMode: settings.dataMode });
}
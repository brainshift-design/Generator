
var generatorStarted = false;


var uiFigMessages    = []; // messages from UI to Figma
var genMessages      = []; // messages from UI to Generator

var genMessagePosted = false;


var allUpdateNodes   = [];



//uiClearAllLocalData();
//uiQueueMessageToFigma({cmd: 'figLogAllLocalData'});

//uiClearLocalData('windowWidth');
//uiClearLocalData('windowHeight');
//uiClearLocalData('productKey');

//uiClearLocalData('showWhatsNew');

//uiSetLocalData('enableBetaFeatures', 'true');
//uiSetLocalData('logRawLoading', 'false');


//uiRemoveConnsToNodes(['num3']);
//uiRemoveSavedNodesAndConns(['color']);
//uiRemovePluginDataFromAllLocalStyles();


//uiRemoveAllSavedNodesAndConns();



var currentUser = null;
var productKey  = NULL;


const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));
        

const mainGraph = new Graph();
var   graphView = new GraphView(_graphView, mainGraph);


var   panMode             = false;        

var       copiedNodesJson = '';
var   duplicatedNodesJson = '';

var   pasteOffset         = point(0,  0);
var   pasteOffsetDelta    = point(50, 50);



clearConsole();


initUtilContext();

initDataMode();
initWhatsNewDialog();
initAboutDialog();


uiQueueMessageToFigma({cmd: 'figStartGenerator'});



function uiReturnFigStartGenerator(msg)
{
    initThemeColors();
    loadLocalSettings();


    graphView.updateMeasureData();

    
    uiGetLocalData('showWhatsNew');


    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    startupValidateLicense();
    // enableFeatures() is called when loading is done


    setTimeout(() => loadingGraphic.style.display = 'block', 300);

    uiQueueMessageToFigma({
        cmd:     'figLoadNodesAndConns',
        dataMode: settings.dataMode });
}
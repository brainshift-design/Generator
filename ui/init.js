
var generatorStarted = false;


var uiFigMessages    = []; // messages from UI to Figma
var genMessages      = []; // messages from UI to Generator

var genMessagePosted = false;


var allUpdateNodes   = [];



//uiClearAllLocalData();


//uiClearLocalData('windowWidth');
//uiClearLocalData('windowHeight');
//uiClearLocalData('productKey');

//uiClearLocalData('showWhatsNew');

//uiSetLocalData('showWhatsNew', generatorVersion);
//uiSetLocalData('logRawLoading', 'false');


//uiRemoveConnsToNodes(['num3']);
//uiRemoveSavedNodesAndConns(['color']);
//uiRemovePluginDataFromAllLocalStyles();


//uiRemoveAllSavedNodesAndConns();



var currentUser = '';
var productKey  = '';


const graph = new Graph();

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

initDataMode();
initWhatsNewDialog();
initAboutDialog();


uiQueueMessageToFigma({cmd: 'figStartGenerator'});



function uiReturnFigStartGenerator(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    initThemeColors();
    loadLocalSettings();

    graphViewClient = clientRect(graphView);
    
    uiGetLocalData('showWhatsNew');
}
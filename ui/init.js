
var generatorStarted = false;


var uiFigMessages = []; // messages from UI to Figma
var genMessages   = []; // messages from UI to Generator

var genMessagePosted = false;


//uiClearAllLocalData();

//uiClearLocalData('windowWidth');
//uiClearLocalData('windowHeight');
//uiClearLocalData('productKey');

//uiSetLocalData('showWhatsNew', generatorVersion);
//uiClearLocalData('showWhatsNew');

//uiRemoveConnsToNodes(['num3']);
//uiRemoveSavedNodesAndConns(['color']);
//uiRemovePluginDataFromAllLocalStyles();

//uiRemoveAllSavedNodesAndConns();



var currentUser = '';



const graph = new Graph();

const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));
        

var panMode             = false;        

var     copiedNodesJson = '';
var duplicatedNodesJson = '';

var pasteOffset         = point(0,  0);
var pasteOffsetDelta    = point(0, 70);



clearConsole();

initUtilContext();

initDataMode();
initWhatsNewDialog();


uiQueueMessageToFigma({cmd: 'figStartGenerator'});



function initDataMode()
{
    initCheckbox(chkDataModeRestart, 'Restart in debug mode', true );
    initCheckbox(chkLoadingRestart,  'Restart in debug mode', false);

    chkLoadingRestart.style.display = 'none';

    chkDataModeRestart.addEventListener('change', () => uiSetLocalData('dataMode', boolToString(chkDataModeRestart.checked)));
    chkLoadingRestart .addEventListener('change', () => uiSetLocalData('dataMode', boolToString(chkLoadingRestart .checked)));
}



function uiReturnFigStartGenerator(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    initThemeColors();
    loadLocalSettings();

    graphViewClient = clientRect(graphView);
    
    uiGetLocalData('showWhatsNew');
}
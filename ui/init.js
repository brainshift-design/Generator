var generatorStarted = false;


var uiFigMessages = []; // messages from UI to Figma
var genMessages   = []; // messages from UI to Generator

var genMessagePosted = false;


// uiClearAllLocalData();

//uiClearLocalData('windowWidth');
//uiClearLocalData('windowHeight');
//uiClearLocalData('productKey');

//uiRemoveConnsToNodes(['num3']);
//uiRemoveSavedNodesAndConns(['color']);
//uiRemoveAllSavedNodesAndConns();



var currentUser = '';



const graph = new Graph();

const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));
        

var panMode             = false;        

var     copiedNodesJson = '';
var duplicatedNodesJson = '';

var pasteOffset         = [ 0,   0];
var pasteOffsetDelta    = [40, 100];



clearConsole();

initUtilContext();

initDataMode();


uiQueueMessageToFigma({cmd: 'figStartGenerator'});



function initDataMode()
{
    initCheckbox(chkDataModeRestartCheck, 'Restart in debug mode', true );
    initCheckbox(chkLoadingRestartCheck,  'Restart in debug mode', false);

    chkDataModeRestartCheck.addEventListener('change', () => uiSetLocalData('dataMode', chkDataModeRestartCheck.checked));
    chkLoadingRestartCheck .addEventListener('change', () => uiSetLocalData('dataMode', chkLoadingRestartCheck .checked));
}



function uiEndStartGenerator(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    initThemeColors();
    loadLocalSettings();

    uiQueueMessageToFigma({cmd: 'figLoadNodesAndConns'});

    window.focus();
}
var uiFigMessages = []; // messages from UI to Figma
var genMessages = []; // messages from UI to Generator

var genMessagePosted = false;


// uiClearAllLocalData();

//uiClearLocalData('windowWidth');
//uiClearLocalData('windowHeight');
//uiClearLocalData('productKey');

//uiRemoveConnsToNodes(['num10']);
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
initColor();

uiQueueMessageToFigma({cmd: 'figStartGenerator'});



function uiEndStartGenerator(msg)
{
    initModeColors();
    initMenus();


    currentUser = msg.currentUser;
    productKey  = msg.productKey;


    loadLocalSettings();
    

    uiQueueMessageToFigma({cmd: 'figLoadNodesAndConns'});


    window.focus();
}
var figMessages = []; // messages from UI to Figma
var genMessages = []; // messages from UI to Generator

var genMessagePosted = false;


//uiClearLocalData('windowWidth');
//uiClearLocalData('windowHeight');
//uiClearLocalData('productKey');

//uiRemoveConnsToNodes(['num10']);
//uiRemoveAllSavedNodesAndConns();

uiLogAllSavedNodesAndConns();



var currentUser = '';



const graph = new Graph();

const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));
        



var     copiedNodesJson = '';
var duplicatedNodesJson = '';

var pasteOffset         = [ 0,   0];
var pasteOffsetDelta    = [40, 100];



clearConsole();



uiQueueMessageToFigma({cmd: 'figStartGenerator'});

function uiEndStartGenerator(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    uiGetLocalData('graphView');
    uiQueueMessageToFigma({cmd: 'figLoadNodesAndConns'});

    //uiEndResizeWindow();

    window.focus();
}
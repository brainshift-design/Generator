var figMessages = [];



//uiClearLocalData('windowWidth');
//uiClearLocalData('windowHeight');
//uiClearLocalData('productKey');

//uiClearPageData('GA rect');
uiLogAllSavedNodesAndConns();
//uiRemoveAllSavedNodesAndConns();


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



uiPostMessageToFigma({cmd: 'figStartGenerator'});

function uiEndStartGenerator(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    uiGetLocalData('graphView');
    uiPostMessageToFigma({cmd: 'figLoadNodesAndConns'});        

    uiEndResizeWindow();

    window.focus();
}
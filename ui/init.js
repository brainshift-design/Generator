var figMessages = []; // messages from UI to Figma
var genMessages = []; // messages from UI to Generator

var genMessagePosted = false;


//uiClearLocalData('windowWidth');
//uiClearLocalData('windowHeight');
//uiClearLocalData('productKey');

//uiRemoveConnsToNodes(['num10']);
//uiRemoveSavedNodesAndConns(['color']);
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
initColor();

uiQueueMessageToFigma({cmd: 'figStartGenerator'});

function uiEndStartGenerator(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    uiGetLocalData('graphView');


    uiGetLocalData('showNodeId'      );
    
    uiGetLocalData('logMessages'     );
    uiGetLocalData('logActions'      );
    uiGetLocalData('logRawLoading'   );
    uiGetLocalData('logRawSaving'    );
    uiGetLocalData('logLoading'      );
    uiGetLocalData('logRawRequests'  );
    uiGetLocalData('logRawValues'    );
    uiGetLocalData('logRequests'     );
    uiGetLocalData('logValueUpdates' );
    uiGetLocalData('logObjectUpdates');


    uiQueueMessageToFigma({cmd: 'figLoadNodesAndConns'});

    //uiEndResizeWindow();


    initModeColors();
    
    initMenuBar();
    
    
    window.focus();
}
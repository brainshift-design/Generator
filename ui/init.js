var uiFigMessages = []; // messages from UI to Figma
var genMessages   = []; // messages from UI to Generator

var genMessagePosted = false;


var dataMode = true;


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

uiQueueMessageToFigma({cmd: 'figStartGenerator'});



function uiEndStartGenerator(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;


    initThemeColors();


    if (dataMode)
    {
        dataView.style.display = 'block';
        initDataModeMenus();
    }
    else
    {
        initGeneratorMenus();
        loadLocalSettings();
    }    
 
    
    uiQueueMessageToFigma({cmd: 'figLoadNodesAndConns'});


    onClassChange(document.childNodes[0], () =>
    { 
        initThemeColors();
        
        if (!dataMode)
            graph.nodes.forEach(n => n.updateNode());
    });


    window.focus();
}
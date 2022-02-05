var figMessages = [];


//uiSaveLocal('state', null);
//uiSaveLocal('windowWidth',  null);
//uiSaveLocal('windowHeight', null);
//uiSaveLocal('productKey', null);


var currentUser = '';


const graph = new Graph();

const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));


//const buf = new SharedArrayBuffer(1024);


var     copiedNodesJson = '';
var duplicatedNodesJson = '';

var pasteOffset         = [ 0,   0];
var pasteOffsetDelta    = [40, 100];


clearConsole();


uiPostMessageToFigma({ 
    cmd:    'figLoadState',
    onLoad: 'figLoadState'
});
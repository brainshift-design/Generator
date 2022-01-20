//uiSaveLocal('state', null);
//uiSaveLocal('windowWidth',  null);
//uiSaveLocal('windowHeight', null);
//uiSaveLocal('productKey', null);


var currentUser = '';

var figMessages = [];


const graph = new Graph();

const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));


const buf = new SharedArrayBuffer(1024);

        
console.clear();


uiPostMessageToFigma({ 
    cmd:    'figLoadState',
    onLoad: 'figLoadState'
});
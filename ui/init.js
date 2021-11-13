//save('state', null);
//save('windowWidth', null);
//save('windowHeight', null);
//uiSaveLocal('productKey', null);


var currentUser = '';


const uiGraph = new UGraph();

const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));


const buf = new SharedArrayBuffer(1024);

        
uiPostMessageToFigma({ 
    cmd:    'figLoadState',
    onLoad: 'figLoadState'
});
//save('state', null);
//save('windowWidth', null);
//save('windowHeight', null);
//uiSaveLocal('productKey', null);


var currentUser = '';


const uiGraph = new UGraph();

const generator = new Worker(
    window.URL.createObjectURL(
        new Blob([generatorScript.textContent])));


        
uiPostMessageToFigma({ 
    cmd:    'figLoadState',
    onLoad: 'figLoadState'
});
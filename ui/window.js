// document.canResizeL = false;
// document.canResizeR = false;
// document.canResizeB = false;
   
// document.resizingL  = false;
// document.resizingR  = false;
// document.resizingB  = false;


window.width;
window.height;

document.startRect  = new Rect();



//window.addEventListener('keydown',       e => e.preventDefault());

window.addEventListener('gesturestart',  e => e.preventDefault());
window.addEventListener('gesturechange', e => e.preventDefault());
window.addEventListener('gestureend',    e => e.preventDefault());



var crashed = false;
var darkMode;



function checkResize(x, y)
{
    if (!documentBodyClient)
    {
        setAutoCursor();
        return;
    }


    // document.canResizeL = false;//!currentDialog &&                      x <= resizeEdgeWidth;
    // document.canResizeR = !currentDialog && window.innerWidth  - x <= resizeEdgeWidth;
    // document.canResizeB = !currentDialog && window.innerHeight - y <= resizeEdgeWidth;

    
    // if (     document.canResizeR
    //       && document.canResizeB) setCursor('nwse-resize', false); 
    // else if (document.canResizeL
    //       && document.canResizeB) setCursor('nesw-resize', false); 
    // else if (document.canResizeL
    //       || document.canResizeR) setCursor('ew-resize',   false);   
    // else if (document.canResizeB) setCursor('ns-resize',   false);   
    // else                          setAutoCursor();
}



function uiSetWindowRect(x, y, width, height)
{
    uiQueueMessageToFigma({ 
        cmd:   'figSetWindowRect', 
        x:      x,
        y:      y,
        width:  Math.max(660, width),
        height: height
    });
}



function uiResizeWindow(width, height)
{
    width  = Math.max(minWindowWidth,  width );
    height = Math.max(minWindowHeight, height);

    updateObjectCountDisplay();


    btnSolo.div.style.display = 
        window.innerWidth >= 646 
        ? 'inline-block' 
        : 'none';

        
    uiQueueMessageToFigma({ 
        cmd:   'figResizeWindow', 
        width:  width,
        height: height
    });


    if (searchShown)
        updateSearchBox();
}



function updateMenuItemShowGrid()
{
    graph.currentPage.refreshPanAndZoom();

    graph.currentPage.nodes.forEach(node =>
    {
        node.slx = node.x;
        node.sly = node.y;
    });

    if (settings.showGrid)
        graphView.setNodePositions(graph.currentPage.nodes, 0, 0);
}



function updateObjectCountDisplay()
{
    if (   !objectCountWrapper
        || !objectCountNumber)
        return;

    objectCountNumber.innerHTML     = totalObjectCount;
    objectCountProgress.style.width = totalObjectProgress * 41;

    objectCountWrapper.style.display = 
           settings.showObjectCount
        && window.innerWidth >= 698 
        ? 'inline-block' 
        : 'none';
}



function uiReturnFigResizeWindow(width, height)
{
    if (settings.debugMode)
        return;

    documentBodyClient = clientRect(document.body);

    graphView.update();
    updateWhatsNewScrollbar(0);

    // updateSnapshots();


    graph.updatePageName();
}



function uiUpdateWindowStartRect(msg)
{
    document.startRect = new Rect(
        msg.position.x - msg.clientPosition.x,
        msg.position.y - msg.clientPosition.y,
        window.innerWidth,
        window.innerHeight);

    // console.log('position       =', position);
    // console.log('clientPosition =', clientPosition);

    viewportZoom = msg.viewportZoom;
    viewportRect = msg.viewportRect;
    
    document.startRectIsValid = true;
}



function isDarkMode()
{
    const style = window.getComputedStyle(document.body);
    return isDark(style2rgba(style.backgroundColor));
}



// create an observer for when the UI theme changes

function onClassChange(element, callback) 
{
    const observer = new MutationObserver((mutations) => 
    {
        mutations.forEach((mutation) => 
        {
            if (   mutation.type          == 'attributes' 
                && mutation.attributeName == 'class'    )
                callback(mutation.target);
        });
    });

    observer.observe(element, { attributes: true });

    return observer.disconnect;
}



function dockWindowNormal  () { uiQueueMessageToFigma({cmd: 'figDockWindowNormal'  }); }
function dockWindowMaximize() { uiQueueMessageToFigma({cmd: 'figDockWindowMaximize'}); }
function dockWindowTop     () { uiQueueMessageToFigma({cmd: 'figDockWindowTop'     }); }
function dockWindowLeft    () { uiQueueMessageToFigma({cmd: 'figDockWindowLeft'    }); }
function dockWindowRight   () { uiQueueMessageToFigma({cmd: 'figDockWindowRight'   }); }
function dockWindowBottom  () { uiQueueMessageToFigma({cmd: 'figDockWindowBottom'  }); }

// document.canResizeL = false;
// document.canResizeR = false;
// document.canResizeB = false;
   
// document.resizingL  = false;
// document.resizingR  = false;
// document.resizingB  = false;

document.startRect  = new Rect();



//window.addEventListener('keydown',       e => e.preventDefault());

window.addEventListener('gesturestart',  e => e.preventDefault());
window.addEventListener('gesturechange', e => e.preventDefault());
window.addEventListener('gestureend',    e => e.preventDefault());



var crashed     = false;
var dialogShown = false;

var darkMode;



function checkResize(x, y)
{
    if (!documentBodyClient)
    {
        setAutoCursor();
        return;
    }


    // document.canResizeL = false;//!dialogShown &&                      x <= resizeEdgeWidth;
    // document.canResizeR = !dialogShown && window.innerWidth  - x <= resizeEdgeWidth;
    // document.canResizeB = !dialogShown && window.innerHeight - y <= resizeEdgeWidth;

    
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
        width:  Math.max(500, width),
        height: height
    });
}



function uiResizeWindow(width, height)
{
    uiQueueMessageToFigma({ 
        cmd:   'figResizeWindow', 
        width:  Math.max(500, width),
        height: height
    });
}



function uiReturnFigResizeWindow()
{
    if (settings.dataMode)
        return;

    graphView.update();
    updateWhatsNewScrollbar(0);

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

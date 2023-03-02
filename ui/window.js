document.canResizeL = false;
document.canResizeR = false;
document.canResizeB = false;
   
document.resizingL  = false;
document.resizingR  = false;
document.resizingB  = false;

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


    const resizeEdgeWidth = 8;

    document.canResizeL = !dialogShown && false;//x <= resizeEdgeWidth;
    document.canResizeR = !dialogShown && documentBodyClient.width  - x <= resizeEdgeWidth;
    document.canResizeB = !dialogShown && documentBodyClient.height - y <= resizeEdgeWidth;

    
    if (       document.canResizeR
            && document.canResizeB) setCursor('nwse-resize', false); 
    else if (  document.canResizeL
            && document.canResizeB) setCursor('nesw-resize', false); 
    else if (document.canResizeL
          || document.canResizeR)   setCursor('ew-resize',   false);   
    else if (document.canResizeB)   setCursor('ns-resize',   false);   
    else                            setAutoCursor();
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
    if (!settings.dataMode)
    {
        graphView.updatePanAndZoom(false);
        graphView.updateScrollWithBounds();

        updateWhatsNewScrollbar(0);
    }

    graphViewClient = clientRect(graphView);
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
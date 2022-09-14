document.canResizeX = false;
document.canResizeY = false;
   
document.resizingX  = false;
document.resizingY  = false;

document.startRect  = new Rect();



window.addEventListener('keydown',       e => e.preventDefault());

window.addEventListener('gesturestart',  e => e.preventDefault());
window.addEventListener('gesturechange', e => e.preventDefault());
window.addEventListener('gestureend',    e => e.preventDefault());



function checkResize(x, y)
{
    const resizeEdgeWidth = 8;

    document.canResizeX = document.body.clientWidth  - x <= resizeEdgeWidth;
    document.canResizeY = document.body.clientHeight - y <= resizeEdgeWidth;

         if (document.canResizeX
          && document.canResizeY) setCursor('nwse-resize', false); 
    else if (document.canResizeX) setCursor('ew-resize',   false);   
    else if (document.canResizeY) setCursor('ns-resize',   false);   
    else                          setAutoCursor();
}



function uiResizeWindow(width, height)
{
    uiQueueMessageToFigma({ 
        cmd:   'figResizeWindow', 
        width:  Math.max(500, width),
        height: height
    });
}



function uiEndResizeWindow()
{
    graphView.updatePanAndZoom();

    // btnZoom.style.top  = 0;
    // btnZoom.style.left = window.innerWidth - btnZoom.offsetWidth;

    // btnToggleWires.style.top  = 0;
    // btnToggleWires.style.left = btnZoom.offsetLeft - btnToggleWires.offsetWidth;
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
                && mutation.attributeName == 'class') 
                callback(mutation.target);
        });
    });

    observer.observe(element, { attributes: true });

    return observer.disconnect;
}



onClassChange(document.childNodes[0], () =>
{ 
    initModeColors();
    graph.nodes.forEach(n => n.updateNode());
});
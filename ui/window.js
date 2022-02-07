document.canResizeX    = false;
document.canResizeY    = false;
   
document.resizingX     = false;
document.resizingY     = false;

document.startRect = new Rect();



window.addEventListener('keydown',       e => e.preventDefault());

window.addEventListener('gesturestart',  e => e.preventDefault());
window.addEventListener('gesturechange', e => e.preventDefault());
window.addEventListener('gestureend',    e => e.preventDefault());



function resizeWindow(width, height)
{
    uiPostMessageToFigma({ 
        cmd:   'figResizeWindow', 
        width:  width,
        height: height
    });
}



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
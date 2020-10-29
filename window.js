const resizeEdgeWidth = 8;

document.canResizeX = false;
document.canResizeY = false;

document.resizingX  = false;
document.resizingY  = false;

document.startX     = 0;
document.startY     = 0;

document.startH     = 0;
document.startW     = 0;


document.addEventListener('pointerdown', function(e)
{
    if (   document.canResizeX
        || document.canResizeY)
    {
        if (document.canResizeX) document.resizingX = true;
        if (document.canResizeY) document.resizingY = true;

        document.startX   = e.clientX;
        document.startY   = e.clientY;

        document.startW   = window.innerWidth;
        document.startH   = window.innerHeight;

        document.body.setPointerCapture(e.pointerId);
    }
});


document.addEventListener('pointermove', function(e)
{
    if (   document.resizingX
        && document.resizingY)
    {
        resizeWindow(
            document.startW + e.clientX - document.startX,
            document.startH + e.clientY - document.startY);
    }
    else if (document.resizingX)
    {
        resizeWindow(
            document.startW + e.clientX - document.startX,
            document.body.clientHeight);
    }
    else if (document.resizingY)
    {
        resizeWindow(
            document.body.clientWidth,
            document.startH + e.clientY - document.startY);
    }
    else
        checkResize(e.clientX, e.clientY);
});


document.addEventListener('pointerup', function(e)
{
    if (   document.resizingX
        || document.resizingY)
    {
        document.resizingX = false;
        document.resizingY = false;
        
        checkResize(e.clientX, e.clientY);
        document.body.releasePointerCapture(e.pointerId);
    }
});


function resizeWindow(width, height)
{
    parent.postMessage({ pluginMessage: 
    { 
        cmd:    'resizeWindow', 
        width:  width,
        height: height
    }}, '*');

}


function checkResize(x, y)
{
    document.canResizeX = document.body.clientWidth  - x <= resizeEdgeWidth;
    document.canResizeY = document.body.clientHeight - y <= resizeEdgeWidth;

         if (document.canResizeX
          && document.canResizeY) document.body.style.cursor = 'nwse-resize';
    else if (document.canResizeX) document.body.style.cursor = 'ew-resize';
    else if (document.canResizeY) document.body.style.cursor = 'ns-resize';
    else                          document.body.style.cursor = 'auto';
}
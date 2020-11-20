const resizeEdgeWidth = 8;

document.canResizeX = false;
document.canResizeY = false;

document.resizingX  = false;
document.resizingY  = false;

document.startRect = new Rect();


document.addEventListener('pointerdown', function(e)
{
    if (   document.canResizeX
        || document.canResizeY)
    {
        if (document.canResizeX) document.resizingX = true;
        if (document.canResizeY) document.resizingY = true;

        document.startRect = new Rect(
            e.clientX,
            e.clientY,
            window.innerWidth,
            window.innerHeight);

        document.body.setPointerCapture(e.pointerId);
    }
});


document.addEventListener('pointermove', function(e)
{
    if (   document.resizingX
        && document.resizingY)
    {
        resizeWindow(
            document.startRect.w + e.clientX - document.startRect.x,
            document.startRect.h + e.clientY - document.startRect.y);
    }
    else if (document.resizingX)
    {
        resizeWindow(
            document.startRect.w + e.clientX - document.startRect.x,
            document.body.clientHeight);
    }
    else if (document.resizingY)
    {
        resizeWindow(
            document.body.clientWidth,
            document.startRect.h + e.clientY - document.startRect.y);
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


document.addEventListener('keydown', e =>
{
    if (e.key == 'Delete')
    {
        removeNodes(graphView.selected);
        graphView._selected = [];
    }
    else if (e.code == 'KeyA'
          && e.ctrlKey)
    {
        graphView.selected = graph.nodes;
    }
    else if (e.code == 'Minus')
    {
        graphView.zoom /= 2;
    }
    else if (e.code == 'Equal')
    {
        graphView.zoom *= 2;
    }
    else if (e.code == 'Digit0'
          && e.shiftKey)
    {
        graphView.zoom = 1;
    }
});


function resizeWindow(width, height)
{
    parent.postMessage({ pluginMessage: 
    { 
        cmd:   'resizeWindow', 
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
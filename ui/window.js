const resizeEdgeWidth = 8;

document.canResizeX = false;
document.canResizeY = false;

document.resizingX  = false;
document.resizingY  = false;

document.startRect = new Rect();



function resizeWindow(width, height)
{
    graphView.updatePanAndZoom();

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
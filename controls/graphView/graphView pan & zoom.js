graphView._pan = point(0, 0);
  
Object.defineProperty(graphView, 'pan',
{
    get: () => graphView._pan,
    set: pan =>
    {
        if (graphView._pan == pan) return;
        graphView._pan = pan;
        graphView.updatePanAndZoom();
    }
});



graphView.panning = false;
graphView.panStart;

graphView.spaceDown = false;


graphView._zoom   = 1;
graphView.oldZoom = 1;

Object.defineProperty(graphView, 'zoom',
{
    get: () => graphView._zoom,
    set: zoom =>
    {
        if (graphView._zoom == zoom) return;

        let pos = point(
            window.innerWidth /2,
            window.innerHeight/2);

        pos.y -= controlBar.offsetHeight;

        const pan = subv(graphView.pan, mulvs(subv(pos, graphView.pan), zoom / graphView.zoom - 1));

        graphView.setPanAndZoom(pan, zoom);
    }
});



graphView.zooming   = false;
graphView.zoomStart = 1;

graphView.zoomSelecting = false;



graphView.setPanAndZoom = (pan, zoom) =>
{
    if ((   pan  != graphView._pan
         || zoom != graphView._zoom)
        && zoom >=  0.02
        && zoom <= 50   ) 
    {
        graphView.oldZoom = graphView.zoom;

        graphView._zoom = zoom;
        graphView._pan  = pan;
    }

    graphView.updatePanAndZoom();
};



graphView.updatePanAndZoom = () =>
{
    graphView.updateNodeTransforms(graph.nodes);
    
    const x       = graphView.clientLeft;
    const w       = graphView.clientWidth;
    const h       = graphView.clientHeight;
    const yOffset = controlBar.offsetHeight;
    const bounds  = graphView.getAllNodeBounds();
    
    graphView.updateNodeTransforms(graph.nodes); // this has to be done twice because getAllNodeBounds() forces a reflow
    graphView.updateScroll(x, w, h, bounds, yOffset);

    btnZoom.innerHTML = Math.round(graphView.zoom * 100) + '%';
};



graphView.startPan = pointerId =>
{
    graphView.panning  = true;
    graphView.panStart = graphView.pan;
    graphView.setPointerCapture(pointerId);
    setCursor(panCursor);
};



graphView.endPan = (pointerId, changeCursor) =>
{
    graphView.panning = false;
    graphView.releasePointerCapture(pointerId);

    if (changeCursor)
        setAutoCursor();
};



graphView.startZoomSelection = (pointerId, x, y) =>
{
    graphView.setPointerCapture(pointerId);

    graphView.zoomSelecting = true;
    graphView.selectionRect = new Rect(x, y, 0, 0);
    
    selectBox.style.visibility = 'visible';
    graphView.updateZoomSelectBox();
};



graphView.updateZoomSelection = (x, y) =>
{
    if (!graphView.zoomSelecting) return;

    graphView.selectionRect.w = x - graphView.selectionRect.x;
    graphView.selectionRect.h = y - graphView.selectionRect.y;

    graphView.updateZoomSelectBox();
};



graphView.updateZoomSelectBox = () =>
{
    const selection = graphView.selectionRect;

    selectBox.style.left   = selection.x + Math.min(selection.w, 0);
    selectBox.style.top    = selection.y + Math.min(selection.h, 0);
    selectBox.style.width  = Math.abs(selection.w);
    selectBox.style.height = Math.abs(selection.h);

    selectBox.style.zIndex = MAX_INT32-3;
};



graphView.endZoomSelection = (pointerId, zoom) =>
{
    graphView.releasePointerCapture(pointerId);

    graphView.zoomSelecting    = false;
    selectBox.style.visibility = 'hidden';

    const selection = graphView.selectionRect;

    if (zoom)
    {
        // graphView.oldZoom = graphView.zoom;
        
        let box = {
            x: selection.x,
            y: selection.y - controlBar.offsetHeight,
            w: selection.w,
            h: selection.h };
            
        const wndHeight = graphView.offsetHeight; 

        const diff = { w: (window.innerWidth - box.w) / 2,
                       h: (wndHeight         - box.h) / 2 };

        graphView.setPanAndZoom(
            point(
                -(box.x - diff.w) * graphView.zoom,
                -(box.y - diff.h) * graphView.zoom),
            graphView.zoom * Math.min(
                window.innerWidth / box.w,
                wndHeight         / box.h));
    }

    graphView.selectionRect = Rect.NaN;
};
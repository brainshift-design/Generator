graphView._pan = point(0, 0);
  
Object.defineProperty(graphView, 'pan',
{
    get: () => graphView._pan,
    set: pan =>
    {
        if (graphView._pan == pan) return;

        graphView._pan = pan;
        
        uiSaveGraphView();
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

        pos.y -= menuBarHeight;

        const pan = subv(graphView.pan, mulvs(subv(pos, graphView.pan), zoom / graphView.zoom - 1));

        graphView.setPanAndZoom(pan, zoom);
    }
});



graphView.zooming   = false;
graphView.zoomStart = 1;

graphView.zoomSelecting = false;


graphView.panZoomTimer = null;



graphView.setPanAndZoom = function(pan, zoom)
{
    if ((   pan  != graphView._pan
         || zoom != graphView._zoom)
        && zoom >= 0.02
        && zoom <= 50) 
    {
        graphView.oldZoom = graphView.zoom;

        graphView._zoom = zoom;
        graphView._pan  = pan;

        uiSaveGraphView();


        graphView.panZoomTimer = setTimeout(() => 
        {
            graphView.updatePanAndZoom(graphView.zoom != graphView.oldZoom);
            graphView.panZoomTimer = null;
        });
    }
};



graphView.updatePanAndZoom = function(updateNodes)
{
    graphView.update(graph.nodes, updateNodes);
    
    btnZoom.divIcon.innerHTML       = Math.round(graphView.zoom * 100) + '%';
    btnZoom.divIcon.style.transform = 'translateX(2px) translateY(-16px)';

    menuItemZoomTo100.setChecked(equal(graphView.zoom, 1, 0.0001));
};



graphView.update = function(nodes = null, updateNodes = true)
{
    if (!nodes)
        node = graph.nodes;
        
    
    documentBodyClient = clientRect(document.body);


    graphView.updateNodeTransforms(nodes, false);
    graphView.updateNodeTransforms(nodes); // this has to be done twice //because getAllNodeBounds() forces a reflow

    nodes.forEach(n => n.updateMeasureData());

    if (updateNodes)
    {
        nodes.forEach(n =>
        {
            n.updateHeader(); 
            n.updateHeaderLabel();
            n.updateBorder();
        });
    }


    const x = graphViewClient.left;
    const w = graphViewClient.width;
    const h = graphViewClient.height;
    
    const bounds = graphView.getAllNodeBounds();
    
    graphView.updateScroll(x, w, h, bounds, menuBarHeight);
};



graphView.startPan = function(pointerId)
{
    graphView.setPointerCapture(pointerId);

    graphView.panning  = true;
    graphView.panStart = graphView.pan;

    setCursor(panCursor);
};



graphView.endPan = (pointerId, changeCursor) =>
{
    graphView.panning = false;

    graphView.releasePointerCapture(pointerId);

    if (changeCursor)
        setAutoCursor();
};



graphView.startZoomSelection = function(pointerId, x, y)
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



graphView.updateZoomSelectBox = function()
{
    const selection = graphView.selectionRect;

    selectBox.style.left   = selection.x + Math.min(selection.w, 0);
    selectBox.style.top    = selection.y + Math.min(selection.h, 0);
    selectBox.style.width  = Math.abs(selection.w);
    selectBox.style.height = Math.abs(selection.h);

    selectBox.style.zIndex = MAX_INT32-3;
};



graphView.endZoomSelection = function(pointerId, zoom)
{
    graphView.releasePointerCapture(pointerId);

    graphView.zoomSelecting    = false;
    selectBox.style.visibility = 'hidden';

    
    const wndRect = new Rect(
        1,
        menuBarHeight + 1,
        graphViewClient.width  - 2,
        graphViewClient.height - 5);


    let selection = validateRect(graphView.selectionRect);
    
    selection = clipRect(selection, wndRect);


    if (zoom)
    {
        //console.log('selection =', selection);
        graphView.oldZoom = graphView.zoom;
        
        graphView.zoomToRect(new Rect(
            selection.x,
            selection.y - menuBarHeight,
            selection.w,
            selection.h));
 
        // let box = {
        //     x: selection.x,
        //     y: selection.y - menuBarHeight,
        //     w: selection.w,
        //     h: selection.h };
            
        // const wndHeight = graphView.offsetHeight; 

        // const diff = { w: (window.innerWidth - box.w) / 2,
        //                h: (wndHeight         - box.h) / 2 };

        // graphView.setPanAndZoom(
        //     point(
        //         -(box.x - diff.w) * graphView.zoom,
        //         -(box.y - diff.h) * graphView.zoom),
        //     graphView.zoom * Math.min(
        //         window.innerWidth / box.w,
        //         wndHeight         / box.h));
    }

    graphView.selectionRect = Rect.NaN;
};



graphView.zoomToFit = function()
{
    const nodes = 
        !isEmpty(graphView.selectedNodes)
        ? graphView.selectedNodes
        : graph.nodes;
    
    for (let i = 0; i < 4; i++)
    {
        nodes.forEach(n => n.updateMeasureData());
        const offset = graphView.getAllNodeOffsets(nodes);
        
        graphView.zoomToRect(offset);
    }
};



graphView.zoomToRect = function(rect, margin = 40)
{
    // console.log('1 zoom rect =', rect);
    // console.log('1 graphView.pan =', graphView.pan);
    // console.log('1 graphView.zoom =', graphView.zoom);

    margin /= graphView.zoom;

    graphView.zoom = Math.min(
        graphViewClient.width  / (rect.width  + margin*2),
        graphViewClient.height / (rect.height + margin*2));

    graphView.pan = {
        x: graphViewClient.width /2 - (rect.x + rect.width /2) * graphView.zoom,
        y: graphViewClient.height/2 - (rect.y + rect.height/2) * graphView.zoom
    };

    // console.log('2 graphView.pan =', graphView.pan);
};
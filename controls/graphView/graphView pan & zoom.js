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

    log(
        'selection =' + JSON.stringify(graphView.selectionRect)
      + '<br/>pan =' + JSON.stringify(graphView.pan)
      + '<br/>zoom =' + JSON.stringify(graphView.zoom));

    const p1 = point2screen(point(0, 0));//point(e.clientX, e.clientY);
    dot1.style.left = p1.x;
    dot1.style.top  = p1.y;

    const p2 = point2screen(point(100, 0));//point(e.clientX, e.clientY);
    dot2.style.left = p2.x;
    dot2.style.top  = p2.y;

    const p3 = point2screen(point(0, 100));//point(e.clientX, e.clientY);
    dot3.style.left = p3.x;
    dot3.style.top  = p3.y;

    const p4 = point2screen(point(100, 100));//point(e.clientX, e.clientY);
    dot4.style.left = p4.x;
    dot4.style.top  = p4.y;
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

    //console.log('graphView.selectionRect =', graphView.selectionRect);

    graphView.updateZoomSelectBox();
};



graphView.updateZoomSelectBox = function()
{
    const selection = Rect.fromTypical(graphView.selectionRect);

    selectBox.style.left   = selection.x + Math.min(selection.w, 0);
    selectBox.style.top    = selection.y + Math.min(selection.h, 0);
    selectBox.style.width  = Math.abs(selection.w);
    selectBox.style.height = Math.abs(selection.h);

    selectBox.style.zIndex = MAX_INT32-3;


    // selection.x -= graphView.pan.x * graphView.zoom;
    // selection.y -= graphView.pan.y * graphView.zoom;
    // selection.w *= graphView.zoom;
    // selection.h *= graphView.zoom;
};



graphView.endZoomSelection = function(pointerId, zoom)
{
    const wndRect = new Rect(
        1,
        menuBarHeight + 1,
        graphViewClient.width  - 2,
        graphViewClient.height - 5);

    // console.log('XX graphView.selectionRect =', graphView.selectionRect);
    let selection = validateRect(graphView.selectionRect);

    // console.log('selection =', selection);

    selection = clipRect(selection, wndRect);

    // console.log('selection.x =', selection.x);
    // console.log('selection.y =', selection.y);
    // console.log('selection.w =', selection.w);
    // console.log('selection.h =', selection.h);
    // console.log('graphView.zoom =', graphView.zoom);

    if (zoom)
    {
        graphView.oldZoom = graphView.zoom;

        // graphView.pan = point(
        //     selection.x - graphView.pan.x / graphView.zoom,
        //     selection.y - graphView.pan.y / graphView.zoom);
        // selection.w *= graphView.zoom;
        // selection.h *= graphView.zoom;


        // log(
        //     'selection = ' + JSON.stringify(selection) 
        //   + '<br/>pan = '  + JSON.stringify(graphView.pan)
        //   + '<br/>zoom = ' + JSON.stringify(graphView.zoom));
     
        //graphView.zoomToRect(rect2screen(selection));
    }


    graphView.selectionRect = Rect.NaN;


    graphView.releasePointerCapture(pointerId);

    graphView.zoomSelecting    = false;
    selectBox.style.visibility = 'hidden';
};



graphView.zoomToFit = function()
{
    const nodes = 
        !isEmpty(graphView.selectedNodes)
        ? graphView.selectedNodes
        : graph.nodes;
    
    for (let i = 0; i < 4; i++) // need to do it a few times
    {
        nodes.forEach(n => n.updateMeasureData());
        const offset = graphView.getAllNodeOffsets(nodes);
        
        graphView.zoomToRect(offset);
    }

    const offset = graphView.getAllNodeOffsets(nodes);

    console.log('pan =', graphView.pan);
    console.log('zoom =', graphView.zoom);
    console.log('offset =', offset);
};



graphView.zoomToRect = function(rect, margin = 40)
{
    margin /= graphView.zoom;

    graphView.zoom = Math.min(
        graphViewClient.width  / (rect.width  + margin*2),
        graphViewClient.height / (rect.height + margin*2));

    graphView.pan = {
        x: graphViewClient.width /2 - (rect.x + rect.width /2) * graphView.zoom,
        y: graphViewClient.height/2 - (rect.y + rect.height/2) * graphView.zoom
    };
};
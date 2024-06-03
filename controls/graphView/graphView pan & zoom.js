//var dragOutTimer = null;



function checkDragOut()
{
    const pan  = graph.currentPage ? graph.currentPage.pan  : point(0, 0);
    const zoom = graph.currentPage ? graph.currentPage.zoom : 1;

    const offset = 10;
    
    if (graphView.p.x >= graphView.offsetWidth)
        graph.currentPage.setPanAndZoom(point(pan.x + offset, pan.y), zoom);
}



GraphView.prototype.updatePanAndZoom = function(updateNodes)
{
    this.updateNodes(graph.pageNodes, updateNodes);

        
    setTimeout(() =>
    {
        updateZoomTooltip();
        updateZoomIcon();

        if (menuItemZoomTo100)
            menuItemZoomTo100.setChecked(equal(graph.currentPage.zoom, 1, 0.0001));
    });


    //console.log('pan = %s, zoom = %s', graph.currentPage.pan.x + ', ' + graph.currentPage.pan.y, graph.currentPage.zoom);
};



GraphView.prototype.startPan = function(pointerId)
{
    try 
    {
        this.div.setPointerCapture(pointerId);

        this.panning  = true;
        this.panStart = graph.currentPage.pan;

        setCursor(panCursor);
    }
    catch {}
};



GraphView.prototype.endPan = function(pointerId, changeCursor)
{
    this.panning = false;

    this.div.releasePointerCapture(pointerId);

    if (changeCursor)
        setAutoCursor();

    graph.updateSavedPages();
};



GraphView.prototype.isPanning = function(e)
{
    if (panMode)
    {
        e.preventDefault();
        setCursor(panCursor);
        return true;
    }

    if (this.spaceDown)
    {
        e.preventDefault();
        return true;
    }

    return false;
};



GraphView.prototype.startZoomSelection = function(pointerId, x, y)
{
    try
    {
        this.div.setPointerCapture(pointerId);

        this.zoomSelecting = true;
        this.selectionRect = new Rect(x, y, 0, 0);
        
        selectBox.style.visibility = 'visible';
        
        this.updateZoomSelectBox();
    }
    catch {}
};



GraphView.prototype.updateZoomSelection = function(x, y)
{
    if (!this.zoomSelecting) return;

    this.selectionRect.w = x - this.selectionRect.x;
    this.selectionRect.h = y - this.selectionRect.y;

    this.updateZoomSelectBox();
};



GraphView.prototype.updateZoomSelectBox = function()
{
    const selection = Rect.fromRect(this.selectionRect);

    selectBox.style.left   = selection.x + Math.min(selection.w, 0);
    selectBox.style.top    = selection.y + Math.min(selection.h, 0);
    selectBox.style.width  = Math.abs(selection.w);
    selectBox.style.height = Math.abs(selection.h);

    selectBox.style.zIndex = MAX_INT32 - 3;
};



GraphView.prototype.endZoomSelection = function(pointerId, zoom)
{
    if (zoom)
    {
        this.oldZoom = graph.currentPage.zoom;


        const wndRect = new Rect(
            1,
            getTopHeight() + 1,
            this.measureData.clientRect.width  - 2,
            this.measureData.clientRect.height - 5);
    
        let selection = validateRect(this.selectionRect);
        selection = clipRect(selection, wndRect);
    
        selection.y -= getTopHeight();

        
        const rect = this.screen2rect(selection);

        for (let i = 0; i < 5; i++)
            this.zoomToRect(rect, 0);
    }


    this.selectionRect = Rect.NaN;


    this.div.releasePointerCapture(pointerId);

    this.zoomSelecting    = false;
    selectBox.style.visibility = 'hidden';


    graph.updateSavedPages();
};



GraphView.prototype.zoomToFit = function()
{
    if (!isEmpty(graph.pageNodes))
        this.zoomToNodes(graph.pageNodes);
    else
        graph.currentPage.setPanAndZoom(point(0, 0), 1);
};



GraphView.prototype.zoomToSelection = function()
{
    if (!isEmpty(this.selectedNodes)) 
        this.zoomToNodes(this.selectedNodes);
};



GraphView.prototype.zoomToNodes = function(nodes, zoom = true, topOffset = 0)
{
    if (!isEmpty(nodes))
    {
        nodes.forEach(n => n.updateMeasureData());
        const offset = this.getAllNodeOffsets(nodes);

        let heightOffset = 0;

        if (presets.offsetParent !== null)
            heightOffset = presets.offsetHeight;
        else if (keyboardPanel.offsetParent !== null)
            heightOffset = keyboardPanel.offsetHeight;

        offset.y -= topOffset / graph.currentPage.zoom;
        offset.h += (-topOffset + heightOffset) / graph.currentPage.zoom;

        for (let i = 0; i < 5; i++) // need to do it a few times
            this.zoomToRect(offset, 40, zoom);
    }
};



GraphView.prototype.zoomToRect = function(rect, margin = 40, zoom = true)
{
    const viewRect   = this.measureData.clientRect;

    const viewAspect = viewRect.width / viewRect.height;
    const rectAspect = rect.width     / rect.height;


    if (zoom)
    {
        graph.currentPage.zoom = 
            viewRect.width >= viewRect.height
        
            ? (   rect.width >= rect.height
               && rectAspect > viewAspect
               ? (viewRect.width  - margin*2) / rect.width  
               : (viewRect.height - margin*2) / rect.height)
        
            : (   rect.width <  rect.height
               && rectAspect <= viewAspect
               ? (viewRect.height - margin*2) / rect.height 
               : (viewRect.width  - margin*2) / rect.width );
    }


    graph.currentPage.pan = 
    {
        x: viewRect.width /2 - (rect.x + rect.width /2) * graph.currentPage.zoom,
        y: viewRect.height/2 - (rect.y + rect.height/2) * graph.currentPage.zoom
    };

    
    graph.updateSavedPages();
};



function updateZoomIcon()
{
    if (settings.debugMode)
        return;

    
    const zoom =
        graph.currentPage
        ? graph.currentPage.zoom
        : 1;


    if (btnZoom)
    {
        btnZoom.divIcon.innerHTML       =  Math.round(zoom * 100) + '%';
        btnZoom.divIcon.style.transform = 'translateX(2px) translateY(-15px)';
    }


    const _zoomIconOverlay = document.getElementById("zoomIconOverlay");

    if (_zoomIconOverlay)
    {
        if (   zoom < settings.minZoomForParams
            && zoom < 1)
        {
            btnZoom.div.style.color = 'black';
            _zoomIconOverlay.style.left       = '14px';
            _zoomIconOverlay.style.top        = '11px';
            _zoomIconOverlay.style.width      = '28';
            _zoomIconOverlay.style.height     = '20';
            _zoomIconOverlay.style.background = 'url(\'data:image/svg+xml;utf8,<svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4C0 1.79086 1.79086 0 4 0H24C26.2091 0 28 1.79086 28 4V20H0V4Z" fill="white"/></svg>\')';
        }
        else if (zoom < settings.minZoomForParams
            && zoom < 10)
        {
            btnZoom.div.style.color = 'black';
            _zoomIconOverlay.style.left       = '12px';
            _zoomIconOverlay.style.top        = '11px';
            _zoomIconOverlay.style.width      = '33';
            _zoomIconOverlay.style.height     = '20';
            _zoomIconOverlay.style.background = 'url(\'data:image/svg+xml;utf8,<svg width="33" height="20" viewBox="0 0 33 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4C0 1.79086 1.79086 0 4 0H29C31.2091 0 33 1.79086 33 4V20H0V4Z" fill="white"/></svg>\')';
        }
        else
        {
            btnZoom.div.style.color = 'white';
            _zoomIconOverlay.style.background = 'none';
        }


        _zoomIconOverlay.style.backgroundPosition = '50% 50%';
        _zoomIconOverlay.style.backgroundRepeat   = 'no-repeat';
        _zoomIconOverlay.style.backgroundColor    = 'transparent';
    }
}
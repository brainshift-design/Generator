class GraphView
{
    div;

    wireContainer;

    scrollbarX;
    scrollbarY;


    wires              = [];


    creatingNodes      = false;
    loadingNodes       = false;
    pastingNodes       = false;
    _zoomToFitNodes    = false;
    _zoomToFitObjects  = false;
    restoringNodes     = false;


    canUpdateNodes     = true;


    activeNodes        = [];


    overNode           = null;
    overInput          = null;
    overOutput         = null;

    headerInput        = null; // same as overInput, but when snapping from a header
    headerOutput       = null; // same as overOutput, but when snapping from a header
        
    tempConn           = null;
    tempConnSwap       = null;
    savedConn          = null;
    tempConnected      = false;

    connPointerId      = -1;

    soloMode           = false;
    _soloNode          = null;

    selecting          = false;
    selectionTimeout   = null;
    selectionRect      = Rect.NaN;

    startedInPanel     = false;

    gridSize           = 16;


    btn1down           = false; // this is to help deal with mouse wheels that send X values as
                                // sometimes a MMB press is followed by wheelX as a "deeper" middle-click

    altDown            = false;
    panning            = false;
    
    pViewport; 
    pStart             = point(0, 0);
    zoomStart;


    touches            = [];


    wheelTimer         = null;
    panTimer           = null;


    measureData        = {};



    panning            = false;
    panStart;
    
    spaceDown          = false;
    
    placePosition      = point(0, 0);
    placeFromPointer   = false;
    
    
    oldZoom            = 1;


    zooming            = false;
    zoomStart          = 1;

    zoomSelecting      = false;


    panZoomTimer       = null;

    hScrollFromControl = null; // the control where the scroll started, or null if it started in the graphView



    _selectedNodes     = [];
    _prevSelectedNodes = [];
    lastSelectedNodes  = [];
    
    
    get selectedNodes() { return this._selectedNodes; }
    set selectedNodes(nodes)
    {
        this.deselectAll();

        this._selectedNodes = [...nodes];
    
        for (const node of this._selectedNodes)
            node.setSelected(true);
    }



    constructor(div)
    {
        this.div                     = div;
          
        this.wireContainer           = createDiv('wireContainer');
                  
        this.scrollbarX              = createDiv('scrollbar', 'scrollbarX');
        this.scrollbarY              = createDiv('scrollbar', 'scrollbarY');


        this.scrollbarX.style.zIndex = MAX_INT32 - 1;
        this.scrollbarY.style.zIndex = MAX_INT32 - 2;

        this.scrollbarX.moving       = false;
        this.scrollbarY.moving       = false;


        this.div.appendChild(this.wireContainer);
        this.div.appendChild(this.scrollbarX);
        this.div.appendChild(this.scrollbarY);


        this.createEvents();
        this.createScrollbarMethods();
    }



    update()
    {
        graphView.updatePanAndZoom(false);
        graphView.updateScrollWithBounds();
        graphView.div.style.height = 'calc(100% - ' + (getTopHeight() + getBottomHeight()) + 'px)';
        graphView.updateMeasureData();
    }



    updateMeasureData()
    {
        this.measureData.clientRect = clientRect(this.div);
    }



    getNodeArrayBounds(nodes)
    {
        let bounds = Rect.NaN;

        for (const node of nodes)
            bounds = expandRect(bounds, boundingRect(node.div));

        return bounds;
    }



    getAllNodeBounds(onlySelected = false)
    {
        let bounds = Rect.NaN;

        const nodes =
                onlySelected
            && !isEmpty(this.selectedNodes)
            ? this.selectedNodes
            : graph.pageNodes;

        for (const node of nodes)
            bounds = expandRect(bounds, boundingRect(node.div));

        return bounds;
    }



    getAllNodeOffsets(nodes = null)
    {
        let bounds = Rect.NaN;

        if (!nodes)
            nodes = graph.pageNodes;

        for (const node of nodes)
            bounds = expandRect(bounds, offsetRect(node.div));

        return bounds;
    }



    // getAllNodeBounds()
    // {
    //     let bounds = Rect.NaN;

    //     for (const node of graph.pageNodes)
    //         bounds = expandRect(bounds, boundingRect(node.div));

    //     return bounds;
    // }



    getNodeBounds(node)
    {
        const bounds = boundingRect(node.div);

        return new Rect(
            parseFloat(node.div.style.left ),
            parseFloat(node.div.style.top  ),
            parseFloat(node.div.style.width),
            bounds.h / graph.currentPage.zoom); // node height isn't defined
    }



    getZoomedNodeBounds(node)
    {
        const bounds = this.getNodeBounds(node);

        bounds.x += graph.currentPage.pan.x / graph.currentPage.zoom;
        bounds.y += graph.currentPage.pan.y / graph.currentPage.zoom;
        bounds.w /= graph.currentPage.zoom;
        bounds.h /= graph.currentPage.zoom;

        return bounds;
    }



    getIntersectingNodes(node)
    {
        const nodeBounds = this.getZoomedNodeBounds(node);

        const intersecting = [];
        
        for (const n of graph.pageNodes)
        {
            const nBounds = this.getZoomedNodeBounds(n);
            
            if (   n != node
                && rectsIntersect(nBounds, nodeBounds))
                intersecting.push(n);
        }

        return intersecting;
    }



    placeNewNode(node, fromSearch = false)
    {
        let ox = this.div.offsetWidth /2;
        let oy = this.div.offsetHeight/2;

        
        if (this.placeFromPointer)
        {
            ox = this.placePosition.x;
            oy = this.placePosition.y;
        }
        else if (fromSearch && graphView.p)
        {
            ox = graphView.p.x;
            oy = graphView.p.y - menuBarHeight;
        }


        let x, y;

        if (node.type == PANEL)
        {
            x = (ox - graph.currentPage.pan.x) / graph.currentPage.zoom - defPanelWidth /2;
            y = (oy - graph.currentPage.pan.y) / graph.currentPage.zoom - (fromSearch ? defHeaderHeight/2 : defPanelHeight/2);
        }
        else
        {
            const nodeHeight = defHeaderHeight + node.params.length * defParamHeight;
            
            x = (ox - graph.currentPage.pan.x) / graph.currentPage.zoom - defNodeWidth/2;
            y = (oy - graph.currentPage.pan.y) / graph.currentPage.zoom - (fromSearch ? defHeaderHeight/2 : nodeHeight/2);
        }


        [x, y] = node.getGridPosition(x, y);
        
        node.div.style.left = x;
        node.div.style.top  = y;


        this.placeFromPointer = false;
    }



    autoPlaceNewNode(output, input)
    {
        const defaultPlacementGap = 40;

        let x = output.node.div.offsetLeft + output.node.div.offsetWidth + defaultPlacementGap;
        let y = output.node.div.offsetTop;

        [x, y] = input.node.getGridPosition(x, y);

        input.node.div.style.left = x;
        input.node.div.style.top  = y;
    }



    autoPlaceNewVariableNode(outputs, node)
    {
        const defaultPlacementGap = 40;

        let left = Number.NaN;
        let top  = Number.NaN;

        
        for (const out of outputs)
        {
            const _left = out.node.div.offsetLeft + out.node.div.offsetWidth + defaultPlacementGap;
            const _top  = out.node.div.offsetTop;

            left = isNaN(left) ? _left : Math.max(left, _left);
            top  = isNaN(top)  ? _top  : top + _top;
        }


        if (outputs.length > 0)
        {
            top /= outputs.length;

            [left, top] = input.node.getGridPosition(left, top);

            node.div.style.left = left;
            node.div.style.top  = top;
        }
    }



    putNodeOnTop(node)
    {
        const topIndices = 
               1 
            + (node.inputs ? node.inputs.filter(i => i.connected).length : 0)
            + (node.outputs && node.outputs.find(o => o.connected) ? 1 : 0);
            
        for (const n of graph.pageNodes)
            n.div.style.zIndex = Math.max(0, Number(n.div.style.zIndex) - topIndices);
            
        node.div.style.zIndex = MAX_INT32 - 3; // -3 is for scrollbars;

        this.putWiresOnTop(node);
    }



    putWiresOnTop(node)
    {
        // changing z-index doesn't work so easily with SVG,
        // so reinsert the wires on top instead 🤷‍♂️

        let z = MAX_INT32;

        for (const input of node.inputs.filter(i => i.connected))
        {
            this.wireContainer.removeChild(input.connection.wire.svg);
            this.wireContainer.appendChild(input.connection.wire.svg);
        }
            
        for (const output of node.outputs)
        {
            for (const connInput of output.connectedInputs)
            {
                this.wireContainer.removeChild(connInput.connection.wire.svg);
                this.wireContainer.appendChild(connInput.connection.wire.svg);
            }
        }
    }



    showCompatibleInputs(output = null)
    {
        for (const node of graph.pageNodes)
            for (const input of node.inputs)
                input.div.style.opacity = 
                       !output 
                    || input.canConnectFrom(output)
                    || input.connected
                    ? 1 
                    : 0;
    }
    
    
    
    hideAllInputs(except = null)
    {
        for (const node of graph.pageNodes)
            for (const input of node.inputs)
                if (    input != except
                    && !input.connected)
                    input.div.style.opacity = 0;
    }
    
    
   
    showCompatibleOutputs(input = null)
    {
        for (const node of graph.pageNodes)
            for (const output of node.outputs)
                output.div.style.opacity = 
                       !input 
                    ||  input.canConnectFrom(output)
                    || output.connected
                    ? 1 
                    : 0;
    }
    
    
    
    hideAllOutputs(except = null)
    {
        for (const node of graph.pageNodes)
            for (const output of node.outputs)
                if (    output != except
                    && !output.connected)
                    output.div.style.opacity = 0;
    }
    
    
   
    // point2screen(p)
    // {
    //     return point(
    //         (p.x + graph.currentPage.pan.x / graph.currentPage.zoom) * graph.currentPage.zoom,
    //         (p.y + graph.currentPage.pan.y / graph.currentPage.zoom) * graph.currentPage.zoom);
    // }
    
    
    
    // screen2point(p)
    // {
    //     return point(
    //         p.x / graph.currentPage.zoom - graph.currentPage.pan.x / graph.currentPage.zoom,
    //         p.y / graph.currentPage.zoom - graph.currentPage.pan.y / graph.currentPage.zoom);
    // }
    
    
    
    // rect2screen(rect)
    // {
    //     return new Rect(
    //         (rect.x + graph.currentPage.pan.x / graph.currentPage.zoom) * graph.currentPage.zoom,
    //         (rect.y + graph.currentPage.pan.y / graph.currentPage.zoom) * graph.currentPage.zoom,
    //         rect.width  * graph.currentPage.zoom,
    //         rect.height * graph.currentPage.zoom);
    // }
    
    
    
    screen2rect(rect)
    {
        return new Rect(
            rect.x      / graph.currentPage.zoom - graph.currentPage.pan.x / graph.currentPage.zoom,
            rect.y      / graph.currentPage.zoom - graph.currentPage.pan.y / graph.currentPage.zoom,
            rect.width  / graph.currentPage.zoom,
            rect.height / graph.currentPage.zoom);
    }
    
    
    
    // toJson()
    // {
    //     const tab = '\n' + HTAB;

    //     return '{'
    //         + tab + '"zoom": "' + graph.currentPage.zoom  + '",'
    //         + tab + '"panx": "' + graph.currentPage.pan.x + '",'
    //         + tab + '"pany": "' + graph.currentPage.pan.y + '"'
    //         + '\n}';
    // };
}
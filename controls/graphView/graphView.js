class GraphView
{
    div;

    wireContainer;

    scrollbarX;
    scrollbarY;


    wires          = [];
    

    creatingNodes  = false;
    loadingNodes   = false;
    pastingNodes   = false;
    restoringNodes = false;


    canUpdateNodes = true;


    activeNodes    = [];


    overNode       = null;
    overInput      = null;
    overOutput     = null;
        
    headerInput    = null; // same as overInput, but when snapping from a header
    headerOutput   = null; // same as overOutput, but when snapping from a header
        
    tempConn       = null;
    tempConnSwap   = null;
    savedConn      = null;
    tempConnected  = false;

    connPointerId  = -1;

    //_soloNode      = null;
    
    selecting      = false;
    selectionRect  = Rect.NaN;

    btn1down       = false; // this is to help deal with mouse wheels that send X values as
                             // sometimes a MMB press is followed by wheelX as a "deeper" middle-click

    altDown        = false;

    panning        = false;
    
    pViewport; 
    pStart         = point(0, 0);
    zoomStart;


    touches        = [];


    wheelTimer     = null;


    measureData    = {};



    panning = false;
    panStart;
    
    spaceDown = false;
    
    
    
    oldZoom = 1;


    zooming       = false;
    zoomStart     = 1;

    zoomSelecting = false;


    panZoomTimer  = null;



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


        this.scrollbarX.style.zIndex = MAX_INT32-1;
        this.scrollbarY.style.zIndex = MAX_INT32-2;

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
        graphView.div.style.height = 'calc(100% - ' + getTopHeight() + 'px)';
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



    placeNewNode(node)
    {
        const nodeRect = boundingRect(node.div);
        
        const btn = node._creatingButton;

        if (graphView.p)
        {
            node.div.style.left = (graphView.p.x - graph.currentPage.pan.x                ) / graph.currentPage.zoom - defNodeWidth   /2;
            node.div.style.top  = (graphView.p.y - graph.currentPage.pan.y - menuBarHeight) / graph.currentPage.zoom - defHeaderHeight/2;
        }
        else
        {
            if (btn)
            {
                node.div.style.left = (btn.offsetLeft + btn.offsetWidth/2 - graph.currentPage.pan.x) / graph.currentPage.zoom - nodeRect.width/2;
                node.div.style.top  = (20 - graph.currentPage.pan.y) / graph.currentPage.zoom;
            }
            else
            {
                node.div.style.left = (this.div.offsetWidth /2 - graph.currentPage.pan.x                ) / graph.currentPage.zoom - nodeRect.width /2;
                node.div.style.top  = (this.div.offsetHeight/2 - graph.currentPage.pan.y - getTopHeight()) / graph.currentPage.zoom - nodeRect.height/2;
            }
        }
    }



    autoPlaceNewNode(output, input)
    {
        //console.log('GraphView.autoPlaceNewNode()');

        const defaultPlacementGap = 30;

        input.node.div.style.left = output.node.div.offsetLeft + output.node.div.offsetWidth + defaultPlacementGap;
        input.node.div.style.top  = output.node.div.offsetTop;//outputRect.y - graph.currentPage.pan.y/graph.currentPage.zoom - (inputRect.y - inputNodeRect.y);
    }



    putNodeOnTop(node)
    {
        const topIndices = 
               1 
            +  node.inputs.filter(i => i.connected).length 
            + (node.outputs.find(o => o.connected) ? 1 : 0);
            
        for (const n of graph.pageNodes)
            n.div.style.zIndex = Math.max(0, Number(n.div.style.zIndex) - topIndices);
            
        node.div.style.zIndex = MAX_INT32-3; // -3 is for scrollbars;

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
                    || input.canConnectFrom(output)
                    || !output.connected
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
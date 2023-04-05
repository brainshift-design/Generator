class GraphView
{
    div;

    wireContainer;

    scrollbarX;
    scrollbarY;


    graph;


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

    _soloNode      = null;
    
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



    _pan = point(0, 0);
        
    get pan() { return this._pan; }
    set pan(pan)
    {
        if (this._pan == pan) return;

        this._pan = pan;
        
        uiSaveGraphView();
        this.updatePanAndZoom(true);
    }
    

    panning = false;
    panStart;

    spaceDown = false;

    

    _zoom   = 1;
    oldZoom = 1;

    get zoom() { return this._zoom; }
    set zoom(zoom)
    {
        if (this._zoom == zoom) return;

        let pos = point(
            window.innerWidth /2,
            window.innerHeight/2);

        pos.y -= menuBarHeight;

        const _pan = subv(this.pan, mulvs(subv(pos, this.pan), zoom / this.zoom - 1));

        this.setPanAndZoom(_pan, zoom);
    }



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



    constructor(div, graph)
    {
        this.div                     = div;
        this.div.view                = this;
          
        this.graph                   = graph;
        this.graph.view              = this;
          
                  
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



    updateMeasureData()
    {
        this.measureData.clientRect = clientRect(this.div);
    }



    getAllNodeBounds(onlySelected = false)
    {
        let bounds = Rect.NaN;

        const nodes =
                onlySelected
            && !isEmpty(this.selectedNodes)
            ? this.selectedNodes
            : this.graph.nodes;

        for (const node of nodes)
            bounds = expandRect(bounds, boundingRect(node.div));

        return bounds;
    }



    getAllNodeOffsets(nodes = null)
    {
        let bounds = Rect.NaN;

        if (!nodes)
            nodes = this.graph.nodes;

        for (const node of nodes)
            bounds = expandRect(bounds, offsetRect(node.div));

        return bounds;
    }



    getAllNodeBounds()
    {
        let bounds = Rect.NaN;

        for (const node of this.graph.nodes)
            bounds = expandRect(bounds, boundingRect(node.div));

        return bounds;
    }



    getNodeBounds(node)
    {
        const bounds = boundingRect(node.div);

        return new Rect(
            parseFloat(node.div.style.left ),
            parseFloat(node.div.style.top  ),
            parseFloat(node.div.style.width),
            bounds.h / this.zoom); // node height isn't defined
    }



    getZoomedNodeBounds(node)
    {
        const bounds = this.getNodeBounds(node);

        bounds.x += this.pan.x / this.zoom;
        bounds.y += this.pan.y / this.zoom;
        bounds.w /= this.zoom;
        bounds.h /= this.zoom;

        return bounds;
    }



    getIntersectingNodes(node)
    {
        const nodeBounds = this.getZoomedNodeBounds(node);

        const intersecting = [];
        
        for (const n of this.graph.nodes)
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
        //console.log('GraphView.placeNewNode()');

        const nodeRect = boundingRect(node.div);
        
        const btn = node._creatingButton;

        if (btn)
        {
            node.div.style.left = (btn.offsetLeft + btn.offsetWidth/2 - this.pan.x) / this.zoom - nodeRect.width/2;
            node.div.style.top  = (20 - this.pan.y) / this.zoom;
        }
        else
        {
            node.div.style.left = (this.div.offsetWidth /2 - this.pan.x                ) / this.zoom - nodeRect.width /2;
            node.div.style.top  = (this.div.offsetHeight/2 - this.pan.y - menuBarHeight) / this.zoom - nodeRect.height/2;
        }
    }



    autoPlaceNewNode(output, input)
    {
        //console.log('GraphView.autoPlaceNewNode()');

        const defaultPlacementGap = 30;

        input.node.div.style.left = output.node.div.offsetLeft + output.node.div.offsetWidth + defaultPlacementGap;
        input.node.div.style.top  = output.node.div.offsetTop;//outputRect.y - this.pan.y/this.zoom - (inputRect.y - inputNodeRect.y);
    }



    putNodeOnTop(node)
    {
        const topIndices = 
               1 
            +  node.inputs.filter(i => i.connected).length 
            + (node.outputs.find(o => o.connected) ? 1 : 0);
            
        for (const n of this.graph.nodes)
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




    // point2screen(p)
    // {
    //     return point(
    //         (p.x + this.pan.x / this.zoom) * this.zoom,
    //         (p.y + this.pan.y / this.zoom) * this.zoom);
    // }
    
    
    
    // screen2point(p)
    // {
    //     return point(
    //         p.x / this.zoom - this.pan.x / this.zoom,
    //         p.y / this.zoom - this.pan.y / this.zoom);
    // }
    
    
    
    // rect2screen(rect)
    // {
    //     return new Rect(
    //         (rect.x + this.pan.x / this.zoom) * this.zoom,
    //         (rect.y + this.pan.y / this.zoom) * this.zoom,
    //         rect.width  * this.zoom,
    //         rect.height * this.zoom);
    // }
    
    
    
    screen2rect(rect)
    {
        return new Rect(
            rect.x / this.zoom - this.pan.x / this.zoom,
            rect.y / this.zoom - this.pan.y / this.zoom,
            rect.width  / this.zoom,
            rect.height / this.zoom);
    }
    
    
    
    toJson()
    {
        const tab = '\n' + HTAB;

        return '{'
            + tab + '"zoom": "' + this.zoom  + '",'
            + tab + '"panx": "' + this.pan.x + '",'
            + tab + '"pany": "' + this.pan.y + '"'
            + '\n}';
    };
}
class   OpNodeGroup
extends OperatorBase
{
    // graph;
    // view;

    //paramView;


    canResizeL  = false;
    canResizeR  = false;
    canResizeT  = false;
    canResizeB  = false;

    canResizeTL = false;
    canResizeTR = false;
    canResizeBL = false;
    canResizeBR = false;
    

    resizingL   = false;
    resizingR   = false;
    resizingT   = false;
    resizingB   = false;

    resizingTL  = false;
    resizingTR  = false;
    resizingBL  = false;
    resizingBR  = false;

    resizing    = false;
    


    constructor()
    {
        super(NODE_GROUP, 'group');

        // mainGraph = mainGraph;
        // this.view  = graphView;

        //mainGraph.parentNodeGroup = this;
        this.sharpBottomCorners = true;
        
        this.div.style.height = '100px';

        //this.addParam(this.paramValue = new ViewParam('view', this));


        this.div.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                this.resizing = false;

                if (this.canResizeTL) { this.resizingTL = this.resizing = true; }
                if (this.canResizeTR) { this.resizingTR = this.resizing = true; }
                if (this.canResizeBL) { this.resizingBL = this.resizing = true; }
                if (this.canResizeBR) { this.resizingBR = this.resizing = true; }
                if (this.canResizeL ) { this.resizingL  = this.resizing = true; }
                if (this.canResizeR ) { this.resizingR  = this.resizing = true; }
                if (this.canResizeT ) { this.resizingT  = this.resizing = true; }
                if (this.canResizeB ) { this.resizingB  = this.resizing = true; }

                if (this.resizing)
                {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    this.div.setPointerCapture(e.pointerId);

                    this.sx = e.clientX;
                    this.sy = e.clientY;

                    this.startRect = this.measureData.divOffset;
                }
            }        
        });


        this.div.addEventListener('pointermove', e =>
        {
            const dx = this.resizing ? (e.clientX - this.sx) / mainGraph.view.zoom : 0;
            const dy = this.resizing ? (e.clientY - this.sy) / mainGraph.view.zoom : 0;
            
            
            if (this.resizingTL)
            {
                this.setRect(
                    this.startRect.x + dx, 
                    this.startRect.y + dy,
                    this.startRect.w - dx,
                    this.startRect.h - dy);
            }
            else if (this.resizingTR)
            {
                this.setRect(
                    this.startRect.x, 
                    this.startRect.y + dy,
                    this.startRect.w + dx,
                    this.startRect.h - dy);
            }
            else if (this.resizingBL)
            {
                this.setRect(
                    this.startRect.x + dx, 
                    this.startRect.y,
                    this.startRect.w - dx,
                    this.startRect.h + dy);
            }
            else if (this.resizingBR)
            {
                this.setRect(
                    this.startRect.x, 
                    this.startRect.y,
                    this.startRect.w + dx,
                    this.startRect.h + dy);
            }
            else if (this.resizingL)
            {
                this.setRect(
                    this.startRect.x + dx, 
                    this.startRect.y,
                    this.startRect.w - dx,
                    this.startRect.h);
            }
            else if (this.resizingR)
            {
                this.setRect(
                    this.startRect.x, 
                    this.startRect.y,
                    this.startRect.w + dx,
                    this.startRect.h);
            }
            else if (this.resizingT)
            {
                this.setRect(
                    this.startRect.x, 
                    this.startRect.y + dy,
                    this.startRect.w,
                    this.startRect.h - dy);
            }
            else if (this.resizingB)
            {
                this.setRect(
                    this.startRect.x, 
                    this.startRect.y,
                    this.startRect.w,
                    this.startRect.h + dy);
            }
            else
                this.checkResizing(e);


            if (this.resizing)
            {
                e.preventDefault();
                e.stopImmediatePropagation();

                this.updateMeasureData();
            }
        });
        
        
        this.div.addEventListener('pointerup', e =>
        {
            this.resizingL  = false;
            this.resizingR  = false;
            this.resizingT  = false;
            this.resizingB  = false;
        
            this.resizingTL = false;
            this.resizingTR = false;
            this.resizingBL = false;
            this.resizingBR = false;

            this.resizing   = false;

            
            if (this.div.hasPointerCapture(e.pointerId))
                this.div.releasePointerCapture(e.pointerId);
        });
    }
    
    

    checkResizing(e)
    {
        if (   e.clientX >= this.measureData.divBounds.l
            && e.clientX <  this.measureData.divBounds.l + resizeEdgeWidth
            && e.clientY >= this.measureData.divBounds.t + resizeEdgeWidth
            && e.clientY <  this.measureData.divBounds.b - resizeEdgeWidth)
        {
            this.canResizeL = true;
            this.div.style.cursor = 'ew-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.r - resizeEdgeWidth
              && e.clientX <  this.measureData.divBounds.r
              && e.clientY >= this.measureData.divBounds.t + resizeEdgeWidth
              && e.clientY <  this.measureData.divBounds.b - resizeEdgeWidth)
        {
            this.canResizeR = true;
            this.div.style.cursor = 'ew-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.l + resizeEdgeWidth
              && e.clientX <  this.measureData.divBounds.r - resizeEdgeWidth
              && e.clientY >= this.measureData.divBounds.t
              && e.clientY <  this.measureData.divBounds.t + resizeEdgeWidth)
        {
            this.canResizeT = true;
            this.div.style.cursor = 'ns-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.l + resizeEdgeWidth
              && e.clientX <  this.measureData.divBounds.r - resizeEdgeWidth
              && e.clientY >= this.measureData.divBounds.b - resizeEdgeWidth
              && e.clientY <  this.measureData.divBounds.b)
        {
            this.canResizeB = true;
            this.div.style.cursor = 'ns-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.l
              && e.clientX <  this.measureData.divBounds.l + resizeEdgeWidth
              && e.clientY >= this.measureData.divBounds.t
              && e.clientY <  this.measureData.divBounds.t + resizeEdgeWidth)
        {
            this.canResizeTL = true;
            this.div.style.cursor = 'nwse-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.r - resizeEdgeWidth
              && e.clientX <  this.measureData.divBounds.r 
              && e.clientY >= this.measureData.divBounds.t
              && e.clientY <  this.measureData.divBounds.t + resizeEdgeWidth)
        {
            this.canResizeTR = true;
            this.div.style.cursor = 'nesw-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.l
              && e.clientX <  this.measureData.divBounds.l + resizeEdgeWidth
              && e.clientY >= this.measureData.divBounds.b - resizeEdgeWidth
              && e.clientY <  this.measureData.divBounds.b )
        {
            this.canResizeBL = true;
            this.div.style.cursor = 'nesw-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.r - resizeEdgeWidth
              && e.clientX <  this.measureData.divBounds.r 
              && e.clientY >= this.measureData.divBounds.b - resizeEdgeWidth
              && e.clientY <  this.measureData.divBounds.b )
        {
            this.canResizeBR = true;
            this.div.style.cursor = 'nwse-resize';
            return true;
        }
        else
        {
            this.canResizeL  = false;
            this.canResizeR  = false;
            this.canResizeT  = false;
            this.canResizeB  = false;
        
            this.canResizeTL = false;
            this.canResizeTR = false;
            this.canResizeBL = false;
            this.canResizeBR = false;

            this.div.style.cursor = 'default';

            return false;
        }
    }



    updateNode()
    {
        super.updateNode();

        this.div.style.zIndex = 0;

        this.inner.style.height = this.div.offsetHeight;
        this.inner.style.backgroundColor = 'var(--figma-color-border-disabled)';
    }



    setSize(w, h, updateTransform = true)
    {
        super.setSize(w, Math.max(this.header.offsetHeight, h), updateTransform);

        this.inner.style.height = this.div.offsetHeight;
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(x, y, w, Math.max(this.header.offsetHeight, h), updateTransform);

        this.inner.style.height = this.div.offsetHeight;
    }



    genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        // const input = this.inputs[0];


        // request.push(input.connected ? 1 : 0);

        // if (input.connected)
        //     request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    // updateValues(requestId, actionId, updateParamId, paramIds, values) // virtual
    // {
    //     super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    // }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}

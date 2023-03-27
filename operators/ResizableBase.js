class   ResizableBase
extends OperatorBase
{
    canResizeL  = false;
    canResizeR  = false;
    canResizeB  = false;

    canResizeBL = false;
    canResizeBR = false;
    

    resizingL   = false;
    resizingR   = false;
    resizingB   = false;

    resizingBL  = false;
    resizingBR  = false;

    resizing    = false;
    


    constructor(type, shortName)
    {
        super(type, shortName);


        this.div.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                this.startRect = offsetRect(this.div);
                this.resizing  = false;

                     if (this.canResizeBL) { this.resizingBL = this.resizing = true; }
                else if (this.canResizeBR) { this.resizingBR = this.resizing = true; }
                else if (this.canResizeL ) { this.resizingL  = this.resizing = true; }
                else if (this.canResizeR ) { this.resizingR  = this.resizing = true; }
                else if (this.canResizeB ) { this.resizingB  = this.resizing = true; }


                if (this.resizing)
                {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    this.div.setPointerCapture(e.pointerId);

                    this.sx = e.clientX;
                    this.sy = e.clientY;
                }
            }        
        });



        this.div.addEventListener('pointermove', e =>
        {
            const dx = this.resizing ? (e.clientX - this.sx) / mainGraph.view.zoom : 0;
            const dy = this.resizing ? (e.clientY - this.sy) / mainGraph.view.zoom : 0;
            
            
                 if (this.resizingTL) this.setRect(this.startRect.x + dx, this.startRect.y + dy, this.startRect.w - dx, this.startRect.h - dy);
            else if (this.resizingTR) this.setRect(this.startRect.x,      this.startRect.y + dy, this.startRect.w + dx, this.startRect.h - dy);
            else if (this.resizingBL) this.setRect(this.startRect.x + dx, this.startRect.y,      this.startRect.w - dx, this.startRect.h + dy);
            else if (this.resizingBR) this.setRect(this.startRect.x,      this.startRect.y,      this.startRect.w + dx, this.startRect.h + dy);
            else if (this.resizingL ) this.setRect(this.startRect.x + dx, this.startRect.y,      this.startRect.w - dx, this.startRect.h     );
            else if (this.resizingR ) this.setRect(this.startRect.x,      this.startRect.y,      this.startRect.w + dx, this.startRect.h     );
            else if (this.resizingT ) this.setRect(this.startRect.x,      this.startRect.y + dy, this.startRect.w,      this.startRect.h - dy);
            else if (this.resizingB ) this.setRect(this.startRect.x,      this.startRect.y,      this.startRect.w,      this.startRect.h + dy);
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
            if (e.button == 0)
            {
                if (this.resizing)
                {
                    actionManager.do(new SetNodeRectAction(
                        this.graph, 
                        this.id, 
                        this.startRect, 
                        offsetRect(this.div)));
                }


                this.resetResize();

                
                if (this.div.hasPointerCapture(e.pointerId))
                    this.div.releasePointerCapture(e.pointerId);
            }
        });
    }



    resetResize(resetResizing = true)
    {
        this.canResizeL  = false;
        this.canResizeR  = false;
        this.canResizeB  = false;
    
        this.canResizeBL = false;
        this.canResizeBR = false;

        if (resetResizing)
        {
            this.resizingL  = false;
            this.resizingR  = false;
            this.resizingB  = false;
        
            this.resizingBL = false;
            this.resizingBR = false;

            this.resizing   = false;
        }
    }



    checkResizing(e)
    {
        this.resetResize(false);

        if (   e.clientX >= this.measureData.divBounds.l
            && e.clientX <  this.measureData.divBounds.l + resizeEdgeWidth
            && e.clientY >= this.measureData.divBounds.b - resizeEdgeWidth
            && e.clientY <  this.measureData.divBounds.b)
        {
            this.canResizeBL      = true;
            this.div.style.cursor = 'nesw-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.r - resizeEdgeWidth
              && e.clientX <  this.measureData.divBounds.r 
              && e.clientY >= this.measureData.divBounds.b - resizeEdgeWidth
              && e.clientY <  this.measureData.divBounds.b)
        {
            this.canResizeBR      = true;
            this.div.style.cursor = 'nwse-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.l
              && e.clientX <  this.measureData.divBounds.l + resizeEdgeWidth
              && e.clientY >= this.measureData.divBounds.t + resizeEdgeWidth
              && e.clientY <  this.measureData.divBounds.b - resizeEdgeWidth)
        {
            this.canResizeL       = true;
            this.div.style.cursor = 'ew-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.r - resizeEdgeWidth
              && e.clientX <  this.measureData.divBounds.r
              && e.clientY >= this.measureData.divBounds.t + resizeEdgeWidth
              && e.clientY <  this.measureData.divBounds.b - resizeEdgeWidth)
        {
            this.canResizeR       = true;
            this.div.style.cursor = 'ew-resize';
            return true;
        }
        else if (e.clientX >= this.measureData.divBounds.l + resizeEdgeWidth
              && e.clientX <  this.measureData.divBounds.r - resizeEdgeWidth
              && e.clientY >= this.measureData.divBounds.b - resizeEdgeWidth
              && e.clientY <  this.measureData.divBounds.b)
        {
            this.canResizeB       = true;
            this.div.style.cursor = 'ns-resize';
            return true;
        }
        else
        {
            this.div.style.cursor = 'default';
            return false;
        }
    }



    setSize(w, h, updateTransform = true)
    {
        super.setSize(
            Math.max(100, w), 
            Math.max(this.header.offsetHeight + 20, h), 
            updateTransform);

        this.inner.style.height = this.div.offsetHeight;
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(
            x, 
            y, 
            Math.max(100, w), 
            Math.max(this.header.offsetHeight + 20, h), updateTransform);

        this.inner.style.height = this.div.offsetHeight;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        let json = super.toJsonBase(nTab);

        json += ',\n' + pos + tab + '"width": "'  + this.div.offsetWidth  + 'px"';
        json += ',\n' + pos + tab + '"height": "' + this.div.offsetHeight + 'px"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);


        if (   _node.width
            && _node.height)
        {
            this.setSize(
                parseFloat(_node.width), 
                parseFloat(_node.height),
                false);
        }
    }
}

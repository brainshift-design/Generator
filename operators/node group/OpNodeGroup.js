class   OpNodeGroup
extends OperatorBase
{
    children = [];


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

        this.alwaysLoadParams   = true;
        this.sharpBottomCorners = true;
        
        this.div.style.height   = '100px';



        this.header.addEventListener('dblclick', e =>
        {
            console.log('dblclick');
            this.children.forEach(n => n.selected = true);
        });

        

        this.div.addEventListener('pointerdown', e =>
        {
            if (e.button == 0)
            {
                this.startRect = offsetRect(this.div);

                this.resizing = false;

                     if (this.canResizeTL) { this.resizingTL = this.resizing = true; }
                else if (this.canResizeTR) { this.resizingTR = this.resizing = true; }
                else if (this.canResizeBL) { this.resizingBL = this.resizing = true; }
                else if (this.canResizeBR) { this.resizingBR = this.resizing = true; }
                else if (this.canResizeL ) { this.resizingL  = this.resizing = true; }
                else if (this.canResizeR ) { this.resizingR  = this.resizing = true; }
                else if (this.canResizeT ) { this.resizingT  = this.resizing = true; }
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



    updateChildren()
    {
        this.children = [];

        for (const node of mainGraph.nodes)//.filter(n => !this.children.includes(n)))
        {
            if (rectInside(node.measureData.divOffset, offsetRect(this.div)))//measureData.divOffset))
                pushUnique(this.children, node);
        }


        // for (const node of this.children)
        // {
        //     if (!rectInside(node.measureData.divOffset, this.measureData.divOffset))
        //         removeFrom(this.children, node);
        // }


        this.removeAllParams();


        // for (const node of this.children)
        // {
        //     for (const param of node.params)
        //     {
        //         if (    param.output
        //             &&  param.output.connected)
        //         {
        //             let includes = false;

        //             for (const input of param.output.connectedInputs)
        //             {
        //                 if (this.children.includes(input.node))
        //                 {
        //                     includes = true;
        //                     break;
        //                 }
        //             }
                    
        //             if (!includes)
        //                 this.addParam(new ProxyParam(param));
        //         }
        //     }
        // }
        
console.log('this.children =', this.children.map(n => n.id));        
        for (const node of this.children)
        {
            for (const param of node.params)
            {
                console.log('checking');
                if (    param.input
                    &&  param.input.connected
                    && !this.children.find(n => n.id == param.input.connectedOutput.node.id))
                {
                    console.log('adding');
                    this.addParam(new ProxyParam(param));
                }
            }
        }
    }



    updateNode()
    {
        super.updateNode();

        this.div.style.zIndex = 0;

        this.inner.style.height          = this.div.offsetHeight;
        this.inner.style.backgroundColor = darkMode ? '#5558' : '#ddd8';// 'var(--figma-color-border-disabled)';
    }



    resetResize(resetResizing = true)
    {
        this.canResizeL  = false;
        this.canResizeR  = false;
        this.canResizeT  = false;
        this.canResizeB  = false;
    
        this.canResizeTL = false;
        this.canResizeTR = false;
        this.canResizeBL = false;
        this.canResizeBR = false;

        if (resetResizing)
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
        }
    }



    checkResizing(e)
    {
        this.resetResize(false);

        if (   e.clientX >= this.measureData.divBounds.l
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
        else if (e.clientX >= this.measureData.divBounds.l
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
        else
        {
            this.div.style.cursor = 'default';
            return false;
        }
    }



    setPosition(x, y, updateTransform = true)
    {
        super.setPosition(x, y, updateTransform);

        this.updateChildren();
    }



    setSize(w, h, updateTransform = true)
    {
        super.setSize(
            Math.max(100, w), 
            Math.max(this.header.offsetHeight + 20, h), 
            updateTransform);

        this.inner.style.height = this.div.offsetHeight;

        this.updateChildren();
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(
            x, 
            y, 
            Math.max(100, w), 
            Math.max(this.header.offsetHeight + 20, h), updateTransform);

        this.inner.style.height = this.div.offsetHeight;

        this.updateChildren();
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



    paramsToJson(nTab = 0)
    {
        return '';
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

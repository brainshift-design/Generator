GraphView.prototype.createEvents = function()
{
    this.div.addEventListener('pointerenter', e => 
    {
        if (    this.div.hasPointerCapture(e.pointerId)
            && !this.tempConn)
            this.div.releasePointerCapture(e.pointerId);
    });



    this.div.addEventListener('pointerleave', e => 
    {
        if (this.tempConn)
            this.div.setPointerCapture(e.pointerId);
    });



    this.div.addEventListener('pointerdown', e =>
    {
        if (   e.button == 0
            && (   document.canResizeL
                || document.canResizeR
                || document.canResizeB))
        {
            e.stopPropagation();
            forwardEvent(e, document);
        }
    }, 
    true);



    this.div.addEventListener('pointerdown', e =>
    {
        this.pStart = point(e.clientX, e.clientY);

        const sx = e.clientX;
        const sy = e.clientY;

        if (   e.button == 0
            && !this.panning
            && !this.tempConn
            && !this.scrollbarX.moving
            && !this.scrollbarY.moving
            && !document.canResizeL
            && !document.canResizeR
            && !document.canResizeB)
        {
            if (   this.spaceDown
                || panMode)
            {
                if (getCtrlKey(e)) this.startZoomSelection(e.pointerId, e.clientX, e.clientY);
                else               this.startPan(e.pointerId);
            }
            else if (this.overOutput)
            {
                this.overOutput.connecting = true;
                this.startConnectionFromOutput(e.pointerId, this.overOutput, true, getCtrlKey(e));

                this.tempConn.wire.update(sx, sy);
            }
            else if (this.overInput)
            {
                if (this.overInput.connectedOutput) // begin to disconnect
                {
                    oldReorderIndex = this.overInput.index;

                    this.startConnectionFromOutput(e.pointerId, this.overInput.connectedOutput, false, getCtrlKey(e));

                    this.tempConn.wire.update(sx, sy);

                    this.savedConn = this.overInput.connection;
                    this.savedConn.wire.show(false);
                }
                else
                {
                    this.overInput.connecting = true;
                    this.startConnectionFromInput(e.pointerId, this.overInput, getCtrlKey(e));

                    this.tempConn.wire.update(sx, sy);
                }
            }
            else if (document.activeElement.type != 'text') // selection, unless a textbox is in focus
            {
                this.lastSelectedNodes = [...this.selectedNodes];

                this.startSelection(
                    e.pointerId,
                    e.clientX,
                    e.clientY,
                    e.shiftKey,
                    getCtrlKey(e));
            }
        }

        else if (e.button == 1)
        {
            e.preventDefault();
            
            this.btn1down = true;
            setCursor(panCursor);
            this.startPan(e.pointerId);
        }

        else if (e.button == 2)
        {
            e.stopPropagation();

            if (isEmpty(currentMenus)) menuGraph.showAt(e.clientX, e.clientY, false, false);
            else                       hideAllMenus();
        }
    });



    this.div.addEventListener('pointermove', graphView_onpointermove);



    // this.div.addEventListener('pointermove', e =>
    // {
    //     if (   document.canResizeL
    //         || document.canResizeR
    //         || document.canResizeB)
    //     {
    //         //checkResize(e.clientX, e.clientY);
    //         e.stopImmediatePropagation();
    //     }
    // },
    // true);



    this.div.addEventListener('pointerup', e => 
    {
        if (   e.button == 0
            && (   this.spaceDown
                || panMode))
        {
            if (getCtrlKey(e))
            {
                if (    this.selectionRect.w != 0
                    &&  this.selectionRect.h != 0
                    && !this.altDown)
                {
                    this.oldZoom = graph.currentPage.zoom;
                    this.endZoomSelection(e.pointerId, true);
                }
                else if (this.altDown)
                {
                    const wndRect = new Rect(
                        1,
                        getTopHeight() + 1,
                        this.measureData.clientRect.width  - 2,
                        this.measureData.clientRect.height - 5);

                    const selection = Rect.fromTypical(this.selectionRect);


                    this.oldZoom = graph.currentPage.zoom;
                    this.endZoomSelection(e.pointerId, false);

                    graph.currentPage.zoom /= 2;
                    
                    
                    graph.currentPage.pan.x += wndRect.c - selection.c;
                    graph.currentPage.pan.y += wndRect.m - selection.m;


                    this.updateNodes();
                }
                else
                this.endZoomSelection(e.pointerId, false);
            }

            this.endPan(e.pointerId, false);


            if (this.panZoomTimer)
            {
                clearTimeout(this.panZoomTimer); 
                this.panZoomTimer = null;
            };
        }

        else if (e.button == 0
            && !this.selectionRect.isNaN)
            this.endSelection(e.pointerId);

        else if (e.button == 0
            && this.tempConn)
            this.endConnection(e.pointerId, getCtrlKey(e), e.shiftKey);

        else if (e.button == 1
            && this.panning)
        {
            this.btn1down = false;
            this.endPan(e.pointerId, true);
        }
    });



    this.div.addEventListener('dblclick', e =>
    {
        if (    e.button == 0
            && !e.shiftKey)
        {
            const activeNodes = [];

            for (const node of graph.currentPage.nodes)
            {
                if (node.active)
                {
                    uiMakeNodePassive(node);
                    activeNodes.push(node);
                }
            }

            uiSaveNodes(activeNodes.map(n => n.id));
            graphView.updateNodes(activeNodes);
            
            uiDeleteObjectsAndStyles(activeNodes.map(n => n.id));
        }
    });



    this.div.addEventListener('wheel', e =>
    {
        if (this.btn1down)
            return;


        // if button is not pressed wheel pans
        // if button is pressed, wheel does nothing if it's a touchpad

        e.preventDefault();


        const dZoom = Math.log(graph.currentPage.zoom) / Math.log(2);


        const touchpad = isTouchpad(e);

        const dWheelX = e.deltaX / (touchpad ? 20 : 100);
        const dWheelY = e.deltaY / (touchpad ? 20 : 100);


        if (   e.ctrlKey //getCtrlKey(e)
            ||     panMode
               && !touchpad)
        {
            let pos = point(
                e.clientX, 
                e.clientY - getTopHeight());

            const zoom = Math.max(0.0001, Math.pow(2, dZoom - dWheelY / (touchpad ? 4 : 10)));
            const pan  = subv(graph.currentPage.pan, mulvs(subv(pos, graph.currentPage.pan), zoom / graph.currentPage.zoom - 1));

            graph.currentPage.setPanAndZoom(pan, zoom);

            this.updateWheelTimer();
        }
        else
        {
            const dPanX = (e.shiftKey ? dWheelY : dWheelX) * 20 / Math.pow(graph.currentPage.zoom, 0.1);
            const dPanY = (e.shiftKey ? dWheelX : dWheelY) * 20 / Math.pow(graph.currentPage.zoom, 0.1);

            graph.currentPage.pan = point(
                graph.currentPage.pan.x - dPanX,
                graph.currentPage.pan.y - dPanY);

            
            if (this.selecting)
            {
                this.selectionRect.x -= dPanX;
                this.selectionRect.w += dPanX;

                this.selectionRect.y -= dPanY;
                this.selectionRect.h += dPanY;

                this.updateSelection(
                    e.clientX,
                    e.clientY,
                    e.shiftKey);
            } 


            this.updateWheelTimer();
        }


        if (this.tempConn)
            graphView_onpointermove(e);
    });



    this.div.addEventListener('gesturestart', e => { this.zoomStart = graph.currentPage.zoom; });



    this.div.addEventListener('gesturechange', e => 
    {
        const p = point(
            this.p.x,
            this.p.y - getTopHeight());

        const zoom = this.zoomStart * e.scale;
        const pan  = subv(graph.currentPage.pan, mulvs(subv(p, graph.currentPage.pan), zoom / graph.currentPage.zoom - 1));

        graph.currentPage.setPanAndZoom(pan, zoom);
    });



    this.div.addEventListener('touchstart', e =>
    {
        this.touches.push(e);
        e.preventDefault();
    });



    this.div.addEventListener('touchmove', e =>
    {
        for (let i = 0; i < this.touches.length; i++)
            if (this.touches[i].pointerId == e.pointerId)
            {
                this.touches[i] = e;
                break;
            }

        e.preventDefault();
    });



    this.div.addEventListener('touchend', e =>
    {
        for (let i = 0; i < this.touches.length; i++)
            if (this.touches[i].pointerId == e.pointerId)
            {
                this.touches.splice(i, 1);
                break;
            }

        e.preventDefault();
    });



    this.div.addEventListener('touchcancel', e =>
    {
        for (let i = 0; i < this.touches.length; i++)
            if (this.touches[i].pointerId == e.pointerId)
            {
                this.touches.splice(i, 1);
                break;
            }

        e.preventDefault();
    });
}



GraphView.prototype.updateWheelTimer = function()
{
    if (this.wheelTimer) 
        clearTimeout(this.wheelTimer);

    this.wheelTimer = setTimeout(() => 
    {
        this.wheelTimer = null;

        if (overNumberControl)
            overNumberControl.updateCursor();

        setAutoCursor();

        graph.updateSavedPages();
    }, 
    400);
};



function graphView_onpointermove(e)
{
    graphView.p = point(e.clientX, e.clientY);


    if (   (   graphView.panning
            || panMode)
        && graphView.div.hasPointerCapture(e.pointerId))
    {
        setCursor(panCursor);

        const dp = subv(graphView.p, graphView.pStart);

        graph.currentPage.setPanAndZoom(
            addv(graphView.panStart, dp), 
            graph.currentPage.zoom);
    }

    else if (graphView.selecting)
        graphView.updateSelection(e.clientX, e.clientY, e.shiftKey, getCtrlKey(e));

    else if (graphView.zoomSelecting)
        graphView.updateZoomSelection(e.clientX, e.clientY);

    else if (graphView.tempConn)
        graphView.tempConn.wire.update(e.clientX, e.clientY);
}
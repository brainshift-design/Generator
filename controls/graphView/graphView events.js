var autoScrollTimer  = null;
var dragScrollOffset = point(0, 0);


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
        if (graphView.soloMode)
            graphView.soloNode(null);

            
        // if (this.tempConn)
        // {
        //     try { this.div.setPointerCapture(e.pointerId); } catch {}
        // }
    });



    // this.div.addEventListener('pointerdown', e =>
    // {
    //     if (   e.button == 0)
    //         // && (   document.canResizeL
    //         //     || document.canResizeR
    //         //     || document.canResizeB))
    //     {
    //         e.stopPropagation();
    //         forwardEvent(e, document);
    //     }
    // }, 
    // true);



    this.div.addEventListener('pointerdown', e =>
    {
        this.pStart = point(e.clientX, e.clientY);

        const sx = e.clientX;
        const sy = e.clientY;


        hideAllMenus();
        hideSearchBox();


        if (   e.button == 0
            && !this.panning
            && !this.tempConn
            && !this.scrollbarX.moving
            && !this.scrollbarY.moving)
            // && !document.canResizeL
            // && !document.canResizeR
            // && !document.canResizeB)
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
                window.getSelection().removeAllRanges();
                
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

            if (isEmpty(currentMenus)) 
            {
                this.placePosition    = point(e.clientX, e.clientY);
                this.placeFromPointer = true;
                
                menuGraph.showAt(e.clientX, e.clientY, false, false);
            }
            else 
                hideAllMenus();
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
                else
                {
                    const wndRect = new Rect(
                        1,
                        getTopHeight() + 1,
                        this.measureData.clientRect.width  - 2,
                        this.measureData.clientRect.height - 5);

                    const selection = Rect.fromRect(this.selectionRect);


                    this.oldZoom = graph.currentPage.zoom;
                    this.endZoomSelection(e.pointerId, false);

                    if (!this.altDown) graph.currentPage.zoom *= 2;
                    else               graph.currentPage.zoom /= 2;
                    
                    
                    graph.currentPage.pan.x += wndRect.c - selection.c;
                    graph.currentPage.pan.y += wndRect.m - selection.m;


                    this.updateNodes();
                }
            }

            this.endPan(e.pointerId, false);


            if (this.panZoomTimer)
            {
                clearTimeout(this.panZoomTimer); 
                this.panZoomTimer = null;
            };


            this.p = null;
        }

        else if (e.button == 0
            && !this.selectionRect.isNaN)
            this.endSelection(e.pointerId);

        else if (e.button == 0
            && this.tempConn)
        {
            this.endConnection(e.pointerId, getCtrlKey(e), e.shiftKey);

            // if (this.div.hasPointerCapture(e.pointerId))
            //     this.div.releasePointerCapture(e.pointerId);
        }
        else if (e.button == 1
            && this.panning)
        {
            this.btn1down = false;
            this.endPan(e.pointerId, true);
        }


        if (autoScrollTimer)
        {
            clearTimeout(autoScrollTimer);
            autoScrollTimer = null;
        }
    });



    this.div.addEventListener('dblclick', e =>
    {
        if (    e.button == 0
            && !e.shiftKey
            &&  getCtrlKey(e))
            makeAllNodesInactive();
    });



    this.div.addEventListener('wheel', e =>
    {
        if (this.btn1down)
            return;


        // if button is not pressed wheel pans
        // if button is pressed, wheel does nothing if it's a touchpad

        e.preventDefault();

        
        hideTutorialsArrow();


        const dZoom = Math.log(graph.currentPage.zoom) / Math.log(2);


        const touchpad = isTouchpad(e);

        const dWheelX = e.deltaX / (touchpad ? 20 : 100);
        const dWheelY = e.deltaY / (touchpad ? 20 : 100);


        const dragging = graph.currentPage.nodes.find(n => n.div.dragging === true);


        if (   e.ctrlKey //getCtrlKey(e)
            ||     panMode
               && !touchpad)
        {
            // if (!dragging)
            // {
                let pos = point(
                    e.clientX, 
                    e.clientY - getTopHeight());

                const zoom = Math.max(0.0001, Math.pow(2, dZoom - dWheelY / (touchpad ? 4 : 10)));
                const pan  = subv(graph.currentPage.pan, mulvs(subv(pos, graph.currentPage.pan), zoom / graph.currentPage.zoom - 1));

                graph.currentPage.setPanAndZoom(pan, zoom);
            // }


            if (dragging)
            {
                dragging.header.dispatchEvent(new MouseEvent('pointermove', 
                {
                    bubbles:    true,
                    cancelable: true,
                    view:       window,
                    detail:     0,
                    screenX:    e.screenX,
                    screenY:    e.screenY,
                    clientX:    e.clientX,
                    clientY:    e.clientY,
                    ctrlKey:    e.ctrlKey,
                    altKey:     e.altKey,
                    shiftKey:   e.shiftKey,
                    metaKey:    e.metaKey,
                    button:     e.button,
                    buttons:    e.buttons
                }));
            }


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


            if (dragging)
            {
                dragging.sx -= dPanX;
                dragging.sy -= dPanY;
                
                dragging.header.dispatchEvent(new MouseEvent('pointermove', 
                {
                    bubbles:    true,
                    cancelable: true,
                    view:       window,
                    detail:     0,
                    screenX:    e.screenX,
                    screenY:    e.screenY,
                    clientX:    e.clientX,
                    clientY:    e.clientY,
                    ctrlKey:    e.ctrlKey,
                    altKey:     e.altKey,
                    shiftKey:   e.shiftKey,
                    metaKey:    e.metaKey,
                    button:     e.button,
                    buttons:    e.buttons
                }));
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
};



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
    340);
};



function graphView_onpointermove(e)
{
    graphView.p = point(e.clientX, e.clientY);


    if (   (   graphView.selecting
            || graphView.zoomSelecting
            || graphView.tempConn)
        && !dragCreatingNode
        && !graphView.selectionTimeout)
    {
        const dOffset = getScrollOffset(e.clientX, e.clientY);
        setAutoScrollTimer(dOffset, e);
    }


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



function getScrollOffset(px, py)
{
    const scrollBorder = 40;
    const scrollOffset = 30;

    const dOffset = point(0, 0);

    if (px > documentBodyClient.width  - scrollBorder) dOffset.x = -scrollOffset;
    if (px <                             scrollBorder) dOffset.x =  scrollOffset;
    if (py > documentBodyClient.height - scrollBorder) dOffset.y = -scrollOffset;
    if (py < getTopHeight()            + scrollBorder) dOffset.y =  scrollOffset;

    return dOffset;
}



function setAutoScrollTimer(dScroll, e, sizer = null)
{
    const px = graphView.p.x;
    const py = graphView.p.y;
 

    const dragging = graphView.selectedNodes.filter(n => n.div.dragging);

    dragging.forEach(n => 
    {
        n.sx += dScroll.x;
        n.sy += dScroll.y;
    });



    graph.currentPage.pan = point(
        graph.currentPage.pan.x + dScroll.x, 
        graph.currentPage.pan.y + dScroll.y);


    if (sizer)
    {       
        sizer.sx += dScroll.x, 
        sizer.sy += dScroll.y;
    }

        
    if (graphView.selecting)
    {
        graphView.selectionRect.x += dScroll.x;
        graphView.selectionRect.y += dScroll.y;

        setTimeout(() => graphView.updateSelectBox(e.shiftKey, getCtrlKey(e)));
    }
    else if (graphView.tempConn)
        graphView.tempConn.wire.update(px, py);
    
    //if (dragging.length > 0)
                
       
    if (autoScrollTimer)
    {
        clearTimeout(autoScrollTimer);
        autoScrollTimer = null;
    }

    if (   dScroll.x != 0
        || dScroll.y != 0)
        autoScrollTimer = setTimeout(() => setAutoScrollTimer(dScroll, e, sizer), 20);
}
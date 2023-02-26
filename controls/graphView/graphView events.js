graphView.addEventListener('pointerenter', e => 
{
    if (    graphView.hasPointerCapture(e.pointerId)
        && !graphView.tempConn)
        graphView.releasePointerCapture(e.pointerId);
});



graphView.addEventListener('pointerleave', e => 
{
    if (graphView.tempConn)
        graphView.setPointerCapture(e.pointerId);
});



graphView.addEventListener('pointerdown', e =>
{
    graphView.pStart = point(e.clientX, e.clientY);

    const sx = e.clientX;
    const sy = e.clientY;

    if (   e.button == 0
        && !graphView.panning
        && !graphView.tempConn
        && !document.canResizeL
        && !document.canResizeR
        && !document.canResizeB
        && !scrollbarX.moving
        && !scrollbarY.moving)
    {
        if (   graphView.spaceDown
            || panMode)
        {
            if (getCtrlKey(e)) graphView.startZoomSelection(e.pointerId, e.clientX, e.clientY);
            else               graphView.startPan(e.pointerId);
        }
        else if (graphView.overOutput)
        {
            graphView.overOutput.connecting = true;
            graphView.startConnectionFromOutput(e.pointerId, graphView.overOutput, true, getCtrlKey(e));

            updateWire(graphView.tempConn.wire, sx, sy);
        }
        else if (graphView.overInput)
        {
            if (graphView.overInput.connectedOutput) // begin to disconnect
            {
                oldReorderIndex = graphView.overInput.index;

                graphView.startConnectionFromOutput(e.pointerId, graphView.overInput.connectedOutput, false, getCtrlKey(e));

                updateWire(graphView.tempConn.wire, sx, sy);

                graphView.savedConn = graphView.overInput.connection;

                hideElement(graphView.savedConn.wire);
            }
            else
            {
                graphView.overInput.connecting = true;
                graphView.startConnectionFromInput(e.pointerId, graphView.overInput, getCtrlKey(e));

                updateWire(graphView.tempConn.wire, sx, sy);
            }
        }
        else if (document.activeElement.type != 'text') // selection, unless a textbox is in focus
        {
            graphView.lastSelectedNodes = [...graphView.selectedNodes];

            graphView.startSelection(
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
        
        graphView.btn1down = true;
        setCursor(panCursor);
        graphView.startPan(e.pointerId);
    }

    else if (e.button == 2)
    {
        e.stopPropagation();

        if (isEmpty(currentMenus)) menuGraph.showAt(e.clientX, e.clientY, false);
        else                       hideAllMenus();
    }
});



graphView.addEventListener('pointermove', graphView_onpointermove);



function graphView_onpointermove(e)
{
    graphView.p = point(e.clientX, e.clientY);


    if (   (   graphView.panning
            || panMode)
        && graphView.hasPointerCapture(e.pointerId))
    {
        setCursor(panCursor);

        const dp = subv(graphView.p, graphView.pStart);

        graphView.setPanAndZoom(
            addv(graphView.panStart, dp), 
            graphView.zoom);
    }

    else if (graphView.selecting)
        graphView.updateSelection(e.clientX, e.clientY, e.shiftKey, getCtrlKey(e));

    else if (graphView.zoomSelecting)
        graphView.updateZoomSelection(e.clientX, e.clientY);

    else if (graphView.tempConn)
        updateWire(graphView.tempConn.wire, e.clientX, e.clientY);
}



graphView.addEventListener('pointerup', e => 
{
    if (   e.button == 0
        && (   graphView.spaceDown
            || panMode))
    {
        if (getCtrlKey(e))
        {
            if (    graphView.selectionRect.w > 0
                &&  graphView.selectionRect.h > 0
                && !graphView.altDown)
            {
                graphView.oldZoom = graphView.zoom;
                graphView.endZoomSelection(e.pointerId, true);
            }
            else if (graphView.altDown)
            {
                const wndRect = new Rect(
                    1,
                    menuBarHeight + 1,
                    graphViewClient.width  - 2,
                    graphViewClient.height - 5);

                const selection = Rect.fromTypical(graphView.selectionRect);


                graphView.oldZoom = graphView.zoom;
                graphView.endZoomSelection(e.pointerId, false);

                graphView.zoom /= 2;
                
                
                graphView.pan.x += wndRect.c - selection.c;
                graphView.pan.y += wndRect.m - selection.m;


                graphView.update();
            }
            else
               graphView.endZoomSelection(e.pointerId, false);
        }

        graphView.endPan(e.pointerId, false);


        if (graphView.panZoomTimer)
        {
            clearTimeout(graphView.panZoomTimer); 
            graphView.panZoomTimer = null;
        };
    }

    else if (e.button == 0
         && !graphView.selectionRect.isNaN)
        graphView.endSelection(e.pointerId);

    else if (e.button == 0
          && graphView.tempConn)
        graphView.endConnection(e.pointerId, getCtrlKey(e));

    else if (e.button == 1
          && graphView.panning)
    {
        graphView.btn1down = false;
        graphView.endPan(e.pointerId, true);
    }
});



graphView.addEventListener('wheel', e =>
{
    if (graphView.btn1down)
        return;


    // if button is not pressed wheel pans
    // if button is pressed, wheel does nothing if it's a touchpad

    e.preventDefault();


    const dZoom = Math.log(graphView.zoom) / Math.log(2);


    const touchpad = isTouchpad(e);

    const dWheelX = e.deltaX / (touchpad ? 20 : 100);
    const dWheelY = e.deltaY / (touchpad ? 20 : 100);


    if (   e.ctrlKey //getCtrlKey(e)
        ||     panMode
           && !touchpad)
    {
        let pos = point(
            e.clientX, 
            e.clientY - menuBarHeight);

        const zoom = Math.max(0.0001, Math.pow(2, dZoom - dWheelY / (touchpad ? 4 : 10)));
        const pan  = subv(graphView.pan, mulvs(subv(pos, graphView.pan), zoom / graphView.zoom - 1));

        graphView.setPanAndZoom(pan, zoom);

        graphView.updateWheelTimer();
    }
    else
    {
        const dPanX = (e.shiftKey ? dWheelY : dWheelX) * 20 / Math.pow(graphView.zoom, 0.1);
        const dPanY = (e.shiftKey ? dWheelX : dWheelY) * 20 / Math.pow(graphView.zoom, 0.1);

        graphView.pan = point(
            graphView.pan.x - dPanX,
            graphView.pan.y - dPanY);

        
        if (graphView.selecting)
        {
            graphView.selectionRect.x -= dPanX;
            graphView.selectionRect.w += dPanX;

            graphView.selectionRect.y -= dPanY;
            graphView.selectionRect.h += dPanY;

            graphView.updateSelection(
                e.clientX,
                e.clientY,
                e.shiftKey);
        } 


        graphView.updateWheelTimer();
    }


    if (graphView.tempConn)
        graphView_onpointermove(e);
});



graphView.updateWheelTimer = function()
{
    if (graphView.wheelTimer) 
        clearTimeout(graphView.wheelTimer);

    graphView.wheelTimer = setTimeout(() => 
    {
        graphView.wheelTimer = null;

        if (overNumberControl)
            overNumberControl.updateCursor();

        setAutoCursor();
    }, 
    450);
};



graphView.addEventListener('gesturestart', e => { graphView.zoomStart = graphView.zoom; });



graphView.addEventListener('gesturechange', e => 
{
    const p = point(
        graphView.p.x,
        graphView.p.y - menuBarHeight);

    const zoom = graphView.zoomStart * e.scale;
    const pan  = subv(graphView.pan, mulvs(subv(p, graphView.pan), zoom / graphView.zoom - 1));

    graphView.setPanAndZoom(pan, zoom);
});



graphView.addEventListener('touchstart', e =>
{
    graphView.touches.push(e);
    e.preventDefault();
});



graphView.addEventListener('touchmove', e =>
{
    for (let i = 0; i < graphView.touches.length; i++)
        if (graphView.touches[i].pointerId == e.pointerId)
        {
            graphView.touches[i] = e;
            break;
        }

    e.preventDefault();
});



graphView.addEventListener('touchend', e =>
{
    for (let i = 0; i < graphView.touches.length; i++)
        if (graphView.touches[i].pointerId == e.pointerId)
        {
            graphView.touches.splice(i, 1);
            break;
        }

    e.preventDefault();
});



graphView.addEventListener('touchcancel', e =>
{
    for (let i = 0; i < graphView.touches.length; i++)
        if (graphView.touches[i].pointerId == e.pointerId)
        {
            graphView.touches.splice(i, 1);
            break;
        }

    e.preventDefault();
});
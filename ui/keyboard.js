document.addEventListener('keydown', e =>
{
    let setLastKeyDown = true;


    // copy
    if (   e.code == 'KeyC'
        && getCtrlKey(e))
    {
        pasteOffset     = [0, 0];
        copiedNodesJson = uiCopyNodes(graphView.selectedNodes.map(n => n.id));
    }

    // paste
    else if (e.code == 'KeyV'
          && getCtrlKey(e))
    {
        actionManager.do(new PasteNodesAction(copiedNodesJson, e.shiftKey));
    }

    // duplicate
    else if (e.code == 'KeyD'
          && getCtrlKey(e))
    {
        pasteOffset = [0, 0];
        actionManager.do(new PasteNodesAction(uiCopyNodes(graphView.selectedNodes.map(n => n.id)), e.shiftKey));
        return false;
    }

    // select all
    else if (e.code == 'KeyA'
          && getCtrlKey(e))
    {
        graphView.selectedNodes = graph.nodes;
    }

    // undo/redo
    else if (e.code == 'KeyZ'
          && getCtrlKey(e))
    {
        if (e.shiftKey) actionManager.redo();
        else            actionManager.undo();

        setLastKeyDown = false;
    }

    // delete / backspace
    else if (   e.key == 'Delete'
             || e.key == 'Backspace')
    {
        const nodeIds = graphView.selectedNodes.map(n => n.id);
        actionManager.do(new DeleteNodesAction(nodeIds, nodeIds));
        graphView._selected = [];
    }

    // escape
    else if (e.key == 'Escape')
    {
        if (graphView.tempConn)
        {
            if (graphView.savedConn)
            {
                const savedConn = graphView.savedConn;

                setTimeout(() => 
                {
                    graphView.updateNodeWire(savedConn.wire);
                    savedConn.input.updateControl();
                });
            }

            graphView.cancelConnection(graphView.connPointerId);
        }
    }

    //
    else if (e.code == 'Minus')
    {
        graphView.zoom /= 2;
    }

    else if (e.code == 'Equal')
    {
        graphView.zoom *= 2;
    }

    else if (e.code == 'Digit0'
          && getCtrlKey(e))
    {
        graphView.zoom = 1;
        uiNotify('Zoom to 100%');
    }

    else if (e.code == 'Space'
         && !getCtrlKey(e))
    {
        if (   !graphView.selecting
            && !graphView.spaceDown)
        {
            graphView.spaceDown = true;
            setCursor(panCursor);
        }
    }

    else if (e.key == 'Shift')
    {
        if (graphView._soloNode)
            graphView.unsoloNode();
    }

    else if (e.key == 'Control')
    {
        if (graphView._soloNode)
            graphView.unsoloNode();

        if (graphView.spaceDown)
        {
            graphView.zoomSelecting = true;

            if (e.altKey) setCursor(zoomOutCursor);
            else          setCursor(zoomInCursor);
        }
    }

    else if (    e.key == 'Alt'
             && !e.shiftKey
             && !getCtrlKey(e))
    {
        if (   graphView.spaceDown
            && getCtrlKey(e))
            setCursor(zoomOutCursor);
        else if (graphView.overNode)
            graphView.soloNode(graphView.overNode);
    }

    else if (e.code == 'Tab')
        e.preventDefault();
});



document.addEventListener('keyup', e =>
{
    if (e.code == 'Space')
    {
        if (graphView.spaceDown)
        {
            graphView.spaceDown     = false;
            graphView.zoomSelecting = false;
            setAutoCursor();
        }
    }

    else if (e.key == 'Alt')
    {
        if (graphView.spaceDown)
        {
            if (getCtrlKey(e)) 
                setCursor(zoomInCursor);
            else
            {
                setCursor(panCursor);
                graphView.zoomSelecting = false;
            }
        }
        else if (graphView._soloNode)
            graphView.unsoloNode();
    }

    else if (e.key == 'Control'
          && graphView.spaceDown)
    {
        graphView.zoomSelecting = false;
        setCursor(panCursor);
    }
},false);
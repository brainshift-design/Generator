document.addEventListener('keydown', e =>
{
    // copy
    if (   e.code == 'KeyC'
        && getCtrlKey(e))
    {
        uiCopyNodes(graphView.selected.map(n => n.id));
    }

    // delete
    else if (e.key == 'Delete')
    {
        actionManager.do(new DeleteNodesAction(graphView.selected.map(n => n.id)));
        graphView._selected = [];
    }

    // select all
    else if (e.code == 'KeyA'
          && getCtrlKey(e))
    {
        graphView.selected = graph.nodes;
    }

    // undo/redo
    else if (e.code == 'KeyZ'
          && getCtrlKey(e))
    {
        if (e.shiftKey) actionManager.redo();
        else            actionManager.undo();
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
          && e.shiftKey)
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

    else if (e.key == 'Control'
          && graphView.spaceDown)
    {
        graphView.zoomSelecting = true;

        if (e.altKey) setCursor(zoomOutCursor);
        else          setCursor(zoomInCursor);
    }

    else if (e.key == 'Alt'
          && graphView.spaceDown
          && getCtrlKey(e))
    {
        setCursor(zoomOutCursor);
    }
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

    else if (e.key == 'Alt'
          && graphView.spaceDown)
    {
        if (getCtrlKey(e)) 
            setCursor(zoomInCursor);
        else
        {
            setCursor(panCursor);
            graphView.zoomSelecting = false;
        }
    }

    else if (e.key == 'Control'
          && graphView.spaceDown)
    {
        graphView.zoomSelecting = false;
        setCursor(panCursor);
    }
});




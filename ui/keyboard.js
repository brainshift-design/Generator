document.addEventListener('keydown', e =>
{
    // delete
    if (e.key == 'Delete')
    {
        actionManager.do(new DeleteNodesAction(graphView.selected));
        graphView._selected = [];
    }

    // select all
    else if (e.code == 'KeyA'
          && getCtrlKey(e))
    {
        graphView.selected = uiGraph.nodes;
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
            console.log(e.code);
            graphView.spaceDown = true;
            graphView.setPanCursor();
        }
    }

    else if (e.key == 'Control'
          && graphView.spaceDown)
    {
        graphView.zoomSelecting = true;

        if (e.altKey) graphView.setZoomOutCursor();
        else          graphView.setZoomInCursor();
    }

    else if (e.key == 'Alt'
          && graphView.spaceDown
          && getCtrlKey(e))
    {
        graphView.setZoomOutCursor();
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
            graphView.setAutoCursor();
        }
    }

    else if (e.key == 'Alt'
          && graphView.spaceDown)
    {
        if (getCtrlKey(e)) 
            graphView.setZoomInCursor();
        else
        {
            graphView.setPanCursor();
            graphView.zoomSelecting = false;
        }
    }

    else if (e.key == 'Control'
          && graphView.spaceDown)
    {
        graphView.zoomSelecting = false;
        graphView.setPanCursor();
    }
});




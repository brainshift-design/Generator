var altPressedInMenu = false;



document.addEventListener('keydown', e =>
{
    let setLastKeyDown = true;


    // copy
    if (   e.code == 'KeyC'
        && getCtrlKey(e))
        copySelectedNodes();
        
    // paste
    else if (e.code == 'KeyV'
          && getCtrlKey(e)
          && !e.altKey)
    {
        e.preventDefault();
        pasteCopiedNodes(e.shiftKey);
    }

    // duplicate
    else if (e.code == 'KeyD'
          && getCtrlKey(e)
          && !e.altKey)
    {
        if (e.shiftKey)
            e.preventDefault();
            
        duplicateSelectedNodes(e.shiftKey);
        return false;
    }

    // disable nodes
    else if (e.code == 'KeyE'
          && getCtrlKey(e)
          && e.shiftKey)
    {
        e.preventDefault();
        actionManager.do(new ToggleDisableNodesAction(graphView.selectedNodes.map(n => n.id)));
        return false;
    }

    // select all
    else if (e.code == 'KeyA'
          && getCtrlKey(e))
        selectAllNodes(e.shiftKey);

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
        if (e.shiftKey) removeSelectedNodes();
        else            deleteSelectedNodes();
    }

    // select all
    else if (e.code == 'KeyL'
          && getCtrlKey(e))
        layoutSelectedNodes();


    // rename
    else if (e.code == 'KeyR'
          && getCtrlKey(e))
        renameSelectedNode();


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
                    updateWire(savedConn.wire);
                    savedConn.input.updateControl();
                });
            }

            graphView.cancelConnection(graphView.connPointerId);
        }
    }

    //
    else if (e.code == 'Minus'
          || e.code == 'NumpadSubtract')
    {
        graphView.zoom /= Math.pow(2, 1/2);
    }

    else if (e.code == 'Equal'
          || e.code == 'NumpadAdd')
    {
        graphView.zoom *= Math.pow(2, 1/2);
    }

    else if ((   e.code == 'Digit0'
              || e.code == 'Numpad0')
          && getCtrlKey(e))
    {
        graphView.zoom = 1;
        uiNotify('Zoom to 100%');
    }

    else if ((   e.code == 'Digit1'   // will not insist on shift working here
              || e.code == 'Numpad1') // by using e.getModifierState('NumLock')
          && e.shiftKey)              // because Figma doesn't
    {
        graphView.zoomToFit();
        uiNotify('Zoom to fit');
    }

    else if (e.code == 'Space'
         && !getCtrlKey(e))
    {
        if (   !graphView.selecting
            && !graphView.spaceDown
            && !panMode)
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

        else if ( graphView.overNode
              &&  isEmpty(currentMenus)
              && !altPressedInMenu)
            graphView.soloNode(graphView.overNode);

        else if (currentMenus.length == 1
              && currentMenus[0] == menuColor)
        {
              menuItemColor.setIcon(iconRandomColor);
              altPressedInMenu = true;
        }
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
        else if (graphView._soloNode
              && isEmpty(currentMenus))
            graphView.unsoloNode();

        else if (currentMenus.length == 1
            && currentMenus[0] == menuColor)
            menuItemColor.setIcon(iconColor);


        altPressedInMenu = false;
      }

    else if (e.key == 'Control'
          && graphView.spaceDown)
    {
        graphView.zoomSelecting = false;
        setCursor(panCursor);
    }
},
false);
var altPressedInMenu = false;



document.addEventListener('keydown', e =>
{
    if (crashed)
    {
        e.preventDefault();
        e.stopPropagation();
        return;
    }


    let setLastKeyDown = true;


    // copy
    if (   e.code == 'KeyC'
        && getCtrlKey(e))
        graphView.copySelectedNodes();
        
    // paste
    else if (e.code == 'KeyV'
          && getCtrlKey(e)
          && !e.altKey)
    {
        e.preventDefault();
        graphView.pasteCopiedNodes(e.shiftKey);
    }

    // duplicate
    else if (e.code == 'KeyD'
          && getCtrlKey(e)
          && !e.altKey)
    {
        if (e.shiftKey)
            e.preventDefault();
            
        graphView.duplicateSelectedNodes(e.shiftKey);
        return false;
    }

    // disable nodes
    else if (e.code == 'KeyE'
          && getCtrlKey(e)
          && e.shiftKey)
    {
        e.preventDefault();
        actionManager.do(new ToggleDisableNodesAction(graphView.graph, graphView.selectedNodes.map(n => n.id)));
        return false;
    }

    // select all
    else if (e.code == 'KeyA'
          && getCtrlKey(e))
        graphView.selectAllNodes(e.shiftKey);

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
        if (e.shiftKey) graphView.removeSelectedNodes();
        else            graphView.deleteSelectedNodes();
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
        if (!isEmpty(currentMenus))
            hideAllMenus();


        else if (graphView.tempConn)
        {
            if (graphView.savedConn)
            {
                const savedConn = graphView.savedConn;

                setTimeout(() => 
                {
                    savedConn.wire.update();
                    savedConn.input.updateControl();
                });
            }

            graphView.cancelConnection(graphView.connPointerId);
        }


        else if (isVisible(whatsNewDialog  )) hideWhatsNewDialog();
        else if (isVisible(minZoomDialog   )) hideMinZoomDialog();
        else if (isVisible(productKeyDialog)) hideProductKeyDialog();
        else if (isVisible(aboutDialog     )) hideAboutDialog();
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
            graphView.altDown = e.altKey;

            if (e.altKey) setCursor(zoomOutCursor);
            else          setCursor(zoomInCursor);
        }

        else if (graphView.tempConn)
        {
            graphView.tempConn.backInit = true;

            const tc = graphView.tempConn;

            updateWire(
                tc.wire, 
                tc.wire.clientX,
                tc.wire.clientY);
        }

        else if (overNumberControl
              && overNumberControl.param)
        {
            if (overNumberControlCtrl)
            {
                overNumberControlCtrl.param.showFullPrecision = false;
                overNumberControlCtrl.update();
            }

            overNumberControlCtrl = overNumberControl;

            overNumberControlCtrl.param.showFullPrecision = true;
            overNumberControlCtrl.update();
        }
    }

    else if (    e.key == 'Alt'
             && !e.shiftKey
             && !getCtrlKey(e))
    {
        if ( graphView.overNode
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
    else if (    e.key == 'Alt'
             && !e.shiftKey
             &&  graphView.spaceDown
             &&  getCtrlKey(e))
    {
        setCursor(zoomOutCursor);
        graphView.altDown = true;
    }

    else if (e.code == 'Tab')
        e.preventDefault();
});



document.addEventListener('keyup', e =>
{
    graphView.altDown = false;


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
    else if (e.key == 'Control')
    {
        if (graphView.spaceDown)
        {
            graphView.zoomSelecting = false;
            setCursor(panCursor);
        }
        else if (graphView.tempConn)
        {
            graphView.tempConn.backInit = false;

            const tc = graphView.tempConn;

            tc.wire.update( 
                tc.wire.clientX,
                tc.wire.clientY);
        }
        else if (overNumberControlCtrl)
        {
            overNumberControlCtrl.param.showFullPrecision = false;
            overNumberControlCtrl.update();
            overNumberControlCtrl.updateCursor();

            overNumberControlCtrl = null;
        }
    }
},
false);
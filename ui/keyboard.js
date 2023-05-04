var altPressedInMenu = false;



document.addEventListener('keydown', e =>
{
    if (   crashed
        || graphView.loadingNodes
        || graphView.pastingNodes
        || graphView.restoringNodes)
    {
        e.preventDefault();
        e.stopPropagation();
        return;
    }


    let setLastKeyDown = true;


    // save to file
    if (   e.code == 'KeyS'
        && getCtrlKey(e)
        && e.shiftKey)
    {
        e.preventDefault();
        uiSaveSelectionToLocalFile();
    }

    // cut
    else if (e.code == 'KeyX'
          && getCtrlKey(e))
    {
        graphView.copySelectedNodes();
        graphView.deleteSelectedNodes(true);
    }    

    // copy
    else if (e.code == 'KeyC'
          && getCtrlKey(e))
    {
        e.preventDefault();

        if (e.shiftKey) graphView.copySelectedNodesAsJavascript();
        else            graphView.copySelectedNodes();
    }    

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

        if (!graphView.selectedNodes.find(n => !n.canDisable))
            actionManager.do(new ToggleDisableNodesAction(graphView.selectedNodes.map(n => n.id)));
            
        return false;
    }

    // select all
    else if (e.code == 'KeyA'
          && getCtrlKey(e))
        graphView.selectAllNodes(e.shiftKey);

    // group selected
    else if (e.code == 'KeyG'
          && getCtrlKey(e))
    {
        if (!isEmpty(graphView.selectedNodes))
            actionManager.do(new GroupNodesAction(graphView.selectedNodes));
    }

    // undo/redo
    else if (e.code == 'KeyZ'
          && getCtrlKey(e)
          && !document.button0
          && isEmpty(currentMenus))
    {
             if (e.shiftKey && !actionManager.redoing) actionManager.redo();
        else if (              !actionManager.undoing) actionManager.undo();

        setLastKeyDown = false;
    }

    // delete / backspace
    else if (   e.key == 'Delete'
             || e.key == 'Backspace')
    {
        if (getCtrlKey(e)) graphView.removeSelectedNodes();
        else               graphView.deleteSelectedNodes();
    }

    // // select all
    // else if (e.code == 'KeyL'
    //       && getCtrlKey(e))
    //     layoutSelectedNodes();

    // toggled operation results
    else if (e.code == 'KeyR'
          && getCtrlKey(e)
          && e.shiftKey)
    {
        updateSettingAndMenu('showOperationResults',  true, !settings.showOperationResults);  
        updateMenuItemShowOperationResults();          
    }

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


        else if (isVisible(whatsNewDialog         )) hideWhatsNewDialog();
        else if (isVisible(minZoomDialog          )) hideMinZoomDialog();
        else if (isVisible(productKeyDialog       )) hideProductKeyDialog();
        else if (isVisible(aboutDialog            )) hideAboutDialog();
        else if (isVisible(deleteConnectionsDialog)) hideDeleteConnectionsDialog();

        else if (!isEmpty(graphView.selectedNodes))
            graphView.deselectAllNodes(e.shiftKey);
    }

    //
    else if (e.code == 'Minus'
          || e.code == 'NumpadSubtract')
    {
        graph.currentPage.zoom /= Math.pow(2, 1/2);
    }

    else if (e.code == 'Equal'
          || e.code == 'NumpadAdd')
    {
        graph.currentPage.zoom *= Math.pow(2, 1/2);
    }

    else if ((   e.code == 'Digit0'
              || e.code == 'Numpad0')
          && getCtrlKey(e))
    {
        graph.currentPage.zoom = 1;
        uiNotify('Zoom to 100%');
    }

    else if (e.code == 'Digit1'
          && e.shiftKey)
    {
        graphView.zoomToFit();
        uiNotify('Zoom to fit');
    }

    else if (e.code == 'Digit2'
          && e.shiftKey)         
    {
        graphView.zoomToSelection();

        if (!isEmpty(graphView.selectedNodes))
            uiNotify('Zoom to selection');
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
        
        if (    numberControlChanging
            && !numberControlChanging.shiftDown)
        {
            numberControlChanging.shiftDown = true;
            numberControlChanging.update();
        }
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

            tc.wire.update(
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

    // else if (e.code == 'KeyN' && !getCtrlKey(e) && !e.shiftKey && !e.altKey) actionManager.do(getCreateNodeAction(NUMBER,      null, getCreateOptions(e)));
    // else if (e.code == 'KeyT' && !getCtrlKey(e) && !e.shiftKey && !e.altKey) actionManager.do(getCreateNodeAction(TEXT,        null, getCreateOptions(e)));
    // else if (e.code == 'KeyC' && !getCtrlKey(e) && !e.shiftKey && !e.altKey) actionManager.do(getCreateNodeAction(COLOR,       null, getCreateOptions(e, {random: e.altKey && !getCtrlKey(e)})));
    // else if (e.code == 'KeyG' && !getCtrlKey(e) && !e.shiftKey && !e.altKey) actionManager.do(getCreateNodeAction(GROUP_NODE,  null, getCreateOptions(e)));
    // else if (e.code == 'KeyP' && !getCtrlKey(e) && !e.shiftKey && !e.altKey) actionManager.do(getCreateNodeAction(GROUP_PARAM, null, getCreateOptions(e)));

    // graph.nodes.at(-1).div.style.left = e.clientX - (defNodeWidth    / 2) - (               + graph.currentPage.pan.x) / graph.currentPage.zoom;
    // graph.nodes.at(-1).div.style.top  = e.clientY - (defHeaderHeight / 2) - (getTopHeight() + graph.currentPage.pan.y) / graph.currentPage.zoom;
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

    else if (e.key == 'Shift')
    {
        if (numberControlChanging)
        {
            numberControlChanging.shiftDown = null;
            numberControlChanging.update();
        }
    }
},
false);
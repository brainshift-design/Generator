var  newReorderIndex = Number.NaN;
var prevReorderIndex = Number.NaN;
var  oldReorderIndex = Number.NaN;



function createOperatorNode(node)
{
    node.div                    = createDiv('node');
    node.div.node               = node;
       
    node.div.style.width        = node.defaultWidth + 'px';
           
    node.div.selectedSet        = false;
    node.div.over               = false;
    node.div.dragging           = false;
    node.div.shiftOnPointerDown = false;
    node.div.moved              = false;
    
    node.enterTimer             = null;

    node.inner = createDiv('nodeInner');
    node.div.appendChild(node.inner);


    node.div.addEventListener('pointerenter', e =>
    {
        node.div.over      = true;
        graphView.overNode = node;
        
        if (    e.altKey
            && !getCtrlKey(e)
            && !e.shiftKey
            &&  graphView._soloNode != node
            && !altPressedInMenu) 
            graphView.soloNode(node);
        
        node.updateNode();
    });

    
    node.div.addEventListener('pointerleave', e =>
    {
        node.div.over      = false;
        graphView.overNode = null;
        
        if (   (  !e.altKey
                || getCtrlKey(e)
                || e.shiftKey)
            && graphView._soloNode == node)
            graphView.unsoloNode();

        node.updateNode();
    });

    
    node.paramBack = createDiv('nodeParamBack');
    //node.inner.appendChild(node.paramBack);
    
    
    //node.separator = createDiv('paramSeparator');
    //node.inner.appendChild(node.separator);
    
    // node.separator.addEventListener('click', () =>
    // {
    //     if (node.showAllParams)
    //     {
    //         node.showAllParams = !node.showAllParams;
    //         // TODO: save nodecd  here?
    //     }
    // });



    node.hiddenParamBack = createDiv('nodeHiddenParamBack');
    //node.inner.appendChild(node.hiddenParamBack);
    

    // node.div.addEventListener('pointermove', e =>
    // {
    //     const rect = boundingRect(node.div);
    
    //     let y = 
    //         + (e.clientY - rect.y) / graphView.zoom 
    //         - node.header.offsetHeight;

    //     const paramHeight = 20;

    //     y = Math.floor(y / paramHeight) * paramHeight;

    //     log(y);
        
    //     node.dragParam.style.top = node.header.offsetHeight + y + paramHeight/2 - 5.5;
    // });


    createNodeHeader(node);

    createNodeInfo(node);
}     



function createNodeHeader(node)
{
    node.header = createDiv('nodeHeader');
    
    node.header.connectionPadding = 8;
    node.header.ignoreDoubleClick = false; // used by child objects that need to be double clicked


    createNodeLabel(node);

    
    node. inputControls = createDiv('inputControls');
    node.outputControls = createDiv('outputControls');

    node.header.appendChild(node. inputControls);
    node.header.appendChild(node.outputControls);

    node.inner.appendChild(node.header);



    node.header.addEventListener('pointerdown', e =>
    {
        e.preventDefault();


        if (graphView.spaceDown)    
            return;


        graphView.lastSelectedNodes = [...graphView.selectedNodes];
        
        graphView.putNodeOnTop(node);


        for (const param of node.params)
        {
            if (param.textboxHasFocus())
                param.control.textbox.finish(true);
        }


        if (e.button == 0)
            hideAllMenus();


        if (   e.button == 0
            || e.button == 2)
        {
            node.div.shiftOnPointerDown = 
                   e.shiftKey
                && !getCtrlKey(e)
                && !e.altKey;
        }


        if (    e.button == 0
            && !graphView.overOutput
            && !graphView.overInput)
        {
            e.stopPropagation();

            selectFromClick(node, getCtrlKey(e), e.shiftKey, e.altKey);

                        
            node.div.sx = e.clientX;
            node.div.sy = e.clientY;

            for (const n of graphView.selectedNodes)
            {
                n.div.slx = n.div.offsetLeft;
                n.div.sly = n.div.offsetTop;
            }

            node.div.dragging = true;
            node.header.setPointerCapture(e.pointerId);
        }

        else if (e.button == 2)
        {
            e.stopPropagation();

            selectFromClick(node, getCtrlKey(e), e.shiftKey, e.altKey);

            menuNode.showAt(e.clientX, e.clientY);
        }

        
        updateGraphNodes();
    });



    node.header.addEventListener('pointermove', e =>
    {
        //console.log(node.id + '.header.pointermove');

        const toTheRightOfInputs = e.clientX - boundingRect(node.header).x > 12 * graphView.zoom;

        const tempConn  = graphView. tempConn;
        let   savedConn = graphView.savedConn;


        if (node.div.dragging)
        {
            const x       = graphView.clientLeft;
            const w       = graphView.clientWidth;
            const h       = graphView.clientHeight;
            const bounds  = graphView.getAllNodeBounds();
            const yOffset = menuBar.offsetHeight;
        
            setNodePositions(
                graphView.selectedNodes,
                (e.clientX - node.div.sx) / graphView.zoom,

                (e.clientY - node.div.sy) / graphView.zoom);
            
            node.div.moved = true;

            graphView.updateScroll(x, w, h, bounds, yOffset);
        }
        else if (   tempConn
                 && toTheRightOfInputs)
        {
            if (    tempConn.output
                && !tempConn.output.node.isOrFollows(node))
            {
                if (   node.variableInputs
                    && savedConn)
                {
                    const rect    = boundingRect(node.div);
                    const padding = node.header.connectionPadding;

                    const index = Math.min(Math.max(0, Math.round(
                          ((e.clientY - rect.y) / graphView.zoom - padding - (connectionSize + connectionGap)/2) 
                        / (connectionSize + connectionGap))),
                        node.headerInputs.length-2);
                    
                    if (index != prevReorderIndex)
                    {
                        newReorderIndex = index;

                        moveInArray(
                            node.inputs, 
                            node.inputs.indexOf(savedConn.input),
                            newReorderIndex);

                        node.updateNode();
                         
                        prevReorderIndex = newReorderIndex;
                    }

                    graphView.overInput   = savedConn.input;
                    graphView.headerInput = savedConn.input;

                    graphView.overInput.updateControl();

                    
                    const inputRect = boundingRect(savedConn.input.div);

                    tempConn.wire.inputPos = point(
                        inputRect.x + inputRect.w/2,
                        inputRect.y + inputRect.h/2 - menuBar.offsetHeight);
                }
                else
                {
                    const input = node.getAutoInput(tempConn.output);
                    if (!input) return;

                    graphView.overInput   = input;
                    graphView.headerInput = input;
                        
                    input.mouseOver = true;
                    input.updateControl();

                    const inputRect = boundingRect(input.div);
                    
                    tempConn.wire.inputPos = point(
                        inputRect.x + inputRect.w/2,
                        inputRect.y + inputRect.h/2 - menuBar.offsetHeight);

                    // if (!graphView.tempConnected)
                    // {
                    //     node.enterTimer = setTimeout(() =>
                    //     {
                    //         actionManager.do(new ConnectAction(tempConn.output, input));
                            
                    //         graphView.savedConn = input.connection;
                    //         graphView.removeConnWires(graphView.tempConn);    

                    //         node.enterTimer = null;
                    //     },
                    //     400);

                    //     graphView.tempConnected = true;
                    // }
                }
            }
            else if (tempConn.input
                  && !node.isOrFollows(tempConn.input.node))
            {
                const output = node.getAutoOutput(tempConn.input.types);
                if (!output) return;

                graphView.overOutput   = output;
                graphView.headerOutput = output;
                    
                output.mouseOver = true;
                output.updateControl();


                const rect = boundingRect(output.div);

                tempConn.wire.outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - menuBar.offsetHeight);


                tempConn.input.updateControl();
            }
        }
    });



    node.header.addEventListener('pointerup', e =>
    {
        if (   e.button == 0
            && node.div.dragging)
        {
            if (node.div.moved)
            {
                actionManager.do(new SelectMoveNodesAction(
                    graphView.lastSelectedNodes.map(n => n.id), 
                    graphView.selectedNodes.map(n => n.id), 
                    point(node.div.slx,        node.div.sly      ),
                    point(node.div.offsetLeft, node.div.offsetTop),
                    node.div.shiftOnPointerDown ));
            }
            else if (   !isEmpty(graphView.selectedNodes)
                     && !node.selected)
            {
                actionManager.do(new SelectNodesAction(
                    graphView.selectedNodes    .map(n => n.id), 
                    graphView.lastSelectedNodes.map(n => n.id)));
            }


            node.div.dragging = false;
            node.header.releasePointerCapture(e.pointerId);
        }
        else if (graphView.tempConn)
        {
            if (    graphView.tempConn.output
                && !graphView.tempConn.output.node.isOrFollows(node)
                &&  graphView.overInput)
            {
                graphView          .endConnection(e.pointerId);
                graphView.overInput.endConnection();
            }
            else if ( graphView.tempConn.input
                  && !node.isOrFollows(graphView.tempConn.input.node)
                  &&  graphView.overOutput)
            {
                graphView           .endConnection(e.pointerId);
                graphView.overOutput.endConnection();
            }
        }


        node.div.shiftOnPointerDown = false;
    });
    
    

    node.header.addEventListener('pointerleave', e => 
    { 
        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.node != node)
            {
                const input = graphView.headerInput;
                
                graphView.overInput   = null;
                graphView.headerInput = null;
                
                if (input) // will be null if data types don't match or there's no auto input for someo other reason
                {
                    input.mouseOver = false;
                    input.updateControl();
                }
                
                graphView.tempConn.wire.inputPos = point_NaN;
            }
            else if (graphView.tempConn.input
                  && graphView.tempConn.input.node != node)
            {
                const output = graphView.headerOutput;
                
                graphView.overOutput   = null;
                graphView.headerOutput = null;

                if (output) // will be null if data types don't match or there's no auto output for someo other reason
                {
                    output.mouseOver = false;
                    output.updateControl();
                }

                graphView.tempConn.wire.outputPos = point_NaN;
                
                graphView.tempConn.input.updateControl();
           }
        }
    });



    node.header.addEventListener('dblclick', e =>
    {
        e.preventDefault();

        
        var bounds = boundingRect(node.label);

        // if (   e.clientX >= bounds.left && e.clientX < bounds.right
        //     && e.clientY >= bounds.top  && e.clientY < bounds.bottom)
        //     node.showLabelTextbox();
        // else 
        if (!node.header.ignoreDoubleClick)
            actionManager.do(new MakeActiveNodeAction(node.id));


        node.header.ignoreDoubleClick = false;
    });
}



function createNodeInfo(node)
{
    node.divDisabled = createDiv();
    node.div.appendChild(node.divDisabled);

    node.divDisabled.style.position      = 'absolute';
    node.divDisabled.style.width         = 5;
    node.divDisabled.style.height        = 100;
    node.divDisabled.style.background    = '#e88b';
    node.divDisabled.style.pointerEvents = 'none';
}



function createNodeProgressBar(node)
{
    node.hasProgressBar  = true;

    node.progressWrapper = createDiv('progressWrapper');
    node.progressBar     = createDiv('progressBar');

    node.progressWrapper.appendChild(node.progressBar);
    node.header         .appendChild(node.progressWrapper);
}



function uiInitNodeProgress(nodeId)
{
    const node = nodeFromId(nodeId);
    if (!isValid(node)) return;

    node.progressWrapper.style.display = 'block';

    node.progressBar    .style.left    =   '0%';
    node.progressBar    .style.width   = '100%';
}



function uiUpdateNodeProgress(nodeId, progress)
{
    const node = nodeFromId(nodeId);

    node.progressBar.style.left  = (   progress  * 100) + '%';
    node.progressBar.style.width = ((1-progress) * 100) + '%';
}



function endNodeProgress(node)
{
    node.progressWrapper.style.display = 'none';
}



function setNodePositions(nodes, dx, dy, updateTransform = true)
{
    //console.log('setNodePositions()');

    for (const node of nodes)
    {
        node.div.style.left = node.div.slx + dx;
        node.div.style.top  = node.div.sly + dy;
    }

    if (updateTransform)
        graphView.updateNodeTransforms(nodes);
}



function setNodePosition(node, x, y, updateTransform = true)
{
    //console.log('setNodePosition()');

    node.div.style.left = x;
    node.div.style.top  = y;

    if (updateTransform)
        graphView.updateNodeTransform(node);
}



function selectFromClick(node, ctrl, shift, alt)
{
    node.div.selectedSet = false;
    node.div.moved       = false;


    if (   ctrl
        && shift
        && alt)
    {
        graphView.selectedNodes = getAllNodesFromNode(node);
    }
    else if (shift
          && alt)
    {
        if (isMac) graphView.selectedNodes = getNodesBeforeNode(node);
        else       graphView.selectedNodes = getNodesAcrossNode(node);
    }
    else if (ctrl
          && shift)
    {
        if (isMac) graphView.selectedNodes = getNodesAcrossNode(node);
        else       graphView.selectedNodes = getNodesBeforeNode(node);
    }
    else if (ctrl
          && alt)
        graphView.selectedNodes = getNodesAfterNode(node);

    else if (!node.selected)
    {
        if (shift) node     .selected      = true;
        else       graphView.selectedNodes = [node];

        node.selectedSet = true;
    }
}
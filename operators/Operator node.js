var  newReorderIndex = Number.NaN;
var prevReorderIndex = Number.NaN;
var  oldReorderIndex = Number.NaN;



function createOperatorNode(node)
{
    node.div                    = createDiv('node');
    node.div.op                 = node;
       
    node.div.style.width        = node.defaultWidth + 'px';
           
    node.div.selectedSet        = false;
    node.div.over               = false;
    node.div.dragging           = false;
    node.div.shiftOnPointerDown = false;
    node.div.moved              = false;
       

    node.inner = createDiv('nodeInner');
    node.div.appendChild(node.inner);


    node.div.addEventListener('pointerenter', e =>
    {
        node.div.over      = true;
        graphView.overNode = node;
        
        if (    e.altKey
            && !getCtrlKey(e)
            && !e.shiftKey
            &&  graphView._soloNode != node) 
            graphView.soloNode(node);
        
        node.updateBorder();
    });

    
    node.div.addEventListener('pointerleave', e =>
    {
        node.div.over      = false;
        graphView.overNode = null;
        
        if (  !e.altKey
            || getCtrlKey(e)
            || e.shiftKey)
            graphView.unsoloNode();

        node.updateBorder();
    });

    
    node.paramBack = createDiv('nodeParamBack');
    node.inner.appendChild(node.paramBack);
    

    // node.dragParam = createDiv('dragHandle');
    // node.div.appendChild(node.dragParam);


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
}     



function createNodeHeader(node)
{
    node.header = createDiv('nodeHeader');
    
    node.header.connectionPadding = 8;


    createNodeLabel(node);

    
    node. inputControls = createDiv('inputControls');
    node.outputControls = createDiv('outputControls');

    node.header.appendChild(node. inputControls);
    node.header.appendChild(node.outputControls);

    node.inner.appendChild(node.header);



    node.header.addEventListener('pointerleave', e => 
    { 
        if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.op != node)
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
                  && graphView.tempConn.input.op != node)
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



    node.header.addEventListener('pointerdown', e =>
    {
        if (graphView.spaceDown)    
            return;


        graphView.lastSelectedNodes = [...graphView.selectedNodes];
        
        graphView.putNodeOnTop(node);


        for (const param of node.params)
        {
            if (param.control.textbox == document.activeElement)
                param.control.textbox.finish(true);
        }


        if (    e.button == 0
            && !graphView.overOutput
            && !graphView.overInput)
        {
            e.stopPropagation();

            node.div.selectedSet = false;
            node.div.moved       = false;

            node.div.shiftOnPointerDown = 
                    e.shiftKey
                && !getCtrlKey(e)
                && !e.altKey;


            if (   getCtrlKey(e)
                && e.shiftKey
                && e.altKey)
                graphView.selectedNodes = [node, ...getAllNodesFromNode(node)];

            else if (e.shiftKey
                  && e.altKey)
            {
                if (isMac) graphView.selectedNodes = [node, ...getNodesBeforeNode(node)];
                else       graphView.selectedNodes = [node, ...getNodesAcrossNode(node)];
            }
            else if (getCtrlKey(e)
                  && e.shiftKey)
            {
                if (isMac) graphView.selectedNodes = [node, ...getNodesAcrossNode(node)];
                else       graphView.selectedNodes = [node, ...getNodesBeforeNode(node)];
            }
            else if (getCtrlKey(e)
                  && e.altKey)
                graphView.selectedNodes = [node, ...getNodesAfterNode(node)];

            else if (!node.selected)
            {
                if (e.shiftKey) node     .selected      = true;
                else            graphView.selectedNodes = [node];

                node.selectedSet = true;
            }

            
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


        updateGraphNodes();
    });



    node.header.addEventListener('pointermove', e =>
    {
        const toTheRightOfInputs = e.clientX - boundingRect(node.header).x > 12 * graphView.zoom;

        const  tempConn = graphView. tempConn;
        const savedConn = graphView.savedConn;


        if (node.div.dragging)
        {
            const x       = graphView.clientLeft;
            const w       = graphView.clientWidth;
            const h       = graphView.clientHeight;
            const bounds  = graphView.getAllNodeBounds();
            const yOffset = controlBar.offsetHeight;
        
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
                && !tempConn.output.op.follows(node))
            {
                if (   node._variableInputs
                    && savedConn)
                {
                    const rect    = boundingRect(node.div);
                    const padding = node.header.connectionPadding;

                    const index = Math.min(Math.round(
                          ((e.clientY - rect.y) / graphView.zoom - padding - (connectionSize + connectionGap)/2) 
                        / (connectionSize + connectionGap)),
                        node.inputs.length-2);
                    
                    if (index != prevReorderIndex)
                    {
                        newReorderIndex = index;

                        moveIn(
                            node.inputs, 
                            node.inputs.indexOf(savedConn.input),
                            newReorderIndex);

                        node.updateNode();
                         
                        prevReorderIndex = newReorderIndex;
                    }

                    graphView.overInput   = savedConn.input;
                    graphView.headerInput = savedConn.input;

                    graphView.overInput.updateControl();

                    
                    const inputRect = boundingRect(savedConn.input.control);

                    tempConn.wire.inputPos = point(
                        inputRect.x + inputRect.w/2,
                        inputRect.y + inputRect.h/2 - controlBar.offsetHeight);
                }
                else
                {
                    const input = node.getAutoInput(tempConn.output.dataType);
                    if (!input) return;

                    graphView.overInput   = input;
                    graphView.headerInput = input;
                        
                    input.mouseOver = true;
                    input.updateControl();


                    const inputRect = boundingRect(input.control);

                    tempConn.wire.inputPos = point(
                        inputRect.x + inputRect.w/2,
                        inputRect.y + inputRect.h/2 - controlBar.offsetHeight);
                }
            }
            else if (tempConn.input
                  && !node.follows(tempConn.input.op))
            {
                const output = node.getAutoOutput(tempConn.input.dataType);
                if (!output) return;

                graphView.overOutput   = output;
                graphView.headerOutput = output;
                    
                output.mouseOver = true;
                output.updateControl();


                const rect = boundingRect(output.control);

                tempConn.wire.outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - controlBar.offsetHeight);


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
            else if (!node.selected)
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
                && !graphView.tempConn.output.op.follows(node)
                &&  graphView.overInput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overInput.endConnection();
            }
            else if ( graphView.tempConn.input
                  && !node.follows(graphView.tempConn.input.op)
                  &&  graphView.overOutput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overOutput.endConnection();
            }
        }


        node.div.shiftOnPointerDown = false;
    });
    
    

    node.header.addEventListener('dblclick', e =>
    {
        e.preventDefault();

        var bounds = boundingRect(node.label);

        if (   e.clientX >= bounds.left && e.clientX < bounds.right
            && e.clientY >= bounds.top  && e.clientY < bounds.bottom)
            node.showLabelTextbox();
        else
            node.makeActive();
    });
}



function setNodePositions(nodes, dx, dy, updateTransform = true)
{
    //log('setNodePositions()');

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
    //log('setNodePosition()');

    node.div.style.left = x;
    node.div.style.top  = y;

    if (updateTransform)
        graphView.updateNodeTransform(node);
}
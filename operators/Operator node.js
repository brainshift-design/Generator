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
       
    node.inner                  = createDiv('nodeInner');


    node.div.appendChild(node.inner);

    node.div.addEventListener('pointerenter', function(e)
    {
        node.div.over = true;
        node.updateNode();
    });

    node.div.addEventListener('pointerleave', function(e)
    {
        node.div.over = false;
        node.updateNode();
    });

    
    node.paramBack = createDiv('nodeParamBack');
    node.inner.appendChild(node.paramBack);
    

    createNodeHeader(node);    
}     



function createNodeHeader(node)
{
    node.header = createDiv('nodeHeader');
    
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


        if (   e.button == 0
            && !graphView.overOutput
            && !graphView.overInput)
        {
            e.stopPropagation();

            node.div.selectedSet        = false;
            node.div.moved              = false;
            node.div.shiftOnPointerDown = e.shiftKey;


            if (!node.selected)
            {
                if (e.shiftKey) node     .selected = true;
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

        
        if (node.div.dragging)
        {
            setNodePositions(
                graphView.selectedNodes,
                (e.clientX - node.div.sx) / graphView.zoom,
                (e.clientY - node.div.sy) / graphView.zoom);
            
            node.div.moved = true;

            graphView.updateScroll();
        }
        else if (   graphView.tempConn
                 && toTheRightOfInputs)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.op != node)
            {
                const input = node.getAutoInput(graphView.tempConn.output.dataType);
                if (!input) return;

                graphView.overInput   = input;
                graphView.headerInput = input;
                    
                input.mouseOver = true;
                input.updateControl();


                const rect = boundingRect(input.control);

                graphView.tempConn.wire.inputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - controlBar.offsetHeight);
            }
            else if (graphView.tempConn.input
                  && graphView.tempConn.input.op != node)
            {
                const output = node.getAutoOutput(graphView.tempConn.input.dataType);
                if (!output) return;

                graphView.overOutput   = output;
                graphView.headerOutput = output;
                    
                output.mouseOver = true;
                output.updateControl();


                const rect = boundingRect(output.control);

                graphView.tempConn.wire.outputPos = point(
                    rect.x + rect.w/2,
                    rect.y + rect.h/2 - controlBar.offsetHeight);


                graphView.tempConn.input.updateControl();
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
                    { x: node.div.slx,        y: node.div.sly       },
                    { x: node.div.offsetLeft, y: node.div.offsetTop },
                    node.div.shiftOnPointerDown ));
            }
            else
            {
                actionManager.do(new SelectNodesAction(
                    graphView.selectedNodes    .map(n => n.id), 
                    graphView.lastSelectedNodes.map(n => n.id)));
            }


            if (   !node.div.selectedSet
                && !node.div.moved)
            {
                if (e.shiftKey) node.selected           = true;
                else            graphView.selectedNodes = [node];
            }


            node.div.dragging = false;
            node.header.releasePointerCapture(e.pointerId);
        }
        else if (graphView.tempConn)
        {
            if (   graphView.tempConn.output
                && graphView.tempConn.output.op != node
                && graphView.overInput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overInput.endConnection();
            }
            else if (graphView.tempConn.input
                  && graphView.tempConn.input.op != node
                  && graphView.overOutput)
            {
                graphView.endConnection(e.pointerId);
                graphView.overOutput.endConnection();
            }
        }


        node.div.shiftOnPointerDown = false;
    });
    
    

    node.header.addEventListener('dblclick', e =>
    {
        var bounds = boundingRect(node.label);

        if (   e.clientX >= bounds.left && e.clientX < bounds.right
            && e.clientY >= bounds.top  && e.clientY < bounds.bottom)
            node.showLabelTextbox();
        else
            node.makeActive();
    });
}



function createNodeLabel(node)
{
    node.labelWrapper = createDiv('nodeLabelWrapper');

    node.label        = createDiv('nodeLabel');
    node.label.op     = node;
    
    node.labelWrapper.appendChild(node.label);
    node.header.appendChild(node.labelWrapper);


    node.labelWrapper.addEventListener('pointerdown', e =>
    {
        e.preventDefault();
    });

    node.labelWrapper.addEventListener('pointermove', e =>
    {
        const wrect      = boundingRect(node.labelWrapper);
        const margin     = 14;
        const viewMargin = margin * graphView.zoom;
        
        const x          = e.clientX - wrect.x;

        updateNodeLabel(
            node, 
            (x - viewMargin) / (wrect.width - viewMargin*2));
    });

    node.labelWrapper.addEventListener('pointerleave', e =>
    {
        updateNodeLabel(node, 0);
    });


    initLabelTextbox(node);
}



function updateNodeLabel(node, f = node.labelOffsetFactor)
{
    const margin     = 14;
    const viewMargin = margin * graphView.zoom;

    const wrect      = boundingRect(node.labelWrapper);
    const rect       = boundingRect(node.label);

    const rw         = wrect.width - viewMargin*2;
    const x          = viewMargin + f * rw;


    if (rect.width > rw)
    {
        if (x >= wrect.width - viewMargin)
        {
            node.labelOffsetFactor = 1;
            updateNodeLabelGradient(node);
        }
        else if (x > viewMargin
              && x < wrect.width - viewMargin)
        {
            node.labelOffsetFactor = f;
            updateNodeLabelGradient(node);
        }
        else
        {
            updateNodeLabelGradient(node);
        }
    }
    else
    {
        node.label.style.left      = '50%';
        node.label.style.transform = 'translateX(-50%) '
                                   + 'translateY(calc(-50% - 0.5px))';
    }
}



function updateNodeLabelGradient(node)
{
    const margin     = 14;
    const viewMargin = margin * graphView.zoom;

    const wrect      = boundingRect(node.labelWrapper);
    const rect       = boundingRect(node.label);

    const sf         = (wrect.width - viewMargin*2) / rect.width;
    const df         = viewMargin/rect.width/2;
        
    const s1         = node.labelOffsetFactor * (rect.width - (wrect.width - viewMargin*2)) / rect.width;
    const s0         = s1 - df;
    const s2         = s1 + sf;
    const s3         = s2 + df;

    node.label.style.left      = margin - node.labelOffsetFactor * (rect.width - wrect.width + viewMargin*2 - 1) / graphView.zoom;
    node.label.style.transform = 'translateY(calc(-50% - 0.5px))';

    node.label.style.background = 
          'linear-gradient(90deg, '
        + '#0000 ' + (s0 * 100) + '%, '
        + '#000f ' + (s1 * 100) + '%, '
        + '#000f ' + (s2 * 100) + '%, '
        + '#0000 ' + (s3 * 100) + '%)';

    node.label.style.WebkitBackgroundClip = 'text';
    node.label.style.WebkitTextFillColor  = 'transparent';
}



function resetNodeLabel(node)
{
    const wrect      = boundingRect(node.labelWrapper);
    const rect       = boundingRect(node.label);

    const margin     = 14;
    const viewMargin = margin * graphView.zoom;

    if (rect.width > wrect.width)
    {
        node.label.style.left      = margin - node.labelOffsetFactor * (rect.width - wrect.width + viewMargin*2 - 1) / graphView.zoom;
        node.label.style.transform = 'translateY(calc(-50% - 0.5px))';
    }
    else
    {
        node.label.style.left      = '50%';
        node.label.style.transform = 'translateX(-50%)'
                                   + ' translateY(calc(-50% - 0.5px))';
    }

    // node.label.style.background           = 'black';
    // node.label.style.WebkitBackgroundClip = 'text';
    // node.label.style.WebkitTextFillColor  = 'transparent';
}



function setNodePositions(nodes, dx, dy, updateTransform = true)
{
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
    node.div.style.left = x;
    node.div.style.top  = y;

    if (updateTransform)
        graphView.updateNodeTransform(node);
}
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
        if (node.div.dragging)
        {
            const dx = (e.clientX - node.div.sx) / graphView.zoom;
            const dy = (e.clientY - node.div.sy) / graphView.zoom;
            
            for (const n of graphView.selectedNodes)
            {
                setNodePosition(
                    n.div.op,
                    n.div.slx + dx,
                    n.div.sly + dy);
            }

            node.div.moved = true;

            graphView.updateScroll();
        };
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
    node.label           = createDiv('nodeLabel');
    node.label.op        = node;
    
    node.header.appendChild(node.label);

    initLabelTextbox(node);
}



function setNodePosition(node, x, y, updateTransform = true)
{
    //console.log('setNodePosition(' + node.name + ')');

    node.div.style.left = x;
    node.div.style.top  = y;

    // node.updateNode();

    if (updateTransform)
        graphView.updateNodeTransform(node);
}
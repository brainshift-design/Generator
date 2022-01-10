function createNode(node)
{
    node.div = document.createElement('div');

    node.div.className   = 'node';
    node.div.op          = node;

    node.div.style.width = '100px';
    
    node.div.selectedSet = false;
    node.div.over        = false;
    node.div.dragging    = false;
    node.div.moved       = false;

    node.inner           = document.createElement('div');
    node.inner.className = 'nodeInner';

    node.div.appendChild(node.inner);



    node.div.addEventListener('pointerenter', function(e)
    {
        node.div.over = true;
        updateGraphNode(node);
    });



    node.div.addEventListener('pointerleave', function(e)
    {
        node.div.over = false;
        updateGraphNode(node);
    });

    

    createNodeHeader(node);
}     



function createNodeHeader(node)
{
    node.header = document.createElement('div');
    node.header.className = 'nodeHeader';
    
    createNodeLabel(node);

    node.inputControls = document.createElement('div');
    node.inputControls.className = 'inputControls';
    node.header.appendChild(node.inputControls);

    node.outputControls = document.createElement('div');
    node.outputControls.className = 'outputControls';
    node.header.appendChild(node.outputControls);

    node.inner.appendChild(node.header);



    node.header.addEventListener('pointerdown', e =>
    {
        if (graphView.spaceDown)    
            return;


        graphView.lastSelected = graphView.selected;
        
        graphView.putNodeOnTop(node);


        if (   e.button == 0
            && !graphView.overOutput
            && !graphView.overInput)
        {
            e.stopPropagation();

            node.div.selectedSet = false;
            node.div.moved       = false;


            if (!node.selected)
            {
                if (e.shiftKey) node     .selected = true;
                else            graphView.selected = [node];

                node.selectedSet = true;
            }


            node.div.sx = e.clientX;
            node.div.sy = e.clientY;


            for (const n of graphView.selected)
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
            
            for (const n of graphView.selected)
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
            actionManager.do(new MoveNodesAction(
                graphView.selectedIds(), 
                { x: node.div.slx,        y: node.div.sly       },
                { x: node.div.offsetLeft, y: node.div.offsetTop }));


            if (   !node.div.selectedSet
                && !node.div.moved)
            {
                if (e.shiftKey) node.selected      = true;
                else            graphView.selected = [node];
            }

            node.div.dragging = false;
            node.header.releasePointerCapture(e.pointerId);
        }
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
    node.label           = document.createElement('div');
    node.label.className = 'nodeLabel';
    node.label.op        = node;
    
    node.header.appendChild(node.label);

    initLabelTextbox(node);
}



function setNodePosition(node, x, y)
{
    node.div.style.left = x;
    node.div.style.top  = y;

    graphView.updateNodeTransform(node);

    node.updateNode();
}
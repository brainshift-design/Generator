function createNode(node, headerColor)
{
    node.div = document.createElement('div');

    node.div.className   = 'node';
    node.div.op          = node;

    node.div.style.width = '120px';
    
    node.div.selectedSet = false;
    node.div.dragging    = false;
    node.div.moved       = false;

    node.inner           = document.createElement('div');
    node.inner.className = 'nodeInner';

    node.div.appendChild(node.inner);



    node.div.addEventListener('pointerenter', function(e)
    {
        if (   !graphView.zoomSelecting
            && !graphView.spaceDown)
            e.target.op.inner.style.boxShadow = '0px 5px 20px #0001, 0 0 0 1px #18A0FB';
    });



    node.div.addEventListener('pointerleave', function(e)
    {
        if (   !graphView.zoomSelecting
            && !graphView.spaceDown)
            e.target.op.inner.style.boxShadow = '0px 5px 20px #0001';
    });

    

    createNodeHeader(node, headerColor);
}     



function createNodeHeader(node, headerColor)
{
    node.header = document.createElement('div');
    node.header.className = 'nodeHeader';
    node.header.style.backgroundColor = headerColor;

    node.inputControls = document.createElement('div');
    node.inputControls.className = 'inputControls';
    node.header.appendChild(node.inputControls);

    createNodeLabel(node);

    node.outputControls = document.createElement('div');
    node.outputControls.className = 'outputControls';
    node.header.appendChild(node.outputControls);

    node.inner.appendChild(node.header);



    node.header.addEventListener('pointerdown', e =>
    {
        if (graphView.spaceDown)    
            return;


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
        var bounds = node.label.getBoundingClientRect();

        if (   e.clientX >= bounds.left && e.clientX < bounds.right
            && e.clientY >= bounds.top  && e.clientY < bounds.bottom)
            node.showLabelTextbox();
        else
            node.makeActive();
    });



    node.updateInputs = () =>
    {
        for (const input of node.inputs)
        {
            if (input.connected) 
                input.connection.wire.update(true);
        }
    };



    node.updateOutput = () =>
    {
        if (   node.output 
            && node.output.connected)
        {
            for (const input of node.output.connectedInputs)
                input.connection.wire.update(true);
        }
    };



    node.updateParams = () =>
    {
        for (const param of node.params)
        {
            if (param.input.connected) 
                param.input.connection.wire.update(true);
        }
    };
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

    node.updateInputs();
    node.updateOutput();
    node.updateParams();

    graphView.updateNodeTransform(node);
}
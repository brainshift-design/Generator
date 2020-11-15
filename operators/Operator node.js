function createDiv(node, headerColor)
{
    node.div = document.createElement('div');

    node.div.className = 'node';
    node.div.op        = node;
    
    node.div.selectedSet = false;
    node.div.dragging    = false;
    node.div.moved       = false;

    node.inner = document.createElement('div');
    node.inner.className = 'nodeInner';

    node.div.appendChild(node.inner);


    node.div.addEventListener('pointerdown', function(e) 
    {
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
                if (e.shiftKey) node.selected = true;
                else            graph.selected = [node];

                node.selectedSet = true;
            }

            node.div.sx = e.clientX;
            node.div.sy = e.clientY;

            for (const n of graph.selected)
            {
                n.div.slx = n.div.offsetLeft;
                n.div.sly = n.div.offsetTop;
            }

            node.div.dragging = true;
            node.div.setPointerCapture(e.pointerId);
        }
    });

    node.div.addEventListener('pointermove', function(e) 
    {
        if (node.div.dragging)
        {
            for (const n of graph.selected)
            {
                setDivPosition(
                    n.div.op,
                    n.div.slx + e.clientX - node.div.sx,
                    n.div.sly + e.clientY - node.div.sy);
            }

            node.div.moved = true;
        };
    });

    node.div.addEventListener('pointerup', function(e) 
    {
        if (   e.button == 0
            && node.div.dragging)
        {
            if (   !node.div.selectedSet
                && !node.div.moved)
            {
                if (e.shiftKey) node.selected = true;
                else            graph.selected = [node];
            }

            node.div.dragging = false;
            node.div.releasePointerCapture(e.pointerId);
        }
    });
    
    
    node.div.addEventListener('dblclick', function(e)
    {
        var bounds = node.label.getBoundingClientRect();

        if (   e.clientX >= bounds.left && e.clientX < bounds.right
            && e.clientY >= bounds.top  && e.clientY < bounds.bottom)
            node.showLabelTextbox();
        else
            node.makeActive();
    });


    node.div.addEventListener('pointerenter', function(e)
    {
        e.target.op.inner.style.boxShadow = '0 0 0 1px #18A0FB';
    });

    node.div.addEventListener('pointerleave', function(e)
    {
        e.target.op.inner.style.boxShadow = 'none';
    });


    createDivHeader(node, headerColor);
}     


function createDivHeader(node, headerColor)
{
    node.header = document.createElement('div');
    node.header.className = 'nodeHeader';
    node.header.style.backgroundColor = headerColor;

    node.inputControls = document.createElement('div');
    node.inputControls.className = 'inputControls';
    node.header.appendChild(node.inputControls);

    createDivLabel(node);

    node.outputControls = document.createElement('div');
    node.outputControls.className = 'outputControls';
    node.header.appendChild(node.outputControls);

    node.inner.appendChild(node.header);
}


function createDivLabel(node)
{
    node.label = document.createElement('div');
    node.label.className = 'nodeLabel';
    node.label.op        = node;
    
    node.header.appendChild(node.label);

    initLabelTextbox(node);
}


function setDivPosition(node, x, y)
{
    node.div.style.left = x;
    node.div.style.top  = y;

    for (const input of node.inputs)
    {
        if (input.connected) 
            input.connection.updateWire();
    }

    if (   node.output 
        && node.output.connected)
    {
        for (const input of node.output.connectedInputs)
            input.connection.updateWire();
    }

    for (const param of node.params)
    {
        if (param.input .connected) 
            param.input .connection.updateWire();
    }
}
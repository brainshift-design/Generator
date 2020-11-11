function createDiv(node, headerColor)
{
    node.div = document.createElement('div');

    node.div.className = 'node';
    node.div.op        = node;
    node.div.dragging  = false;


    node.inner = document.createElement('div');
    node.inner.className = 'nodeInner';

    node.div.appendChild(node.inner);


    node.div.addEventListener('pointerdown', function(e) 
    {
        if (   e.button == 0
            && !graphView.overOutput
            && !graphView.overInput)
        {
            e.target.op.sx  = e.clientX;
            e.target.op.sy  = e.clientY;
            e.target.op.slx = e.target.op.offsetLeft;
            e.target.op.sly = e.target.op.offsetTop;

            e.target.dragging = true;
            e.target.setPointerCapture(e.pointerId);
        }
    });

    node.div.addEventListener('pointermove', function(e) 
    {
        if (e.target.dragging)
        {
            setDivPosition(
                e.target.op,
                e.target.op.slx + e.clientX - e.target.op.sx,
                e.target.op.sly + e.clientY - e.target.op.sy);
        };
    });

    node.div.addEventListener('pointerup', function(e) 
    {
        if (   e.button == 0
            && e.target.dragging)
        {
            e.target.dragging = false;
            e.target.releasePointerCapture(e.pointerId);
        }
    });
    
    
    node.div.addEventListener('dblclick', function(e)
    {
        e.target.op.makeActive();
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
    node.label.op = node;
    
    node.label.addEventListener('dblclick', e =>
    {
        e.target.op.showLabelTextbox();
    });
    
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
}
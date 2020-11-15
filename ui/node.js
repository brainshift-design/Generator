// function _createNode(opType, dataType, nodeId)
// {
//     const node = document.createElement('div');
//     node.className = 'node';

//     node.opType   = opType;
//     node.dataType = dataType;
//     node.nodeId   = nodeId;

//     node.params   = [];

//     node.inputs   = [];
//     node.output   = null;


//     node.dragging = false;


//     node.inner = document.createElement('div');
//     node.inner.className = 'nodeInner';

//     node.appendChild(node.inner);


//     node.addEventListener('pointerdown', function(e) 
//     {
//         putNodeOnTop(node);
        
//         if (   e.button == 0
//             && !graphView.overOutput
//             && !graphView.overInput)
//         {
//             node.sx  = e.clientX;
//             node.sy  = e.clientY;
//             node.slx = node.offsetLeft;
//             node.sly = node.offsetTop;

//             node.dragging = true;
//             node.setPointerCapture(e.pointerId);
//         }
//     });

//     node.addEventListener('pointermove', function(e) 
//     {
//         if (node.dragging)
//         {
//             setNodePosition(
//                 node,
//                 node.slx + e.clientX - node.sx,
//                 node.sly + e.clientY - node.sy);
//         };
//     });

//     node.addEventListener('pointerup', function(e) 
//     {
//         if (   e.button == 0
//             && node.dragging)
//         {
//             node.dragging = false;
//             node.releasePointerCapture(e.pointerId);
//         }
//     });
    
    
//     node.addEventListener('dblclick', function(e)
//     {
//         var bounds = node.label.getBoundingClientRect();

//         if (   e.clientX >= bounds.left && e.clientX < bounds.right
//             && e.clientY >= bounds.top  && e.clientY < bounds.bottom)
//             node.showLabelTextbox();
//         else
//             node.makeActive();
//     });


//     node.addEventListener('pointerenter', function(e)
//     {
//         e.target.inner.style.boxShadow = '0 0 0 1px #18A0FB';
//     });

//     node.addEventListener('pointerleave', function(e)
//     {
//         e.target.inner.style.boxShadow = 'none';
//     });


//     createNodeHeader(node);
//     addNode(node);
// }     


// function createNodeHeader(node)
// {
//     node.header = document.createElement('div');
//     node.header.className = 'nodeHeader';

//     var headerColor;

//     switch (node.dataType)
//     {
//         case 'OBJ': headerColor = OBJ_COLOR; break;
//         case 'NUM': headerColor = NUM_COLOR; break;
//     }

//     node.header.style.backgroundColor = headerColor;

//     node.inputControls = document.createElement('div');
//     node.inputControls.className = 'inputControls';
//     node.header.appendChild(node.inputControls);

//     createNodeLabel(node);

//     node.outputControls = document.createElement('div');
//     node.outputControls.className = 'outputControls';
//     node.header.appendChild(node.outputControls);

//     node.inner.appendChild(node.header);
// }


// function createNodeLabel(node)
// {
//     node.label = document.createElement('div');
//     node.label.className = 'nodeLabel';
//     //node.label.op        = node;
    
//     node.label.innerHTML = node.nodeId;

//     node.header.appendChild(node.label);

//     initLabelTextbox(node);
// }


// function addNode(node)
// {
//     if (nodes.length > 0)
//     {
//         const bounds = graphView.getNodeBounds();
//         const gap    = 30;

//         node.style.left = bounds.x + bounds.w + gap;
//         node.style.top  = bounds.y;
//     }
//     else // 0
//     {
//         node.style.zIndex = nodes.length-1;
//         node.style.left   = 100;

//         // I subtract the full height of the node here as they grow down, so this
//         // gives a nice random-ish offset for the first line of nodes
//         node.style.top = graphView.offsetHeight/2 - node.offsetHeight;
//     }

//     nodes.push(node);
//     graphView.appendChild(node);

//     putNodeOnTop(node);
// }


// function setNodePosition(node, x, y)
// {
//     node.style.left = x;
//     node.style.top  = y;

//     for (const input of node.inputs)
//     {
//         if (input.connected) 
//             input.connection.updateWire();
//     }

//     if (   node.output 
//         && node.output.connected)
//     {
//         for (const input of node.output.connectedInputs)
//             input.connection.updateWire();
//     }

//     for (const param of node.params)
//     {
//         if (param.input .connected) 
//             param.input .connection.updateWire();
//     }
// }
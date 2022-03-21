class Graph
{
    nodes        = [];
    deferNodeIds = [];
    
    mutex        = false;

    connections  = [];



    clear()
    {
        this.deleteNodes(this.nodes.map(n => n.id));
        this.connections = [];
    }



    getNewNodeId(curId, id)
    {
        if (!this.nodes.find(n => n.id == id))
            return id;
        

        let numLength = this.getNumLength(id);

        if (numLength > 0)
        {
            const len = id.length - numLength;
            let   num = parseInt(id.substring(len));

            let newId = '';
            while (newId == '' || this.nodes.find(n => n.id == newId))
                newId = id.substring(0, len) + (++num);

            return newId;
        }

        else if (numLength == 0)
        {
            let num   = 2;
            let newId = id + num;

            while (this.nodes.find(n => 
                   n.id != curId 
                && n.id == newId))
                newId = id + (++num);

            return newId;
        }

        else
            return id;
    }
    
    
    
    getNumLength(name)
    {
        let numLength = 0;

        for (let i = name.length - 1; i >= 0; i--)
        {
            if (isDigitChar(name[i])) numLength++;
            else break;
        }

        return numLength;
    }
    
    

    addNodes(nodes, placeNode = true)
    {
        for (const node of nodes)
            this.addNode(node, placeNode);
        
        setTimeout(() => nodes.forEach(n => n.updateNode()));
    }



    addNode(node, placeNode = true, updateLabel = true)
    {
        node.graph = this;

        node._id = this.getNewNodeId(node.id, node.id);
        
        this.nodes.push(node);
        graphView.appendChild(node.div);
        
        if (placeNode)
            graphView.placeNewNode(node);
        
        node.div.style.zIndex = graph.nodes.length-1;

        graphView.putNodeOnTop(node);
        graphView.updateScrollWithBounds();

        if (updateLabel)
            setTimeout(() => node.updateNode());
    }
    


    deleteNodes(nodeIds)
    {
        for (const id of nodeIds)
        {
            const node = this.nodes.find(n => n.id == id);

            for (let i = node.inputs.length-1; i >= 0; i--) // backwards for the sake of variable inputs
            {
                const input = node.inputs[i];
                if (!input.isConnected) continue;

                input.connectedOutput.op.makeActive();
                this.disconnect(input, true);
            }
            
            for (let i = node.outputs.length-1; i >= 0; i--)
            {
                const output = node.outputs[i];
                
                for (const connInput of output.connectedInputs)
                {
                    this.disconnect(connInput, true);
    
                    // if (!activeNodeInTree(connInput.op))
                    //     lastNodesInTreeFrom(connInput.op).forEach(n => n.makeActive());
                    //     connInput.op.lastNodeInTree.makeActive();
                }
            }
            
            node.selected = false;
            node.graph    = null;

            removeFromArray(this.nodes, node);
            graphView.removeChild(node.div);
        }

        graphView.updateScrollWithBounds();
    }



    connect(output, input, inputIndex = -1)
    {
        //console.log('graph.connect()');
        if (input.connectedOutput == output)
            return null;
            

        if (input.connectedOutput)
        {
            const output = input.connectedOutput;
            this.disconnect(input);
            output.updateControl();
        }


        if (   input.op._variableInputs
            && inputIndex > -1)
        {
            input = lastOf(input.op.inputs);
            
            // move new input back to correct index
            moveIn(input.op.inputs, input.op.inputs.length-1, inputIndex);

            input.op.inputControls.insertBefore(
                lastOf(input.op.inputControls.childNodes), 
                input.op.inputControls.childNodes[inputIndex]);
        }


        output.connectedInputs.push(input);
        input .connectedOutput = output;


        const conn = new Connection(output, input);

        input .connection = conn;
        output.connection = conn;
        
        graphView.addWire(conn.wire);

        this.connections.push(conn);

        
        output.op.makePassive();

        if (!activeNodeInTree(input.op))
            input.op.makeActive();
       
           
        output.updateControl();


        return conn;
    }



    disconnect(input)
    {
        //console.log( 'graph.disconnect(' + input.op.id + '.in[' + input.op.inputs.indexOf(input) + '])');
        // first remove the current output

        if (activeNodeInTree(input.op))
            uiDeleteNodeObjects([activeNodeInTree(input.op).id]);


        // then disconnect

        var output = input.connectedOutput;
        if (!output) return false;


        graphView.removeWire(input.connection.wire);

        removeFromArray(this.connections, input.connection);
        removeFromArray(output.connectedInputs, input);

        
        input .connectedOutput = null;
        input .connection      = null;
        output.connection      = null;


        if (input.param)
            input.param.valueText = '';


        if (!activeNodeInTree(output.op))
             output.op.makeActive();
            
        
        output.updateControl();
        input.op.pushUpdate();


        return true;
    }
}



function nodesToJson(nodes, encloseBraces = true, connOutputMustBeInNodes = true)
{
    const tab = '  ';

    
    let json = 
          (encloseBraces ? '{\n' : '')
          + tab + '"nodes":\n'
          + tab + '[';


    let first = true;
    for (let i = 0; i < nodes.length; i++)
    {
        if (!first) json += ','; first = false;
        json += '\n' + nodes[i].toJson(4);
    }
    

    json += 
            '\n' + 
          tab + ']';
          
          
    json += this.connectionsToJson(nodes, connOutputMustBeInNodes);


    json += (encloseBraces ? '\n}' :'');


    return json;
}



function connectionsToJson(nodes, connOutputMustBeInNodes)
{
    const connections = [];


    for (let i = 0; i < nodes.length; i++)
    {
        let node = nodes[i];

        for (let j = 0; j < node.inputs.length; j++)
        {
            if (   !node.inputs[j].isConnected
                ||    !nodes.includes(node.inputs[j].connectedOutput.op)
                   && connOutputMustBeInNodes)
                continue;

            connections.push(node.inputs[j].connection);
        }
    }
    

    if (connections.length == 0)
        return '';


    const tab = '  ';

    let json = 
          ',\n'
        + tab + '"connections":\n'
        + tab + '[';

    
    for (let i = 0; i < connections.length; i++)
    {
        if (i > 0) json += ',';
        json += '\n' + connections[i].toJson(4);
    }


    json += '\n'
        + tab + ']';


    return json;
}



function createNode(opType, creatingButton = null)//, createdNodeId = -1)
{
    let node;

    switch (opType)
    {
        case 'number':           node = new OpNumber();           break;
        case 'minmax':           node = new OpMinMax();           break;
        case 'add':              node = new OpAdd();              break;
        case 'subtract':         node = new OpSubtract();         break;
        case 'multiply':         node = new OpMultiply();         break;
        case 'divide':           node = new OpDivide();           break;
        case 'modulo':           node = new OpModulo();           break;
        case 'exponent':         node = new OpExponent();         break;
        case 'interpolate':      node = new OpInterpolate();      break;
        // case 'random': node = new OpRandom(); break;
        
        case 'color':            node = new OpColor();            break;
        case 'validatecolor':    node = new OpValidateColor();    break;
        case 'colorinterpolate': node = new OpColorInterpolate(); break;
        case 'webcontrast':      node = new OpWebContrast();      break;
        case 'colorblind':       node = new OpColorblind();       break;
        
        case 'rectangle':        node = new OpRectangle();        break;
        // case 'row':    node = new OpRow();    break;
        // case 'column': node = new OpColumn(); break;
        //case 'spread': node = new OpSpread(); break;
    }
    
    node._creatingButton = creatingButton;

    return node;
}



function nodeFromId(id)
{
    return graph.nodes.find(n => n.id == id);
}
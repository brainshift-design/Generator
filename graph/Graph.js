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
        
        //setTimeout(() => nodes.forEach(n => n.updateNode()));
    }



    addNode(node, placeNode = true, updateLabel = true)
    {
        node.graph = this;

        node.id = this.getNewNodeId(node.id, node.id);
        
        this.nodes.push(node);
        graphView.appendChild(node.div);
        
        if (placeNode)
            graphView.placeNewNode(node);
        
        node.div.style.zIndex = graph.nodes.length-1;

        graphView.putNodeOnTop(node);
        graphView.updateScrollWithBounds();

        // if (updateLabel)
        //     setTimeout(() => node.updateNode());
    }
    


    deleteNodes(nodeIds)
    {
        for (const id of nodeIds)
        {
            const node = this.nodes.find(n => n.id == id);

            for (let i = node.inputs.length-1; i >= 0; i--) // backwards for the sake of variable inputs
            {
                const input = node.inputs[i];
                if (!input.connected) continue;

                uiMakeNodeActive(input.connectedOutput.node);
                this.disconnect(input, true);
            }
            
            for (let i = node.outputs.length-1; i >= 0; i--)
            {
                const output = node.outputs[i];
                
                for (const connInput of output.connectedInputs)
                {
                    this.disconnect(connInput, true);
    
                    // if (!activeNodeInTree(connInput.node))
                    //     lastNodesInTreeFrom(connInput.node).forEach(n => uiMakeNodeActive(n));
                    //     uiMakeNodeActive(connInput.node.lastNodeInTree);
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


        if (   input.node._variableInputs
            && inputIndex > -1)
        {
            input = lastOf(input.node.inputs);
            
            // move new input back to correct index
            moveInArray(
                input.node.inputs, 
                input.node.inputs.length-1, 
                inputIndex);

            input.node.inputControls.insertBefore(
                lastOf(input.node.inputControls.childNodes), 
                input.node.inputControls.childNodes[inputIndex]);
        }


        output.connectedInputs.push(input);
        input .connectedOutput = output;


        const conn = new Connection(output, input);

        input .connection = conn;
        output.connection = conn;
        
        graphView.addWire(conn.wire);

        this.connections.push(conn);

        
        // output.node.makePassive();

        // if (!activeNodeInTree(input.node))
        //     uiMakeNodeActive(input.node);
       
           
        output.updateControl();


        return conn;
    }



    disconnect(input)
    {
        //console.log( 'graph.disconnect(' + input.node.id + ' ' + input.index + ')');
        // first remove the current output

        // if (activeNodeInTree(input.node))
        //     uiDeleteObjects([activeNodeInTree(input.node).id]);


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


        // if (!activeNodeInTree(output.node))
        //      uiMakeNodeActive(output.node);
            
        
        output.updateControl();
        pushUpdate([input.node]);


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
            if (   !node.inputs[j].connected
                ||    !nodes.includes(node.inputs[j].connectedOutput.node)
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



function createNode(nodeType, creatingButton = null)//, createdNodeId = -1)
{
    let node;

    switch (nodeType)
    {
        case NUMBER:             node = new OpNumber();           break;
        case NUMBER_MINMAX:      node = new OpMinMax();           break;
        case NUMBER_ADD:         node = new OpAdd();              break;
        case NUMBER_SUBTRACT:    node = new OpSubtract();         break;
        case NUMBER_MULTIPLY:    node = new OpMultiply();         break;
        case NUMBER_DIVIDE:      node = new OpDivide();           break;
        case NUMBER_MODULO:      node = new OpModulo();           break;
        case NUMBER_POWER:       node = new OpExponent();         break;
        case NUMBER_INTERPOLATE: node = new OpInterpolate();      break;
        // case NUMBER_RANDOM:   node = new OpRandom(); break;
        
        case COLOR:              node = new OpColor();            break;
        case COLOR_INTERPOLATE:  node = new OpColorInterpolate(); break;
        case COLOR_VALIDATE:     node = new OpValidateColor();    break;
        case COLOR_CONTRAST:     node = new OpWebContrast();      break;
        case COLORBLIND:         node = new OpColorblind();       break;
        
        case RECTANGLE:          node = new OpRectangle();        break;
        case ELLIPSE:            node = new OpRow();              break;
    }
    
    node._creatingButton = creatingButton;

    return node;
}



function nodeFromId(id)
{
    return graph.nodes.find(n => n.id == id);
}
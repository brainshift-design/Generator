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



    getNewNodeName(_node)
    {
        let name = 
            _node.name == _node.shortTypeName 
            ? _node.shortTypeName 
            : _node.name;


        let maxNum = 0;
        
        for (const node of this.nodes)
        {
            if (node == _node)
                continue;
                
            if (   node.name.length < name.length
                || node.name.substring(0, name.length) !== name)
                continue;
     
                
            let num = parseInt(node.name.substring(name.length));
            
            if (isNaN(num) || num == 0) 
                num = 1;
            
            maxNum = Math.max(num, maxNum);
        }


        maxNum++;

        return name + maxNum;
    }
    
    

    createNode(opType, createdNodeId = -1)
    {
        let node;

        switch (opType)
        {
            case 'number':             node = new OpNumber();      break;
            case 'add':                node = new OpAdd();         break;
            case 'subtract':           node = new OpSubtract();    break;
            case 'multiply':           node = new OpMultiply();    break;
            case 'divide':             node = new OpDivide();      break;
            case 'exponent':           node = new OpExponent();    break;
            case 'interpolatenumbers': node = new OpInterpolateNumbers();    break;
            // case 'random': node = new OpRandom(); break;
            
            case 'color':              node = new OpColor();       break;
            case 'webcontrast':        node = new OpWebContrast(); break;
            
            case 'rectangle':          node = new OpRectangle();   break;
            // case 'row':    node = new OpRow();    break;
            // case 'column': node = new OpColumn(); break;
            //case 'spread': node = new OpSpread(); break;
        }
        
        if (createdNodeId > -1)
        {
            Operator.nextId--;
            node.id = createdNodeId;
        }
        
        return node;
    }



    addNodes(nodes, placeNode = true, createNewName = true)
    {
        for (const node of nodes)
            this.addNode(node, placeNode, createNewName, false);
        
        setTimeout(() =>
        {
            for (const node of nodes)
                updateNodeLabel(node);
        });
    }



    addNode(node, placeNode = true, createNewName = true, updateLabel = true)
    {
        node.graph = this;

        if (createNewName)
            node.setName(this.getNewNodeName(node)); // TODO: not checking return value here
        
        this.nodes.push(node);
        graphView.appendChild(node.div);
        
        if (placeNode)
            graphView.placeNewNode(node);
        
        node.div.style.zIndex = graph.nodes.length-1;

        graphView.putNodeOnTop(node);
        graphView.updateScroll();

        if (updateLabel)
            setTimeout(() => updateNodeLabel(node));
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

        graphView.updateScroll();
    }



    connect(output, input, inputIndex = -1)
    {
        //console.log('graph.connect()');
        if (input.connectedOutput == output)
            return false;
            

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
       
           
        //output.op.updateConnectedInputValueText();

        output.updateControl();


        return true;
    }



    disconnect(input)
    {
        //console.log( 'graph.disconnect(' + input.op.name + '.in[' + input.op.inputs.indexOf(input) + '])');
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
        //setTimeout(() => input.op.pushUpdate());


        return true;
    }



    nodeFromId(id)
    {
        return this.nodes.find(n => n.id == id);
    }



    toJson()
    {
        const tab = '  ';

        let json = '{\n'
            + tab + '"zoom": "' + graphView.zoom  + '",\n'
            + tab + '"panx": "' + graphView.pan.x + '",\n'
            + tab + '"pany": "' + graphView.pan.y + '",\n';

        json += nodesToJson(this.nodes, false);

        json += '\n}';


        return json;
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
          tab + '],\n'
        + tab + '"connections":\n'
        + tab + '[';

        
    first = true;
    for (let i = 0; i < nodes.length; i++)
    {
        let node = nodes[i];

        for (let j = 0; j < node.inputs.length; j++)
        {
            if (   !node.inputs[j].isConnected
                ||    !nodes.includes(node.inputs[j].connectedOutput.op)
                   && connOutputMustBeInNodes)
                continue;

            if (!first) json += ','; first = false;
            json += '\n' + node.inputs[j].connection.toJson(4);
        }
    }
    

    json += '\n'
        + tab + ']'
        + (encloseBraces ? '\n}' :'');


    return json;
}
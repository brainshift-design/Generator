class Graph
{
    nodes        = [];
    deferNodeIds = [];
    
    mutex        = false;



    clear()
    {
        this.deleteNodes(this.nodes.map(n => n.id));
    }



    getNewNodeName(_node)
    {
        let opType = _node.shortTypeName;

        let maxNum = 0;
        
        for (const node of this.nodes)
        {
            if (node == _node)
                continue;
                
            if (   node.name.length < opType.length
                || node.name.substring(0, opType.length) !== opType)
                continue;
                
            let num = parseInt(node.name.substring(opType.length));
            
            if (isNaN(num) || num == 0) 
                num = 1;
            
            maxNum = Math.max(num, maxNum);
        }

        // if (maxNum == 0)
        //     return opType;

        maxNum++;

        return opType + maxNum;
    }
    
    

    createNode(opType, createdNodeId = -1)
    {
        let node;

        switch (opType)
        {
            case 'number':      node = new OpNumber();      break;
            case 'add':         node = new OpAdd();         break;
            case 'subtract':    node = new OpSubtract();    break;
            case 'multiply':    node = new OpMultiply();    break;
            case 'divide':      node = new OpDivide();      break;
            case 'exponent':    node = new OpExponent();    break;
            // case 'random': node = new OpRandom(); break;
            
            case 'color':       node = new OpColor();       break;
            case 'webcontrast': node = new OpWebContrast(); break;
            
            // case 'rect':   node = new OpRect();   break;
            // case 'row':    node = new OpRow();    break;
            // case 'column': node = new OpColumn(); break;
            //case 'spread': node = new OpSpread(); break;
        }
        
        if (createdNodeId > -1)
        {
            Operator.nextId--;
            node.id = createdNodeId;
        }
        
        this.addNode(node);

        return node;
    }



    addNodes(nodes)
    {
        for (const node of nodes)
            this.addNode(node);
    }



    addNode(node)
    {
        node.graph = this;
        node.setName(this.getNewNodeName(node)); // TODO: not checking return value here
        
        this.nodes.push(node);
        graphView.appendChild(node.div);
        
        graphView.placeNewNode(node);
        
        node.div.style.zIndex = graph.nodes.length-1;

        graphView.putNodeOnTop(node);
        graphView.updateScroll();

        //updateGraphNodes();

        setTimeout(() => node.pushUpdate());
    }
    


    deleteNodes(nodeIds)
    {
        for (const id of nodeIds)
        {
            const node = this.nodes.find(n => n.id == id);

            for (const input of node.inputs)
            {
                if (!input.isConnected) continue;

                input.connectedOutput.op.makeActive();
                this.disconnect(input, true);
            }
            
            for (const output of node.outputs)
            {
                for (const connInput of output.connectedInputs)
                {
                    this.disconnect(connInput, true);
                    
                    if (!activeNodeInTree(connInput.op))
                    connInput.op.lastNodeInTree.makeActive();
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
        if (input.connectedOutput == output)
            return false;
            

        if (input.connectedOutput)
            this.disconnect(input);


        if (   input.op._variableInputs
            && inputIndex > -1)
        {
            input = lastOf(input.op.inputs);
            
            // move new input back to correct index
            moveIn(input.op.inputs, input.op.inputs.length-1, inputIndex);
        }


        output.connectedInputs.push(input);
        input .connectedOutput = output;


        const conn = new Connection(output, input);

        input .connection = conn;
        output.connection = conn;
        
        graphView.addWire(conn.wire);

        output.op.makePassive();
        output.updateControl();
        

        if (!activeNodeInTree(input.op))
            input.op.makeActive();
       
            
        output.op.updateConnectedInputValueText();
        //conn.wire.style.zIndex = 0;//MAX_INT32;


        setTimeout(() => output.op.pushUpdate());


        return true;
    }



    disconnect(input)
    {
        // first remove the current output

        if (!!activeNodeInTree(input.op))
            uiDeleteNodeObjects([activeNodeInTree(input.op).id]);


        // then disconnect

        var output = input.connectedOutput;
        if (!output) return false;

        
        graphView.removeWire(input.connection.wire);

        removeFromArray(output.connectedInputs, input);
        
        input .connection     = null;
        output.connection     = null;

        input.connectedOutput = null;

        if (input.param)
            input.param.valueText = '';


        if (!activeNodeInTree(output.op))
             output.op.makeActive();
            

        setTimeout(() => input.op.pushUpdate());


        return true;
    }



    nodeFromId(id)
    {
        return this.nodes.find(n => n.id == id);
    }



    toJson()
    {
        const tab = '  ';

        let json = 
              '{\n'
            + tab + '"zoom": "' + graphView.zoom  + '",\n'
            + tab + '"panx": "' + graphView.pan.x + '",\n'
            + tab + '"pany": "' + graphView.pan.y + '",\n'
            + tab + '"nodes":\n'
            + tab + '[';
            

        let first = true;
        for (let i = 0; i < this.nodes.length; i++)
        {
            if (!first) json += ','; first = false;
            json += '\n' + this.nodes[i].toJson(4);
        }
        

        json += 
              '\n' + 
              tab + '],\n'
            + tab + '"connections":\n'
            + tab + '[';

            
        first = true;
        for (let i = 0; i < this.nodes.length; i++)
        {
            let node = this.nodes[i];

            for (let j = 0; j < node.inputs.length; j++)
            {
                if (!node.inputs[j].isConnected)
                    continue;

                if (!first) json += ','; first = false;
                json += '\n' + node.inputs[j].connection.toJson(4);
            }
        }
        

        json += 
                '\n' + 
                tab + ']\n'
            + '}';


        return json;
    }
}
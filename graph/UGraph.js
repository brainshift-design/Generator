class UGraph
{
    nodes = [];
    
    
    mutex = false;

    deferNodeIds = [];


    
    getNewNodeName(_node)
    {
        let opType = _node.opType;

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
            case 'number': node = new UOpNumber(); break;
            case 'random': node = new UOpRandom(); break;
            case 'rect':   node = new UOpRect();   break;
            case 'row':    node = new UOpRow();    break;
            case 'column': node = new UOpColumn(); break;
            //case 'spread': node = new UOpSpread(); break;
        }
        
        if (createdNodeId > -1)
        {
            UOperator.nextId--;
            node.id = createdNodeId;
        }
        
        this.addNode(node);

        return node;
    }



    addNode(node)
    {
        node.graph = this;
        node.setId(this.getNewNodeName(node)); // TODO: not checking return value here
            
        if (this.nodes.length > 0)
        {
            const bounds = graphView.getNodeBounds();

            bounds.x /= graphView.zoom;
            bounds.y /= graphView.zoom;
            bounds.w /= graphView.zoom;
            bounds.h /= graphView.zoom;

            this.nodes.push(node);
            graphView.appendChild(node.div);

            const gap = 30;
            node.div.style.left = bounds.x + bounds.w + gap;
            node.div.style.top  = bounds.y;
        }
        else // 0
        {
            this.nodes.push(node);
            graphView.appendChild(node.div);

            node.div.style.zIndex = uiGraph.nodes.length-1;
            node.div.style.left = 100;

            // I subtract the full height of the node here as they grow down, so this
            // gives a nice random-ish offset for the first line of nodes
            node.div.style.top = graphView.offsetHeight/2 - node.div.offsetHeight;
        }

        graphView.putNodeOnTop(node);
        graphView.updateScroll();
    }
    

    
    deleteNodes(nodeIds)
    {
        for (const id of nodeIds)
        {
            const node = this.nodes.find(n => n.id == id);

            for (const input of node.inputs)
            {
                if (!input.connected) continue;

                input.connectedOutput.op.makeActive();
                this.disconnect(input, true);
            }
            
            if (!!node.output)
            {
                for (const input of node.output.connectedInputs)
                {
                    this.disconnect(input, true);
                    
                    if (!activeNodeInTree(input.op))
                    input.op.lastNodeInTree.makeActive();
                }
            }
            
            node.selected = false;
            node.graph    = null;

            removeFromArray(this.nodes, node);
            graphView.removeChild(node.div);
        }

        graphView.updateScroll();
    }



    connect(output, input)
    {
        if (input.connectedOutput == output)
            return false;
            
        if (input.connectedOutput != null)
            this.disconnect(input);

        output.connectedInputs.push(input);
        input .connectedOutput = output;

        const conn = new UConnection(output, input);

        input .connection = conn;
        output.connection = conn;
        
        graphView.addWire(conn.wire);

        output.op.makePassive();
        
        //invalidate(input.op);
    
        if (!activeNodeInTree(input.op))
            input.op.makeActive();
            
        output.op.updateConnectedInputValueText();
        conn.wire.style.zIndex = Number.MAX_SAFE_INTEGER;

        return true;
    }



    disconnect(input)//, deletingOutput = false)
    {
        // first remove the current output

        //if (input.op)
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


        // invalidate(input.op);
        // invalidate(output.op);

        if (!activeNodeInTree(output.op))
           // && !deletingOutput)
             output.op.makeActive();
            
        return true;
    }



    nodeFromId(id)
    {
        return this.nodes.find(n => n.id == id);
    }



    save()
    {
        const tab = '  ';

        let save = 
              '{\n'
            + tab + '"zoom" : "' + graphView.zoom  + '",\n'
            + tab + '"pan-x": "' + graphView.pan.x + '",\n'
            + tab + '"pan-y": "' + graphView.pan.y + '",\n'
            + tab + '"nodes":\n'
            + tab + '[';
            

            for (let i = 0; i < this.nodes.length; i++)
            {
                save += '\n' + this.nodes[i].save(4);
                
                if (i < this.nodes.length-1)
                    save += ',';
            }
            

            save += 
                  '\n' + 
                  tab + '],\n'
                + tab + '"connections":\n'
                + tab + '[';

                
            for (let i = 0; i < this.nodes.length; i++)
            {
                let node = this.nodes[i];

                for (let j = 0; j < node.inputs.length; j++)
                {
                    if (!node.inputs[j].connected)
                        continue;

                    save += '\n' + node.inputs[j].connection.save(4);
                    
                    if (i < node.inputs.length-1)
                       save += ',';
                }
            }
            

            save += 
                  '\n' + 
                  tab + ']\n'
               + '}';


            return save;
    }
}
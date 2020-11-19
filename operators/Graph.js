class Graph
{
    nodes = [];
    
    
    mutex = false;

    deferNodes = [];

    
    getNewId(_node)
    {
        var opType = _node.opType;

        var maxNum = 0;
        
        for (const node of this.nodes)
        {
            if (node == _node)
                continue;
                
            if (   node.id.length < opType.length
                || node.id.substring(0, opType.length) !== opType)
                continue;
                
            var num = parseInt(node.id.substring(opType.length));
            
            if (isNaN(num) || num == 0) 
                num = 1;
            
            maxNum = Math.max(num, maxNum);
        }

        // if (maxNum == 0)
        //     return opType;

        maxNum++;

        return opType + maxNum;
    }
    
    
    createNode(opType)
    {
        var node;

        switch (opType)
        {
            case 'number': node = new OpNumber(); break;
            case 'random': node = new OpRandom(); break;
            case 'rect':   node = new OpRect();   break;
            case 'row':    node = new OpRow();    break;
            case 'column': node = new OpColumn(); break;
            case 'spread': node = new OpSpread(); break;
        }
        
        this.addNode(node);

        return node;
    }


    addNode(node)
    {
        node.graph = this;
        node.setId(this.getNewId(node)); // TODO: not checking return value here
        
        if (this.nodes.length > 0)
        {
            const bounds = graphView.getNodeBounds();
            
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

            node.div.style.zIndex = graph.nodes.length-1;
            node.div.style.left = 100;

            // I subtract the full height of the node here as they grow down, so this
            // gives a nice random-ish offset for the first line of nodes
            node.div.style.top = graphView.offsetHeight/2 - node.div.offsetHeight;
        }

        graphView.putNodeOnTop(node);
    }
    

    removeNodes(nodeIds)
    {
        for (const nodeId of nodeIds)
        {
            const node = this.nodes.find(n => n.id == nodeId);

            for (const input of node.inputs)
                if (input.connected) this.disconnect(input, true);

            if (!!node.output)
            {
                for (const input of node.output.connectedInputs)
                    this.disconnect(input, true);
            }

            node.graph = null;
            removeFromArray(node, this.nodes);
            graphView.removeChild(node.div);
        }
    }


    connect(output, input)
    {
        if (input.connectedOutput == output)
            return false;
            
        if (input.connectedOutput != null)
            this.disconnect(input);

        output.connectedInputs.push(input);
        input .connectedOutput = output;

        const conn = new Connection(output, input);

        input .connection = conn;
        output.connection = conn;
        
        graphView.addWire(conn.wire);
        
        output.op.makePassive();
        
        //invalidate(input.op);
    
        if (!input.op.activeNodeInTree)
            input.op.makeActive();

        return true;
    }


    disconnect(input, deletingOutput = false)
    {
        // first remove the current output

        if (input.op)
            removeNodeOutput(input.op.activeNodeInTree);

        // then disconnect

        var output = input.connectedOutput;
        if (!output) return false;

        graphView.removeWire(input.connection.wire);

        removeFromArray(input, output.connectedInputs);
        
        input .connection     = null;
        output.connection     = null;

        input.connectedOutput = null;


        // invalidate(input.op);
        // invalidate(output.op);

        if (   !output.op.activeNodeInTree
            && !deletingOutput)
             output.op.makeActive();
            
        return true;
    }


    nodeFromId(id)
    {
        return this.nodes.find(n => n.id === id);
    }
}
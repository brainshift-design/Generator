class Graph
{
    nodes = [];
    
    
    #selected = [];
    get selected() { return this.#selected; }
    set selected(sel)
    {
        for (const node of this.#selected)            
            node.setSelected(false);

        this.#selected = sel;

        for (const node of this.#selected)
            node.setSelected(true);
    }


    mutex = false;

    deferNodes = [];

    random = new Random();
    randomSeed = this.random.seed; // TODO reset the seed when loading a graph

    
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
        node.setGraph(this);
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
    

    connect(output, input)
    {
        if (input.connectedOutput == output)
            return false;
            
        if (input.connectedOutput != null)
            this.disconnect(input);

        if (input.op)
        {
            output.connectedInputs.push(input);
            input.connectedOutput = output;

            const conn = new Connection(output, input);

            input .connection = conn;
            output.connection = conn;
            
            wires.appendChild(conn.wire);
            conn.updateWire();
            
            output.op.makePassive();
            input.op.valid = false;
        
            generate([input.op.activeNodeInTree]);

            return true;
        }
        
        else if (input.param)
        {
            output.connectedInputs.push(input);
            input.connectedOutput = output;

            const conn = new Connection(output, input);

            input .connection = conn;
            output.connection = conn;
            
            wires.appendChild(conn.wire);
            conn.updateWire();
            
            input.param.op.valid = false;
        
            generate([input.param.op.activeNodeInTree]);

            return true;
        }


        return false;
    }


    disconnect(input, remove = true)
    {
        // first remove the current output

        if (input.op)
            removeNodeOutput(input.op.activeNodeInTree);

        // then disconnect

        var output = input.connectedOutput;
        if (!output) return false;

        //if (remove)
        //    wires.removeChild(input.connection.wire);

        var inputIndex = output.connectedInputs.indexOf(input);
        output.connectedInputs.splice(inputIndex, 1);
        
        input .connection     = null;
        output.connection     = null;

        input.connectedOutput = null;


        output.op.valid = false;

        if (!output.op.activeNodeInTree)
            output.op.makeActive();


        var inputOp;

             if (input.op   ) inputOp = input.op;
        else if (input.param) inputOp = input.param.op;

        inputOp.valid = false;
        inputOp.activeNodeInTree.makeActive();

        generate([
            output.op, 
            inputOp.activeNodeInTree]);

            
        return true;
    }


    nodeFromId(id)
    {
        return this.nodes.find(n => n.id === id);
    }
}
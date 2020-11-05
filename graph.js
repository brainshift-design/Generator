class Graph
{
    nodes = [];

    mutex = false;

    deferOutputs = [];

    random = new Random();
    randomSeed = this.random.seed; // TODO reset the seed when loading a graph

    overInput  = null;
    overOutput = null;

    tempConn   = null;
    
    
    getNewId(_node)
    {
        var type = _node.type;

        var maxNum = 0;
        
        for (const node of this.nodes)
        {
            if (node == _node)
                continue;
                
            if (   node.id.length < type.length
                || node.id.substring(0, type.length) !== type)
                continue;
                
            var num = parseInt(node.id.substring(type.length));
            
            if (isNaN(num) || num == 0) 
                num = 1;
            
            maxNum = Math.max(num, maxNum);
        }

        if (maxNum == 0)
            return type;

        maxNum++;

        return type + maxNum;
    }
    
    
    createNode(type)
    {
        var node;

        switch (type)
        {
            case 'rect':   node = new OpRect();   break;
            case 'spread': node = new OpSpread(); break;
        }
        
        this.addNode(node);
        node.makeActive();
    }


    addNode(node)
    {
        this.nodes.push(node);

        node.setGraph(this);
        node.setId(this.getNewId(node)); // TODO: not checking return value here

        graphView.appendChild(node.div);
        node.makeActive();
    }
    

    connect(output, input)
    {
        if (output.connectedInput != null)
            this.disconnect(output.connectedInput);

        output.connectedInputs.push(input);
        input.connectedOutput = output;

        const conn = new Connection(output, input);

        input .connection = conn;
        output.connection = conn;

        wires.appendChild(conn.wire);
        conn.updateWire();
        
        input.op.valid = false;
        
        regenerateNode(output.op.activeNodeInChain);

        return true;
    }


    disconnect(input, remove = true)
    {
        var output = input.connectedOutput;
        if (!output) return false;

        if (remove)
            wires.removeChild(input.connection.wire);

        var inputIndex = output.connectedInputs.indexOf(input);
        output.connectedInputs.splice(inputIndex, 1);
        
        input .connection     = null;
        output.connection     = null;

        input.connectedOutput = null;

        input.op.valid = false;

        regenerateNode(output.op.activeNodeOnChain);
        regenerateNode(input .op.activeNodeOnChain);
    
        return true;
    }


    startConnectionFromOutput(output)
    {
        this.tempConn = new Connection(output, null);
        wires.appendChild(this.tempConn.wire);    
    }


    startConnectionFromInput(input)
    {
        this.tempConn = new Connection(null, input);
        wires.appendChild(this.tempConn.wire);    
    }


    cancelConnection()
    {
        wires.removeChild(this.tempConn.wire);    
        this.tempConn = null;
    }
}
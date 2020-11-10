class Graph
{
    nodes = [];

    mutex = false;

    deferOutputs = [];

    random = new Random();
    randomSeed = this.random.seed; // TODO reset the seed when loading a graph

    
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
            case 'row':    node = new OpRow();    break;
            case 'column': node = new OpColumn(); break;
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
    }
    

    connect(output, input)
    {
        if (input.connectedOutput == output)
            return false;
            
        if (input.connectedOutput != null)
            this.disconnect(input);

        output.connectedInputs.push(input);
        input.connectedOutput = output;

        const conn = new Connection(output, input);

        input .connection = conn;
        output.connection = conn;
        
        wires.appendChild(conn.wire);
        conn.updateWire();
        
        output.op.makePassive();
        input.op.valid = false;
    
        if (input.op.activeNodeInTree.output)
            regenerateOutputs([input.op.activeNodeInTree.output]);

        return true;
    }


    disconnect(input, remove = true)
    {
        // first remove the current output

        removeNodeOutput(input.op.activeNodeInTree);

        // then disconnect

        var output = input.connectedOutput;
        if (!output) return false;

        if (remove)
            wires.removeChild(input.connection.wire);

        var inputIndex = output.connectedInputs.indexOf(input);
        output.connectedInputs.splice(inputIndex, 1);
        
        input .connection     = null;
        output.connection     = null;

        input.connectedOutput = null;

        output.op.valid = false;
        input .op.valid = false;

        if (!output.op.activeNodeInTree)
            output.op.makeActive();

        input.op.activeNodeInTree.makeActive();
        
        regenerateOutputs([
            output, 
            input.op.activeNodeInTree.output]);
    
        return true;
    }


    nodeFromId(id)
    {
        return this.nodes.find(n => n.id === id);
    }
}
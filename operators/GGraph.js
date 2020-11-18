class GGraph
{
    nodes = [];

    mutex = false;

    deferNodes = [];

    random = new Random();
    randomSeed = this.random.seed; // TODO reset the seed when loading a graph

    
    createNode(opType)
    {
        var node;

        switch (opType)
        {
            case 'number': node = new GOpNumber(); break;
            case 'random': node = new GOpRandom(); break;
            case 'rect':   node = new GOpRect();   break;
            case 'row':    node = new GOpRow();    break;
            case 'column': node = new GOpColumn(); break;
            case 'spread': node = new GOpSpread(); break;
        }
        
        this.addNode(node);

        return node;
    }


    addNode(node)
    {
        node.setGraph(this);
        this.nodes.push(node);
    }
    

    removeNode(nodeId)
    {
        const node = this.nodes.find(n => n.id == nodeId);

        for (const input of node.inputs)
            if (input.connected) this.disconnect(input);

        if (!!node.output)
        {
            for (const input of node.output.connectedInputs)
                this.disconnect(input);
        }

        node.setGraph(null);
        removeFromArray(node, this.nodes);
    }


    connect(output, input)
    {
        if (input.connectedOutput == output)
            return false;
            
        if (input.connectedOutput != null)
            this.disconnect(input);

        output.connect(input);

        input.connectedOutput = output;

        const conn = new GConnection(output, input);

        input .connection = conn;
        output.connection = conn;
        
        output.op.valid = false;

        return true;
    }


    disconnect(input, remove = true)
    {
        var output = input.connectedOutput;
        if (!output) return false;

        if (!!input.param)
            input.param.value = input.data.value;

        output.disconnect(input);
        
        input .connection     = null;
        output.connection     = null;

        input.connectedOutput = null;

        output.op.valid = false;
        input .op.valid = false;
            
        return true;
    }


    nodeFromId(id)
    {
        return this.nodes.find(n => n.id === id);
    }
}
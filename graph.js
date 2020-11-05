class Graph
{
    nodes = [];
    #activeNode = null;

    connections = [];

    mutex = false;
    defer = false;

    random = new Random();
    randomSeed = this.random.seed; // TODO reset the seed when loading a graph


    get activeNode() { return this.#activeNode; }
    set activeNode(node)
    {
        if (this.#activeNode != null)
            this.#activeNode.div.style.boxShadow = 'none';

        this.#activeNode = node;
        
        if (this.#activeNode != null)
            this.#activeNode.div.style.boxShadow = '0 0 0 2px #18A0FB';

        updateCanvas();
    }


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
    }


    addNode(node)
    {
        this.nodes.push(node);

        node.setGraph(this);
        node.setId(this.getNewId(node)); // TODO: not checking return value here

        graphView.appendChild(node.div);

        this.activeNode = node;
    }
    

    connect(output, input)
    {
        if (output.connectedInput != null)
            this.disconnect(output.connectedInput);


        output.connectedInputs.push(input);
        input.connectedOutput = output;


        var conn = new Connection(output, input);

        input .connection = conn;
        output.connection = conn;
        
        this.connections.push(conn);
        wires.appendChild(conn.wire);
        

        updateCanvas();
    }


    disconnect(input)
    {
        if (input.connectedOutput == null)
            return false;

        var iConn = this.connections.findIndex(c => c.input == input && c.output == input.connectedOutput);
        graphView.removeChild(this.connections[iConn].wire);
        this.connections.splice(iConn, 1);
        
        var iInput = input.connectedOutput.connectedInputs.indexOf(input);
        input.connectedOutput.connectedInputs.splice(iInput, 1);
        
        input.connection                 = null;
        input.connectedOutput.connection = null;

        input.connectedOutput            = null;

        updateCanvas();
    
        return true;
    }
}
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
        //node.setId(this.getNewId(node)); // TODO: not checking return value here
        
        this.nodes.push(node);
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

            const conn = new GConnection(output, input);

            input .connection = conn;
            output.connection = conn;
            
            output.op.makePassive();
            input.op.valid = false;
        
            generate([input.op.activeNodeInTree]);

            return true;
        }
        
        else if (input.param)
        {
            output.connectedInputs.push(input);
            input.connectedOutput = output;

            const conn = new GConnection(output, input);

            input .connection = conn;
            output.connection = conn;
            
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
        console.log(id);
        const node = this.nodes.find(n => n.id === id);
        console.log(node);
        return node;
    }
}
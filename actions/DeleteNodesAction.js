class DeleteNodesAction
extends Action
{
    prevSelectedIds = [];
    nodeIds         = [];
    nodes           = [];
    nodePos         = [];
    connections     = []; // [{outputOpId, outputIndex, inputOpId, inputIndex}]



    constructor(nodeIds, prevSelectedIds)
    {
        super('delete ' + nodeIds.length + ' node' + (nodeIds.length == 1 ? '' : 's'));

        this.nodeIds         = [...nodeIds]; // clone the array
        this.nodes           = graph.nodes.filter(n => nodeIds.includes(n.id));
        this.prevSelectedIds = [...prevSelectedIds];
    }



    addConnection(conn)
    {
        const outputIndex = conn.output.op.outputs.indexOf(conn.output);
        const  inputIndex = conn.input .op. inputs.indexOf(conn. input);

        if (!this.connections.find(c => 
                   c.outputOpId  == conn.output.op.id
                && c.outputIndex == outputIndex
                && c.inputOpId   == conn.input.op.id
                && c.inputIndex  == inputIndex))
            this.connections.push(getConnectionForArrayWithIds(conn));
    }



    do()
    {
        for (const nodeId of this.nodeIds)
        {
            const node = nodeFromId(nodeId);

            this.nodePos.push(point(
                node.div.offsetLeft, 
                node.div.offsetTop));

            for (const input of node.inputs.filter(i => i.isConnected))
                this.addConnection(input.connection);

            for (const output of node.outputs)
                for (const input of output.connectedInputs)
                    this.addConnection(input.connection);
        }


        for (const nodeId of this.nodeIds)
        {
            const node = nodeFromId(nodeId);

            for (const input of node.inputs.filter(i => i.isConnected))
                uiDisconnect(input);

            for (const output of node.outputs)
                for (const input of output.connectedInputs)
                    uiDisconnect(input);
        }


        uiDeleteNodes(this.nodeIds, this.id);
    }



    undo()
    {
        this.undeleteNodes();
        this.undeleteConnections();

        this.nodePos     = [];
        this.connections = [];

        graphView.selectByIds(this.prevSelectedIds);
    }



    undeleteNodes()
    {
        //log('this.nodes', this.nodes);

        graph.addNodes(this.nodes);
        graphView.selected = this.nodes;
        graphView.putNodeOnTop(lastOf(this.nodes));
    
        for (let i = 0; i < this.nodes.length; i++)
        {
            setNodePosition(
                this.nodes[i], 
                this.nodePos[i].x, 
                this.nodePos[i].y);
        }

        for (let i = 0; i < this.nodes.length; i++)
            this.nodes[i].id = this.nodeIds[i];


        uiSaveNodesAndConns(this.nodeIds);
    }



    undeleteConnections()
    {
        const connections    = [...this.connections];
        const varConnections = [];
       
        
        // connections going into variable inputs must be treated separately
        for (let i = connections.length-1; i >= 0; i--)
        {
            if (nodeFromId(connections[i].inputOpId)._variableInputs)
            {
                varConnections.push(connections[i]);
                removeAt(connections, i);
            }
        }

        
        varConnections.sort((c1, c2) =>
        {
            if (c1.inputOpId  != c2.inputOpId ) return c1.inputOpId  - c2.inputOpId;
            if (c1.inputIndex != c2.inputIndex) return c1.inputIndex - c2.inputIndex;
            return 0;
        });
        
        
        this.connect(connections);
        this.connect(varConnections);
    }



    connect(connections)
    {
        for (const conn of connections)
        {
            const outputOp = nodeFromId(conn.outputOpId);
            const inputOp  = nodeFromId(conn. inputOpId);

            uiVariableConnect(outputOp, conn.outputIndex, inputOp, conn.inputIndex);
        }
    }
}
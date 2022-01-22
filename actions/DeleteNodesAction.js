class DeleteNodesAction
extends Action
{
    nodeIds     = [];
    nodes       = [];
    nodePos     = [];
    connections = []; // [{outputOpId, outputIndex, inputOpId, inputIndex}]



    constructor(nodeIds)
    {
        super('delete ' + nodeIds.length + ' node' + (nodeIds.length == 1 ? '' : 's'));

        this.nodeIds = [...nodeIds]; // clone the array
        this.nodes   = graph.nodes.filter(n => this.nodeIds.includes(n.id));
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
            this.connections.push({
                outputOpId:  conn.output.op.id,
                outputIndex: conn.output.op.outputs.indexOf(conn.output),
                inputOpId:   conn.input .op.id,
                inputIndex:  conn.input .op. inputs.indexOf(conn. input)});
    }



    do()
    {
        for (const nodeId of this.nodeIds)
        {
            const node = graph.nodes.find(n => n.id == nodeId);

            this.nodePos.push({
                x: node.div.offsetLeft, 
                y: node.div.offsetTop});

            for (const input of node.inputs.filter(i => i.isConnected))
                this.addConnection(input.connection);

            for (const output of node.outputs)
                for (const input of output.connectedInputs)
                    this.addConnection(input.connection);
        }


        for (const nodeId of this.nodeIds)
        {
            const node = graph.nodes.find(n => n.id == nodeId);

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
        uiUndeleteNodes(this.nodes, this.nodePos);
 
        for (const conn of this.connections)
        {
            const outputOp = graph.nodes.find(n => n.id == conn.outputOpId);
            const inputOp  = graph.nodes.find(n => n.id == conn. inputOpId);

            uiVariableConnect(outputOp, conn.outputIndex, inputOp, conn.inputIndex);
        }

        this.nodePos     = [];
        this.connections = [];
    }
}
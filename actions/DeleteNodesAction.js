class DeleteNodesAction
extends Action
{
    nodeIds     = [];
    nodes       = [];
    connections = []; // JSON definitions



    constructor(nodeIds)
    {
        super('Delete nodes');
        this.nodeIds = [...nodeIds]; // clone the array
        this.nodes   = graph.nodes.filter(n => this.nodeIds.includes(n.id));
    }



    do()
    {
        for (const nodeId of this.nodeIds)
        {
            const node = graph.nodes.find(n => n.id == nodeId);


            for (const input of node.inputs)
            {
                if (input.isConnected)
                    this.connections.push(input.connection.toJson());
            }

            for (const output of node.outputs)
            {
                for (const input of output.connectedInputs)
                    this.connections.push(input.connection.toJson());
            }

            
            for (const input of node.inputs)
            {
                if (input.isConnected)
                    uiDisconnect(input);
            }

            for (const output of node.outputs)
            {
                for (const input of output.connectedInputs)
                    uiDisconnect(input);
            }
        }


        uiDeleteNodes(this.nodeIds, this.id);
    }



    undo()
    {
        uiUndeleteNodes(this.nodes);
 
        for (const json of this.connections)
        {
            const _conn = JSON.parse(json);
            console.log(_conn);

            Connection.parseJson(_conn);
        }

        this.connections = [];
    }
}
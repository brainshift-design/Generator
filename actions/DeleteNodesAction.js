class DeleteNodesAction
extends Action
{
    nodeIds     = [];
    nodes       = [];
    connections = [];



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
            const node = graph.nodes.find(n => n.id == node.di)
        }


        uiDeleteNodes(this.nodeIds, this.id);
    }



    undo()
    {
        uiUndeleteNodes(this.nodes);
        // TODO restore connections
    }
}
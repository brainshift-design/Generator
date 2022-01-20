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
        // TODO remember and remove the connections
        uiDeleteNodes(this.nodeIds, this.id);
    }



    undo()
    {
        uiUndeleteNodes(this.nodes);
        // TODO restore connections
    }
}
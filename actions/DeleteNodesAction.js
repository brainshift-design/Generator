class DeleteNodesAction
extends Action
{
    nodeIds     = [];
    connections = [];



    constructor(nodeIds)
    {
        super('Delete nodes');
        
        this.nodeIds = [...nodeIds]; // clone the array
    }



    do()
    {
        // TODO remember and remove the connections
        uiDeleteNodes(this.nodeIds, this.id);
    }



    undo()
    {
        uiUndeleteNodes(this.nodeIds);
        // TODO restore connections
    }
}
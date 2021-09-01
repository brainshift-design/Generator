class DeleteNodesAction
extends Action
{
    nodes       = [];
    connections = [];



    constructor(nodes)
    {
        super('Delete nodes');
        
        this.nodes = [...nodes]; // clone the array
    }



    do()
    {
        // TODO remember and remove the connections
        uiDeleteNodes(this.nodes, this.id);
    }



    undo()
    {
        uiUndeleteNodes(this.nodes);
        // TODO restore connections
    }
}
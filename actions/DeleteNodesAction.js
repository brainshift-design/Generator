class DeleteNodesAction
extends Action
{
    nodes       = [];
    connections = [];



    constructor(nodes)
    {
        super();
        this.nodes = [...nodes]; // clone the array
    }



    perform()
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
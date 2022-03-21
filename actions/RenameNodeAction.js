class RenameNodeAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    oldName;
    newName;



    constructor(nodeId, name)
    {
        super('rename node');

        this.nodeId  = nodeId;
        this.newName = name;
    }



    do()
    {
        this.oldName = this.node.name;
        this.node.setName(this.newName);

        uiSaveNodesAndConns([nodeId]);
    }



    undo()
    {
        this.node.setName(this.oldName);

        uiSaveNodesAndConns([nodeId]);
    }



    redo()
    {
        this.node.setName(this.newName);
        
        uiSaveNodesAndConns([nodeId]);
    }
}
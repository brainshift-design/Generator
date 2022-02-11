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
        this.oldName = this.node.idName;
        this.node.setName(this.newName);
    }



    undo()
    {
        this.node.setName(this.oldName);
    }



    redo()
    {
        this.node.setName(this.newName);
    }
}
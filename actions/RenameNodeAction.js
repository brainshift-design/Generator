class RenameNodeAction
extends Action
{
    nodeId;
    get node() { return graph.nodes.find(n => n.id == this.nodeId) } 

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
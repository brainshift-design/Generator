class RenameNodeAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    oldName;
    newName;



    constructor(nodeId, name)
    {
        super('RENAME ' + this.nodeId + ' to \'' + this.newName + '\'');

        this.nodeId  = nodeId;
        this.newName = name;
    }



    do()
    {
        this.oldName = this.node.name;
        this.node.setName(this.newName);

        uiSaveNodes([nodeId]);
    }



    undo()
    {
        this.node.setName(this.oldName);

        uiSaveNodes([nodeId]);
    }



    redo()
    {
        this.node.setName(this.newName);
        
        uiSaveNodes([nodeId]);
    }
}
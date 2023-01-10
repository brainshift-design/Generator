class RenameNodeAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    oldName;
    newName;



    constructor(nodeId, newName)
    {
        super('RENAME ' + nodeId + ' to \'' + newName + '\'');

        this.nodeId  = nodeId;
        this.newName = newName;
    }



    do(updateNodes)
    {
        this.oldName = this.node.name;
        this.node.setName(this.newName);

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node.setName(this.oldName);
        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }



    redo(updateNodes)
    {
        this.node.setName(this.newName);
        this.node.updateNode();
        
        uiSaveNodes([this.nodeId]);
    }
}
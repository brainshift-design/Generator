class RenameNodeAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    oldName;
    newName;



    constructor(nodeId, newName)
    {
        super(
             RENAME_ACTION,
            'RENAME \'' + nodeId + '\' to \'' + newName + '\'');

        this.affectsConnections = false;

        this.nodeId  = nodeId;
        this.newName = newName;
    }



    do(updateNodes)
    {
        this.oldName = this.node.name;

        this.node.setName(this.newName, {updateNodes: updateNodes});
        this.node.renamed = true;

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node.setName(this.oldName, {updateNodes: updateNodes});
        this.node.updateNode();

        uiSaveNodes([this.nodeId]);
    }



    redo(updateNodes)
    {
        this.node.setName(this.newName, {updateNodes: updateNodes});
        this.node.updateNode();
        
        uiSaveNodes([this.nodeId]);
    }
}
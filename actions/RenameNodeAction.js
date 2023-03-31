class RenameNodeAction
extends Action
{
    nodeId;
    get node() { return this.graph.nodeFromId(this.nodeId) } 

    oldName;
    newName;



    constructor(graph, nodeId, newName)
    {
        super(
            graph,
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

        uiSaveNodes(this.graph, [this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node.setName(this.oldName, {updateNodes: updateNodes});
        this.node.updateNode();

        uiSaveNodes(this.graph, [this.nodeId]);
    }



    redo(updateNodes)
    {
        this.node.setName(this.newName, {updateNodes: updateNodes});
        this.node.updateNode();
        
        uiSaveNodes(this.graph, [this.nodeId]);
    }
}
class SetListDividerAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    oldDivider;
    newDivider;



    constructor(nodeId, oldDivider, newDivider)
    {
        super(
            SET_LIST_DIVIDER_ACTION,
           'SET ITEMS DIVIDER ' + nodeId + ' to \'' + newDivider + '\'');

        this.affectsConnections = false;

        this.nodeId     = nodeId;

        this.oldDivider = oldDivider;
        this.newDivider = newDivider;
    }



    do(updateNodes)
    {
        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        this.node.divider = this.oldDivider;

        for (const param of this.node.params)
            param.divider = this.node.divider;

        this.node.updateParamControls();
        this.node.updateSeparator();

        uiSaveNodes([this.nodeId]);
    }



    redo(updateNodes)
    {
        this.node.divider = this.newDivider;

        for (const param of this.node.params)
            param.divider = this.node.divider;

        this.node.updateParamControls();
        this.node.updateSeparator();

        uiSaveNodes([this.nodeId]);
    }
}
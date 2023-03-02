class SelectNodesAction
extends Action
{
    selectedIds     = [];
    prevSelectedIds = [];



    constructor(selectedIds, prevSelectedIds)
    {
        super(
            SELECT_ACTION,
              'SELECT ' + selectedIds.length 
            + ' ' + countString('node', selectedIds.length));

        this.affectsConnections = false;

        this.selectedIds        = [...selectedIds];
        this.prevSelectedIds    = [...prevSelectedIds];
    }



    do(updateNodes)
    {
        // this happens in the UI
        updateComments(this.prevSelectedIds);
    }



    undo(updateNodes)
    {
        graphView.selectByIds(this.prevSelectedIds);
        updateComments(this.selectedIds);
    }



    redo(updateNodes)
    {
        graphView.selectByIds(this.selectedIds);

        updateComments(this.selectedIds);
        updateComments(this.prevSelectedIds);
    }
}



function updateComments(nodeIds)
{
    nodeIds
        .map(id => nodeFromId(id))
        .filter(n => n.type == COMMENT)
        .forEach(n => n.updateNode());
}
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
            + ' ' + countString(selectedIds.length, 'node'));

        this.affectsConnections = false;
        this.selfUpdate         = true;

        this.selectedIds        = [...selectedIds];
        this.prevSelectedIds    = [...prevSelectedIds];
    }



    do(updateNodes)
    {
        // this happens in the UI

        updateComments([
            ...this.selectedIds,
            ...this.prevSelectedIds]);
    }



    undo(updateNodes)
    {
        graphView.selectByIds(this.prevSelectedIds);

        updateComments([
            ...this.selectedIds,
            ...this.prevSelectedIds]);
    }



    redo(updateNodes)
    {
        graphView.selectByIds(this.selectedIds);

        updateComments([
            ...this.selectedIds,
            ...this.prevSelectedIds]);
    }
}



function updateComments(nodeIds)
{
    nodeIds
        .map(id => nodeFromId(id))
        .filter(n => n && n.type == COMMENT)
        .forEach(n => n.updateNode());
}
class SelectNodesAction
extends Action
{
    selectedIds     = [];
    prevSelectedIds = [];



    constructor(selectedIds, prevSelectedIds)
    {
        super(
              'SELECT ' + selectedIds.length 
            + ' ' + countString('node', selectedIds.length));

        this.affectsConnections = false;

        this.selectedIds        = [...selectedIds];
        this.prevSelectedIds    = [...prevSelectedIds];
    }



    do(updateNodes)
    {
        // this happens in the UI
    }



    undo(updateNodes)
    {
        graphView.selectByIds(this.prevSelectedIds);
    }



    redo(updateNodes)
    {
        graphView.selectByIds(this.selectedIds);
    }
}
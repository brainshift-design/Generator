class SelectNodesAction
extends Action
{
    selectedIds     = [];
    prevSelectedIds = [];



    constructor(selectedIds, prevSelectedIds)
    {
        super(
              'SELECT ' + selectedIds.length 
            + ' ' + countToString(selectedIds, 'node'));

        this.selectedIds     = [...selectedIds];
        this.prevSelectedIds = [...prevSelectedIds];
    }



    do()
    {
        // this happens in the UI
    }



    undo()
    {
        graphView.selectByIds(this.prevSelectedIds);
    }



    redo()
    {
        graphView.selectByIds(this.selectedIds);
    }
}
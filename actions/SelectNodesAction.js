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
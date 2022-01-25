class SelectNodesAction
extends Action
{
    selectedIds     = [];
    prevSelectedIds = [];



    constructor(selectedIds, prevSelectedIds)
    {
        super(
              'select ' + selectedIds.length 
            + ' node' + (selectedIds.length == 1 ? '' : 's') + ', '
            + prevSelectedIds.length + ' selected before');

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
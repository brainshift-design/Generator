class SelectNodesAction
extends Action
{
    selectedIds     = [];
    prevSelectedIds = [];



    constructor(selectedIds, prevSelectedIds)
    {
        super('select ' + selectedIds.length + ' node' + (selectedIds.length == 1 ? '' : 's'));

        this.selectedIds     = [...selectedIds];
        this.prevSelectedIds = [...prevSelectedIds];
    }



    do()
    {
        // this happens in the UI
    }



    undo()
    {
        //console.log('select undo prevSelectedIds');
        //console.log(this.prevSelectedIds);
        graphView.select(this.prevSelectedIds);
        //console.log(graphView.selected);
    }



    redo()
    {
        graphView.select(this.selectedIds);
        //console.log(graphView.selected);
    }
}
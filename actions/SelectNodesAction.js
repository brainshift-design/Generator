class SelectNodesAction
extends Action
{
    selectedIds     = [];
    prevSelectedIds = [];



    constructor(selectedIds, prevSelectedIds)
    {
        super('Select Nodes');

        this.selectedIds     = [...selectedIds];
        this.prevSelectedIds = [...prevSelectedIds];
    }



    do()
    {
        // this happens in the UI
    }



    undo()
    {
        console.log('select undo prevSelectedIds');
        console.log(this.prevSelectedIds);
        graphView.selectFromIds(this.prevSelectedIds);
        console.log(graphView.selected);
    }



    redo()
    {
        graphView.selectFromIds(this.selectedIds);
        console.log(graphView.selected);
    }
}
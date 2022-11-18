class ToggleDisableNodesAction
extends Action
{
    selectedIds = [];



    constructor(selectedIds)
    {
        super(
              'TOGGLE DISABLE ' + selectedIds.length 
            + ' ' + countString('node', selectedIds.length));

        this.selectedIds = [...selectedIds];
    }



    do()
    {
        uiToggleDisableNodes(this.selectedIds.map(id => nodeFromId(id)));
    }



    undo()
    {
        this.do();
    }
}
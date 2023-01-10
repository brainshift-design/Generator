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



    do(updateNodes)
    {
        const nodes = this.selectedIds.map(id => nodeFromId(id));

        uiToggleDisableNodes(nodes);
        uiSaveNodes(nodes.map(n => n.id));

        pushUnique(updateNodes, nodes);
    }



    undo(updateNodes)
    {
        this.do(updateNodes);
    }
}
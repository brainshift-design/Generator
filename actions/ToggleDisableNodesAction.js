class ToggleDisableNodesAction
extends Action
{
    selectedIds = [];



    constructor(selectedIds)
    {
        super(
            TOGGLE_DISABLE_ACTION,
              'TOGGLE DISABLE ' + selectedIds.length 
            + ' ' + countString('node', selectedIds.length));

        this.selectedIds = [...selectedIds];
    }



    do(updateNodes)
    {
        const nodes = this.selectedIds.map(id => graph.nodeFromId(id));

        uiToggleDisableNodes(nodes);
        uiSaveNodes(graph, nodes.map(n => n.id));

        pushUnique(updateNodes, nodes);
    }



    undo(updateNodes)
    {
        this.do(updateNodes);
    }
}
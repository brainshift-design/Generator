class ToggleDisableNodesAction
extends Action
{
    selectedIds = [];



    constructor(graph, selectedIds)
    {
        super(
            graph,
            TOGGLE_DISABLE_ACTION,
              'TOGGLE DISABLE ' + selectedIds.length 
            + ' ' + countString('node', selectedIds.length));

        this.selectedIds = [...selectedIds];
    }



    do(updateNodes)
    {
        const nodes = this.selectedIds.map(id => this.graph.nodeFromId(id));

        uiToggleDisableNodes(nodes);
        uiSaveNodes(this.graph, nodes.map(n => n.id));

        pushUnique(updateNodes, nodes);
    }



    undo(updateNodes)
    {
        this.do(updateNodes);
    }
}
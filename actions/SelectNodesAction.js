class SelectNodesAction
extends Action
{
    selectedIds     = [];
    prevSelectedIds = [];



    constructor(graph, selectedIds, prevSelectedIds)
    {
        super(
            graph,
            SELECT_ACTION,
              'SELECT ' + selectedIds.length 
            + ' ' + countString('node', selectedIds.length));

        this.affectsConnections = false;

        this.selectedIds        = [...selectedIds];
        this.prevSelectedIds    = [...prevSelectedIds];
    }



    do(updateNodes)
    {
        // this happens in the UI
        updateComments(this.graph, this.prevSelectedIds);
    }



    undo(updateNodes)
    {
        this.graph.view.selectByIds(this.prevSelectedIds);
        updateComments(this.graph, this.selectedIds);
    }



    redo(updateNodes)
    {
        this.graph.view.selectByIds(this.selectedIds);

        updateComments(this.graph, this.selectedIds);
        updateComments(this.graph, this.prevSelectedIds);
    }
}



function updateComments(graph, nodeIds)
{
    nodeIds
        .map(id => graph.nodeFromId(id))
        .filter(n => n.type == COMMENT)
        .forEach(n => n.updateNode());
}
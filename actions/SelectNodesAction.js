class SelectNodesAction
extends Action
{
    selectedIds     = [];
    prevSelectedIds = [];



    constructor(selectedIds, prevSelectedIds)
    {
        super(
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
        updateComments(graph, this.prevSelectedIds);
    }



    undo(updateNodes)
    {
        graphView.selectByIds(this.prevSelectedIds);
        updateComments(graph, this.selectedIds);
    }



    redo(updateNodes)
    {
        graphView.selectByIds(this.selectedIds);

        updateComments(graph, this.selectedIds);
        updateComments(graph, this.prevSelectedIds);
    }
}



function updateComments(graph, nodeIds)
{
    nodeIds
        .map(id => graph.nodeFromId(id))
        .filter(n => n.type == COMMENT)
        .forEach(n => n.updateNode());
}
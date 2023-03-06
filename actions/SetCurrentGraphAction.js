class SetCurrentGraphAction
extends Action
{
    graph;
    oldGraph;



    constructor(graph)
    {
        const graphName =
            graph.parentNodeGroup
            ? (settings.showNodeId ? graph.parentNodeGroup.id : graph.parentNodeGroup.name)
            : '';

        super(
            graph,
            SET_CURRENT_GRAPH_ACTION,
            'SET CURRENT GRAPH TO \'' + graphName + '\'');

        this.affectsConnections = false;

        this.oldGraph = currentGraph;
    }



    do(updateNodes)
    {
        setCurrentGraph(this.graph);
    }



    undo(updateNodes)
    {
        setCurrentGraph(this.oldGraph);
    }
}
class MakeActiveNodesAction
extends Action
{
    newActiveNodeIds = [];

    oldActiveNodeIds = [];



    constructor(graph, activeNodeIds)
    {
        super(
            graph,
            MAKE_ACTIVE_ACTION, 
            'MAKE ACTIVE ' + nodeIdArrayToString(activeNodeIds));

        this.newActiveNodeIds = [...activeNodeIds];
        this.affectsConnections = false;
    }



    do(updateNodes)
    {
        this.oldActiveNodeIds = [];

        this.newActiveNodeIds.forEach(id =>
            pushUnique(
                this.oldActiveNodeIds, 
                this.graph.getActiveNodesFromNodeId(id).map(n => n.id))); 

        uiDeleteObjectsAndStyles(this.oldActiveNodeIds, false);

        const newActiveNodes = this.newActiveNodeIds.map(id => this.graph.nodeFromId(id));

        uiMakeNodesActive(newActiveNodes);
        pushUnique(updateNodes, newActiveNodes);

        uiSaveNodes(this.graph, filterUnique([...this.newActiveNodeIds, ...this.oldActiveNodeIds]));
    }



    undo(updateNodes)
    {
        for (const id of this.newActiveNodeIds)
            if (!this.oldActiveNodeIds.includes(id))
                uiMakeNodePassive(this.graph.nodeFromId(id));

        for (const id of this.oldActiveNodeIds)
            uiMakeNodeActive(this.graph.nodeFromId(id));

        pushUnique(updateNodes, this.oldActiveNodeIds.map(id => this.graph.nodeFromId(id)));

        uiSaveNodes(this.graph, filterUnique([...this.newActiveNodeIds, ...this.oldActiveNodeIds]));
    }
}
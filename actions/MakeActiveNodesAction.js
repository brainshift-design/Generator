class MakeActiveNodesAction
extends Action
{
    newActiveNodeIds = [];

    oldActiveNodeIds = [];



    constructor(activeNodeIds)
    {
        super(
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
                graph.getActiveNodesFromNodeId(id).map(n => n.id))); 

        uiDeleteObjectsAndStyles(this.oldActiveNodeIds, false);

        const newActiveNodes = this.newActiveNodeIds.map(id => graph.nodeFromId(id));

        uiMakeNodesActive(newActiveNodes);
        pushUnique(updateNodes, newActiveNodes);

        uiSaveNodes(graph, filterUnique([...this.newActiveNodeIds, ...this.oldActiveNodeIds]));
    }



    undo(updateNodes)
    {
        for (const id of this.newActiveNodeIds)
            if (!this.oldActiveNodeIds.includes(id))
                uiMakeNodePassive(graph.nodeFromId(id));

        for (const id of this.oldActiveNodeIds)
            uiMakeNodeActive(graph.nodeFromId(id));

        pushUnique(updateNodes, this.oldActiveNodeIds.map(id => graph.nodeFromId(id)));

        uiSaveNodes(graph, filterUnique([...this.newActiveNodeIds, ...this.oldActiveNodeIds]));
    }
}
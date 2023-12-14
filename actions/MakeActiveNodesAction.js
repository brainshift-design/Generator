class MakeActiveNodesAction
extends Action
{
    shiftKey;


    newActiveNodeIds = [];
    oldActiveNodeIds = [];



    constructor(activeNodeIds, shiftKey)
    {
        super(
            MAKE_ACTIVE_ACTION, 
            'MAKE ACTIVE ' + nodeIdArrayToString(activeNodeIds));

        this.shiftKey           = shiftKey;
        
        this.newActiveNodeIds   = [...activeNodeIds];
        this.affectsConnections = false;
    }



    do(updateNodes)
    {
        this.oldActiveNodeIds = 
            graph.currentPage.nodes
                .filter(n => n.active)
                .map(n => n.nodeId);

                
        const newActiveNodes = this.newActiveNodeIds.map(id => nodeFromId(id));

        uiMakeNodesActive(newActiveNodes, this.shiftKey);
        pushUnique(updateNodes, newActiveNodes);
        
        uiSaveNodes(filterUnique([...this.newActiveNodeIds, ...this.oldActiveNodeIds]));
    }



    undo(updateNodes)
    {
        for (const id of this.newActiveNodeIds)
            if (!this.oldActiveNodeIds.includes(id))
                uiMakeNodePassive(nodeFromId(id));

        for (const id of this.oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        pushUnique(updateNodes, this.oldActiveNodeIds.map(id => nodeFromId(id)));

        uiSaveNodes(filterUnique([...this.newActiveNodeIds, ...this.oldActiveNodeIds]));
    }
}
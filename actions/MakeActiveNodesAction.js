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
                getActiveNodesFromNodeId(id).map(n => n.id))); 

        uiDeleteObjectsAndStyles(this.oldActiveNodeIds, false);

        const newActiveNodes = this.newActiveNodeIds.map(id => nodeFromId(id));

        uiMakeNodesActive(newActiveNodes);
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
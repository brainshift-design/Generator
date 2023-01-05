class MakeActiveNodeAction
extends Action
{
    activeId;

    oldActiveNodeIds = [];



    constructor(activeId)
    {
        super('MAKE ACTIVE ' + activeId);

        this.activeId = activeId;
    }



    do(updateNodes)
    {
        this.oldActiveNodeIds = [...getActiveNodesFromNodeId(this.activeId).map(n => n.id)]; 
        uiDeleteObjects(this.oldActiveNodeIds);

        const node = nodeFromId(this.activeId);

        uiMakeNodeActive(node);
        pushUnique(updateNodes, node);

        uiSaveNodes(filterUnique([this.activeId, ...this.oldActiveNodeIds]));
    }



    undo(updateNodes)
    {
        if (!this.oldActiveNodeIds.includes(this.activeId));
            uiMakeNodePassive(nodeFromId(this.activeId));

        for (const id of this.oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        pushUnique(updateNodes, this.oldActiveNodeIds.map(id => nodeFromId(id)));

        uiSaveNodes(filterUnique([this.activeId, ...this.oldActiveNodeIds]));
    }
}
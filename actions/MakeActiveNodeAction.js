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



    do()
    {
        this.oldActiveNodeIds = [...getActiveNodesFromNodeId(this.activeId).map(n => n.id)]; 
        uiDeleteObjects(this.oldActiveNodeIds);

        uiMakeNodeActive(nodeFromId(this.activeId));

        uiSaveNodes(filterUnique([this.activeId, ...this.oldActiveNodeIds]));
    }



    undo()
    {
        if (!this.oldActiveNodeIds.includes(this.activeId));
            uiMakeNodePassive(nodeFromId(this.activeId));

        for (const id of this.oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        uiSaveNodes(filterUnique([this.activeId, ...this.oldActiveNodeIds]));
    }
}
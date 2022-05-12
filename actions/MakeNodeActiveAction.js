class MakeNodeActiveAction
extends Action
{
    activeId;

    oldActiveNodeIds = [];



    constructor(activeId)
    {
        super(
             'MAKE ACTIVE ' + activeId);// + ', '
            //+ oldActiveIds.length + ' active before');

        this.activeId = activeId;
    }



    do()
    {
        this.oldActiveNodeIds = [...getActiveNodesInTreeFromNodeId(this.activeId).map(n => n.id)]; 

        uiMakeNodeActive(nodeFromId(this.activeId));

        uiSaveNodes([this.activeId, ...this.oldActiveNodeIds]);
    }



    undo()
    {
        if (!this.oldActiveNodeIds.includes(this.activeId));
            uiMakeNodePassive(nodeFromId(this.activeId));

        for (const id of this.oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        uiSaveNodes([this.activeId, ...this.oldActiveNodeIds]);
    }
}
class MakeNodeActiveAction
extends Action
{
    activeId;

    oldActiveIds = [];



    constructor(activeId)
    {
        const oldActiveIds = [...getActiveNodesInTreeFromNodeId(activeId).map(n => n.id)]; 

        super(
             'MAKE ACTIVE ' + activeId);// + ', '
            //+ oldActiveIds.length + ' active before');

        this.activeId     = activeId;
        this.oldActiveIds = [...oldActiveIds];
    }



    do()
    {
        uiMakeNodeActive(nodeFromId(this.activeId));
    }



    undo()
    {
        if (!this.oldActiveIds.includes(this.activeId));
            uiMakeNodePassive(nodeFromId(this.activeId));

        for (const id of this.oldActiveIds)
            uiMakeNodeActive(nodeFromId(id));
    }
}
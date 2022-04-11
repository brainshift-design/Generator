class MakeNodeActiveAction
extends Action
{
    activeId;

    oldActiveIds = [];



    constructor(activeId)
    {
        super(
             'make ' + activeId + ' active');//, '
            //+ oldActiveId + ' active before');

        this.activeId     = activeId;
        this.oldActiveIds = [...getActiveNodesInTreeFrom(nodeFromId(activeId)).map(n => n.id)];
    }



    do()
    {
        uiMakeNodeActive(nodeFromId(this.activeId));
    }



    undo()
    {
        for (const id of this.oldActiveIds)
        {
            console.log(id);
            uiMakeNodeActive(nodeFromId(id));
        }
    }
}
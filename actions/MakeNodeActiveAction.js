class MakeNodeActiveAction
extends Action
{
    activeId;
    oldActiveId;



    constructor(activeId)
    {
        const oldActiveId = getActiveNodeInTreeFrom(nodeFromId(activeId)).id;

        super(
             'make ' + activeId + ' active');//, '
            //+ oldActiveId + ' active before');

        this.activeId    = activeId;
        this.oldActiveId = oldActiveId;
    }



    do()
    {
        uiMakeNodeActive(nodeFromId(this.activeId));
    }



    undo()
    {
        uiMakeNodeActive(nodeFromId(this.oldActiveId));
    }
}
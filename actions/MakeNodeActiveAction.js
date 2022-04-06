class MakeNodeActiveAction
extends Action
{
    activeId;
    oldActiveId;



    constructor(activeId)
    {
        const oldActiveId = getActiveNodeInTreeFrom(graph.nodes.find(n => n.id == activeId)).id;

        super(
             'make ' + activeId + ' active, '
            + oldActiveId + ' active before');

        this.activeId    = activeId;
        this.oldActiveId = oldActiveId;
    }



    do()
    {
        uiMakeNodeActive(graph.nodes.find(n => n.id == this.activeId));
    }



    undo()
    {
        uiMakeNodeActive(graph.nodes.find(n => n.id == this.oldActiveId));
    }
}
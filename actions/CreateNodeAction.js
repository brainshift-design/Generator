class CreateNodeAction
extends Action
{
    opType;
    createdNodeId;

    prevSelectedIds = []; // currently selected nodes that are deselected as a result of creation



    constructor(opType)
    {
        super('create node \'' + opType + '\'');
        
        this.opType = opType;
    }



    do()
    {
        this.prevSelectedIds = graphView.selected.map(n => n.id);
        this.createdNodeId   = uiCreateNode(this.opType).id;
    }



    undo()
    {
        uiDeleteNodes([this.createdNodeId]);
        graphView.select(this.prevSelectedIds);
    }



    redo()
    {
        uiCreateNode(this.opType, this.createdNodeId);
    }
}
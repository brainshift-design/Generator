class CreateNodeAction
extends Action
{
    opType;
    createdNodeId;    

    prevSelectedIds = []; // currently selected nodes that are deselected as a result of creation



    constructor(opType)
    {
        super('Create Node');
        
        this.opType = opType;
    }



    do()
    {
        this.prevSelectedIds = graphView.getSelectedIds();
        this.createdNodeId   = uiCreateNode(this.opType).id;
    }



    undo()
    {
        uiDeleteNodes([this.createdNodeId]);
        UOperator.nextId--;

        graphView.selectFromIds(this.prevSelectedIds);
    }



    redo()
    {
        uiCreateNode(this.opType, this.createdNodeId);
    }
}
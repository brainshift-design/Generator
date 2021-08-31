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
        this.prevSelectedIds = graphView.selectedIds();
        this.createdNodeId   = uiCreateNode(this.opType).id;
    }



    undo()
    {
        uiDeleteNodes([this.createdNodeId]);
        //UOperator.nextId--;

        console.log("undo prevSelectedIds = " + this.prevSelectedIds);
        graphView.selectFromIds(this.prevSelectedIds);
    }



    redo()
    {
        uiCreateNode(this.opType, this.createdNodeId);
    }
}
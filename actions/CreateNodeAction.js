class CreateNodeAction
extends Action
{
    opType;
    createdNodeId;

    prevSelectedIds = []; // currently selected nodes that are deselected as a result of creation

    creatingButton;
    


    constructor(opType, creatingButton)
    {
        super('create node \'' + opType + '\'');
        
        this.opType         = opType;
        this.creatingButton = creatingButton;
    }



    do()
    {
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);

        const node = uiCreateNode(this.opType, this.creatingButton);

        this.createdNodeId = node.id;

        //node.updateNode();
        
        node.pushUpdate();

        graphView.updateNodeTransform(node);
        setTimeout(() => graphView.updateScrollWithBounds());
    }



    undo()
    {
        uiDeleteNodes([this.createdNodeId]);
        graphView.selectByIds(this.prevSelectedIds);
    }



    redo()
    {
        const node = uiCreateNode(this.opType, this.creatingButton, this.createdNodeId);

        graphView.updateNodeTransform(node);
        setTimeout(() => graphView.updateScrollWithBounds());

        node.pushUpdate();
    }
}
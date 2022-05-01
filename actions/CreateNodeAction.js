class CreateNodeAction
extends Action
{
    nodeType;
    createdNodeId;

    prevSelectedIds = []; // currently selected nodes that are deselected as a result of creation

    creatingButton;
    


    constructor(nodeType, creatingButton)
    {
        super('create node \'' + nodeType + '\'');
        
        this.nodeType         = nodeType;
        this.creatingButton = creatingButton;
    }



    do()
    {
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);

        const node = uiCreateNode(this.nodeType, this.creatingButton);
        this.createdNodeId = node.id;

        graphView.updateNodeTransform(node);
        setTimeout(() => graphView.updateScrollWithBounds());
        
        uiMakeNodeActive(node);
        pushUpdate([node]);
    }



    undo()
    {
        uiDeleteNodes([this.createdNodeId]);

        graphView.selectByIds(this.prevSelectedIds);
    }



    redo()
    {
        const node = uiCreateNode(this.nodeType, this.creatingButton, this.createdNodeId);

        graphView.updateNodeTransform(node);
        setTimeout(() => graphView.updateScrollWithBounds());

        uiMakeNodeActive(node);
        pushUpdate([node]);
    }
}
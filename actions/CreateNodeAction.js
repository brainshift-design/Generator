class CreateNodeAction
extends Action
{
    nodeType;
    createdNodeId;

    options = {};

    prevSelectedIds = []; // currently selected nodes that are deselected as a result of creation

    creatingButton;
    


    constructor(nodeType, creatingButton, options = {})
    {
        super('CREATE \'' + nodeType + '\'');
        
        this.nodeType       = nodeType;
        this.creatingButton = creatingButton;

        this.options        = options;
    }



    do()
    {
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);

        const node = uiCreateNode(
            this.nodeType, 
            this.creatingButton, 
            -1, 
            true, 
            this.options);

        this.createdNodeId = node.id;

        graphView.updateNodeTransform(node);
        setTimeout(() => graphView.updateScrollWithBounds());
        
        uiMakeNodeActive(node);
        uiSaveNodes([node.id]);
    }



    undo()
    {
        uiDeleteNodes([this.createdNodeId]);

        graphView.selectByIds(this.prevSelectedIds);
    }



    redo()
    {
        const node = uiCreateNode(
            this.nodeType, 
            this.creatingButton, 
            this.createdNodeId, 
            true, 
            this.options);

        graphView.updateNodeTransform(node);
        setTimeout(() => graphView.updateScrollWithBounds());

        uiMakeNodeActive(node);
        uiSaveNodes([node.id]);
    }
}
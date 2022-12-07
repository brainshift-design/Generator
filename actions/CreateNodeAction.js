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

        if (!this.options.insert)
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
        const node = uiCreateNode(
            this.nodeType, 
            this.creatingButton, 
            this.createdNodeId, 
            true, 
            this.options);

        if (!this.options.insert)
            uiMakeNodeActive(node);

        pushUpdate([node]);
    }
}
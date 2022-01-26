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
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);

        const node = uiCreateNode(this.opType);
        this.createdNodeId = node.id;

        node.pushUpdate();
    }



    undo()
    {
        uiDeleteNodes([this.createdNodeId]);
        graphView.selectByIds(this.prevSelectedIds);
    }



    redo()
    {
        uiCreateNode(this.opType, this.createdNodeId);

        graph.nodes.find(n => n.id == this.createdNodeId).pushUpdate();
    }
}
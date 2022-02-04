class PasteNodesAction
extends Action
{
    copiedNodesJson;

    pasteOutsideConnections;

    pastedNodeIds = [];
    pastedNodePos = [];

    prevSelectedNodeIds = [];


    constructor(copiedNodesJson, pasteOutsideConnections)
    {
        const data = JSON.parse(copiedNodesJson);

        super('paste ' + data.nodes.length + ' node' + (data.nodes.length == 1 ? '' : 's'));

        this.copiedNodesJson         = copiedNodesJson;
        this.prevSelectedNodeIds     = graphView.selectedNodes.map(n => n.id);
        this.pasteOutsideConnections = pasteOutsideConnections;
    }



    do()
    {
        const nodes = uiPasteNodes(this.copiedNodesJson, this.pasteOutsideConnections);

        this.pastedNodeIds = nodes.map(n => n.id);
        this.pastedNodePos = nodes.map(n => { return point(n.div.offsetLeft, n.div.offsetTop); });

        updateTerminalsAfterNodes(nodes);

        graphView.updateNodeTransforms(nodes);
    }



    undo()
    {
        uiDeleteNodes(this.pastedNodeIds);
        
        Operator.nextId -= this.pastedNodeIds.length;

        pasteOffset[0] -= pasteOffsetDelta[0];
        pasteOffset[1] -= pasteOffsetDelta[1];

        graphView.selectedNodes = graph.nodes.filter(n => this.prevSelectedNodeIds.includes(n.id));
    }



    redo()
    {
        const nodes = uiPasteNodes(this.copiedNodesJson, this.pasteOutsideConnections);
        
        this.pastedNodeIds = nodes.map(n => n.id);

        for (let i = 0; i < nodes.length; i++)
        {
            setNodePosition(
                nodes[i], 
                this.pastedNodePos[i].x,
                this.pastedNodePos[i].y);
        }

        updateTerminalsAfterNodes(nodes);
    }
}
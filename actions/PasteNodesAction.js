class PasteNodesAction
extends Action
{
    copiedNodesJson;

    pastedNodeIds = [];
    pastedNodePos = [];

    prevSelectedNodeIds = [];


    constructor(copiedNodesJson)
    {
        const data = JSON.parse(copiedNodesJson);

        super('paste ' + data.nodes.length + ' node' + (data.nodes.length == 1 ? '' : 's'));

        this.copiedNodesJson     = copiedNodesJson;
        this.prevSelectedNodeIds = graphView.selected.map(n => n.id);
    }



    do()
    {
        const nodes = uiPasteNodes(this.copiedNodesJson);

        this.pastedNodeIds = nodes.map(n => n.id);
        this.pastedNodePos = nodes.map(n => { return { x: n.div.offsetLeft, y: n.div.offsetTop }});
    }



    undo()
    {
        uiDeleteNodes(this.pastedNodeIds);
        
        Operator.nextId -= this.pastedNodeIds.length;

        pasteOffset[0] -= pasteOffsetDelta[0];
        pasteOffset[1] -= pasteOffsetDelta[1];

        graphView.selected = graph.nodes.filter(n => this.prevSelectedNodeIds.includes(n.id));
    }



    redo()
    {
        const nodes = uiPasteNodes(this.copiedNodesJson);
        
        this.pastedNodeIds = nodes.map(n => n.id);

        for (let i = 0; i < nodes.length; i++)
        {
            setNodePosition(
                nodes[i], 
                this.pastedNodePos[i].x,
                this.pastedNodePos[i].y);
        }
    }
}
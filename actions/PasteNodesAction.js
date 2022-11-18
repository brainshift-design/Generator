class PasteNodesAction
extends Action
{
    copiedNodesJson;

    pasteConnected;

    pastedNodeIds = [];
    pastedNodePos = [];

    x;
    y;

    prevSelectedNodeIds = [];

    oldActiveNodeIds = [];



    constructor(copiedNodesJson, pasteConnected, isDuplicate = false, x = Number.NaN, y = Number.NaN)
    {
        const data = JSON.parse(copiedNodesJson);

        super('PASTE ' + data.nodes.length + ' ' + countString('node', data.nodes.length));

        this.copiedNodesJson = copiedNodesJson;
        this.pasteConnected  = pasteConnected;

        this.isDuplicate     = isDuplicate;
        
        this.x               = x;
        this.y               = y;
    }



    do()
    {
        this.prevSelectedNodeIds = graphView.selectedNodes.map(n => n.id);


        this.oldActiveNodeIds = [];

        for (const nodeId of this.prevSelectedNodeIds)
            pushUnique(this.oldActiveNodeIds, getActiveNodesFromNodeId(nodeId).map(n => n.id));


        const nodes = uiPasteNodes(this.copiedNodesJson, this.pasteConnected, this.x, this.y);

        this.pastedNodeIds = nodes.map(n => n.id);
        this.pastedNodePos = nodes.map(n => { return point(n.div.offsetLeft, n.div.offsetTop); });


        updateTerminalsAfterNodes(nodes);
        
        graphView.updateNodeTransforms(nodes);
        graphView.updateScrollWithBounds();

        uiSaveNodes(nodes.map(n => n.id));

        this.notify(nodes, this.isDuplicate, this.pasteConnected);
    }



    undo()
    {
        uiDeleteNodes(this.pastedNodeIds);
        
        pasteOffset[0] -= pasteOffsetDelta[0];
        pasteOffset[1] -= pasteOffsetDelta[1];

        graphView.selectedNodes = graph.nodes.filter(n => this.prevSelectedNodeIds.includes(n.id));


        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
    }



    redo()
    {
        const nodes = uiPasteNodes(this.copiedNodesJson, this.pasteConnected, this.x, this.y);
        
        this.pastedNodeIds = nodes.map(n => n.id);

        for (let i = 0; i < nodes.length; i++)
        {
            setNodePosition(
                nodes[i], 
                this.pastedNodePos[i].x,
                this.pastedNodePos[i].y);
        }

        updateTerminalsAfterNodes(nodes);
        graphView.updateNodeTransforms(nodes);

        uiSaveNodes(nodes.map(n => n.id));
        
        this.notify(nodes, this.isDuplicate, this.pasteConnected);
    }



    notify(nodes, isDuplicate, pasteConnected)
    {
        let action = isDuplicate ? 'Duplicate' : 'Paste';

        if (pasteConnected)
            action += ' connected';

        uiNotify(action + ' ' + nodes.length + ' ' + countString('node', nodes.length), 2500);
    }
}
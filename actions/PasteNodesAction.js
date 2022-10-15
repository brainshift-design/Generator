class PasteNodesAction
extends Action
{
    copiedNodesJson;

    //pasteOutsideConnections;

    pastedNodeIds = [];
    pastedNodePos = [];

    x;
    y;

    prevSelectedNodeIds = [];

    oldActiveNodeIds = [];



    constructor(copiedNodesJson, /*pasteOutsideConnections, */isDuplicate = false, x = Number.NaN, y = Number.NaN)
    {
        const data = JSON.parse(copiedNodesJson);

        super('PASTE ' + data.nodes.length + ' ' + countToString(data.nodes, 'node'));

        this.copiedNodesJson         = copiedNodesJson;
        //this.pasteOutsideConnections = pasteOutsideConnections;

        this.isDuplicate             = isDuplicate;
        
        this.x                       = x;
        this.y                       = y;
    }



    do()
    {
        this.prevSelectedNodeIds = graphView.selectedNodes.map(n => n.id);


        this.oldActiveNodeIds = [];

        for (const nodeId of this.prevSelectedNodeIds)
            pushUnique(this.oldActiveNodeIds, getActiveNodesInTreeFromNodeId(nodeId).map(n => n.id));


        const nodes = uiPasteNodes(this.copiedNodesJson, /*this.pasteOutsideConnections, */this.x, this.y);

        this.pastedNodeIds = nodes.map(n => n.id);
        this.pastedNodePos = nodes.map(n => { return point(n.div.offsetLeft, n.div.offsetTop); });


        updateTerminalsAfterNodes(nodes);
        
        graphView.updateNodeTransforms(nodes);
        graphView.updateScrollWithBounds();

        uiSaveNodes(nodes.map(n => n.id));

        this.notify(nodes, this.isDuplicate);
    }



    undo()
    {
        uiDeleteNodes(this.pastedNodeIds);
        
        pasteOffset[0] -= pasteOffsetDelta[0];
        pasteOffset[1] -= pasteOffsetDelta[1];

        graphView.selectedNodes = graph.nodes.filter(n => this.prevSelectedNodeIds.includes(n.id));


        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        //console.log('oldActiveNodeIds', oldActiveNodeIds);
        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
    }



    redo()
    {
        const nodes = uiPasteNodes(this.copiedNodesJson, /*this.pasteOutsideConnections, */this.x, this.y);
        
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
        
        this.notify(nodes, this.isDuplicate);
    }



    notify(nodes, isDuplicate)
    {
        const action = isDuplicate ? 'Duplicate' : 'Paste';
        uiNotify(action + ' ' + nodes.length + ' node' + (nodes.length == 1 ? '' : 's'), 2500);
    }
}
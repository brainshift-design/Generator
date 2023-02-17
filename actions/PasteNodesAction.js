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

    oldActiveNodeIds    = [];



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



    do(updateNodes)
    {
        this.prevSelectedNodeIds = graphView.selectedNodes.map(n => n.id);


        this.oldActiveNodeIds = [];

        for (const nodeId of this.prevSelectedNodeIds)
            pushUnique(this.oldActiveNodeIds, getActiveNodesFromNodeId(nodeId).map(n => n.id));


        const [nodes, _conns] = uiPasteNodes(this.copiedNodesJson, this.pasteConnected, this.x, this.y, updateNodes);

        pushUnique(this.newConnectionData, _conns);
        

        for (const conn of _conns)
            uiSaveConnection(
                conn.outputNodeId, conn.outputId, conn.outputOrder,
                conn.inputNodeId,  conn.inputId,
                JSON.stringify(conn));


        graphView.updateNodeTransforms(nodes);
        nodes.forEach(n => n.updateNode());


        this.pastedNodeIds = nodes.map(n => n.id);
        this.pastedNodePos = nodes.map(n => point(n.div.offsetLeft, n.div.offsetTop));


        this.notify(nodes, this.isDuplicate, this.pasteConnected);
    }



    undo(updateNodes)
    {
        uiDeleteNodes(this.pastedNodeIds);
        
        pasteOffset.x -= pasteOffsetDelta.x;
        pasteOffset.y -= pasteOffsetDelta.y;

        graphView.selectedNodes = graph.nodes.filter(n => this.prevSelectedNodeIds.includes(n.id));


        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
    }



    notify(nodes, isDuplicate, pasteConnected)
    {
        let action = isDuplicate ? 'Duplicated' : 'Pasted';

        if (pasteConnected)
            action += ' & connected';

        uiNotify(
            action + ' ' + nodes.length + ' ' + countString('node', nodes.length), 
            {delay: 2500});
    }
}
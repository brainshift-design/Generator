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



    constructor(graph, copiedNodesJson, pasteConnected, isDuplicate = false, x = Number.NaN, y = Number.NaN)
    {
        const data = JSON.parse(copiedNodesJson);

        super(
            graph,
            PASTE_ACTION,
            'PASTE ' + data.nodes.length + ' ' + countString('node', data.nodes.length));

        this.copiedNodesJson = copiedNodesJson;
        this.pasteConnected  = pasteConnected;

        this.isDuplicate     = isDuplicate;
        
        this.x               = x;
        this.y               = y;
    }



    do(updateNodes)
    {
        this.prevSelectedNodeIds = this.graph.view.selectedNodes.map(n => n.id);


        this.oldActiveNodeIds = [];

        for (const nodeId of this.prevSelectedNodeIds)
            pushUnique(this.oldActiveNodeIds, this.graph.getActiveNodesFromNodeId(nodeId).map(n => n.id));


        const [nodes, _conns] = uiPasteNodes(this.graph, this.copiedNodesJson, this.pasteConnected, this.x, this.y, updateNodes);

        pushUnique(this.newConnectionData, _conns);


        for (const conn of _conns)
        {
            if (   this.pasteConnected
                ||    nodes.find(n => n.id == conn.outputNodeId)
                   && nodes.find(n => n.id == conn.inputNodeId ))
                uiSaveConnection(
                    conn.outputNodeId, conn.outputId, conn.outputOrder,
                    conn.inputNodeId,  conn.inputId,
                    formatConnJson(
                        '', 
                        TAB,
                        conn.outputNodeId,
                        conn.outputId,
                        conn.outputOrder,
                        conn.inputNodeId,
                        conn.inputId,
                        boolToString(
                            this.graph.nodeFromId(conn.outputNodeId)
                            .outputFromId(conn.outputId)
                            .supportsTypes(LIST_TYPES))));
        }


        this.pastedNodeIds = nodes.map(n => n.id);
        this.pastedNodePos = nodes.map(n => point(n.div.offsetLeft, n.div.offsetTop));


        this.notify(nodes, this.isDuplicate, this.pasteConnected && !isEmpty(_conns));
    }



    undo(updateNodes)
    {
        uiDeleteNodes(this.graph, this.pastedNodeIds);
        
        pasteOffset.x -= pasteOffsetDelta.x;
        pasteOffset.y -= pasteOffsetDelta.y;

        this.graph.view.selectedNodes = this.graph.view.graph.nodes.filter(n => this.prevSelectedNodeIds.includes(n.id));


        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        oldActiveNodeIds.sort((x, y) => (this.graph.nodeFromId(x) === this.graph.nodeFromId(y)) ? 0 : this.graph.nodeFromId(y).isOrFollows(this.graph.nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(this.graph.nodeFromId(id));
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
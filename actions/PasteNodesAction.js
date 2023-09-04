class PasteNodesAction
extends Action
{
    copiedNodesJson;

    pasteConnected;

    isDuplicate;
    isLoading;

    pastedNodeIds = [];
    pastedNodePos = [];

    x;
    y;

    prevSelectedNodeIds = [];

    oldActiveNodeIds    = [];



    constructor(copiedNodesJson, pasteConnected, isDuplicate = false, isLoading = false, x = Number.NaN, y = Number.NaN)
    {
        let nNodes = 0;

        try
        {
            const data = JSON.parse(copiedNodesJson);
            nNodes = data.nodes.length;
        }
        catch {}


        super(
            PASTE_ACTION,
            'PASTE ' + nNodes + ' ' + countString(nNodes, 'node'));

        this.copiedNodesJson = copiedNodesJson;
        this.pasteConnected  = pasteConnected;

        this.isDuplicate     = isDuplicate;
        this.isLoading       = isLoading;

        this.x               = x;
        this.y               = y;
    }



    do(updateNodes)
    {
        this.prevSelectedNodeIds = graphView.selectedNodes.map(n => n.id);


        const [nodes, _conns] = uiPasteNodes(this.copiedNodesJson, true, this.pasteConnected, this.x, this.y, updateNodes);

        pushUnique(this.newConnectionData, _conns);


        const terminals = getTerminalsInNodes(nodes);

        for (const terminal of terminals)
            if (terminal.active) uiMakeNodeActive(terminal);


        for (const conn of _conns)
        {
            if (   this.pasteConnected
                ||    nodes.find(n => n.id == conn.outputNodeId)
                   && nodes.find(n => n.id == conn.inputNodeId ))
            {
                const output = 
                    nodeFromId(conn.outputNodeId)
                    .outputFromId(conn.outputId);

                if (output)
                {
                    uiSaveConnection(
                        conn.outputNodeId, conn.outputId, conn.outputOrder,
                        conn.inputNodeId,  conn.inputId,
                        formatConnJson(
                            '', 
                            HTAB,
                            conn.outputNodeId,
                            conn.outputId,
                            conn.outputOrder,
                            conn.inputNodeId,
                            conn.inputId,
                            boolToString(output.supportsTypes(LIST_TYPES))));
                }
            }
        }


        this.pastedNodeIds = nodes.map(n => n.id);
        this.pastedNodePos = nodes.map(n => point(n.div.offsetLeft, n.div.offsetTop));


        this.notify(
            nodes,
               this.pasteConnected 
            && !isEmpty(_conns), 
            this.isDuplicate, 
            this.isLoading)
    }



    undo(updateNodes)
    {
        uiDeleteNodes(this.pastedNodeIds);
        
        pasteOffset.x -= pasteOffsetDelta.x;
        pasteOffset.y -= pasteOffsetDelta.y;

        graphView.selectedNodes = graph.nodes.filter(n => this.prevSelectedNodeIds.includes(n.id));
    }



    notify(nodes, pasteConnected, isDuplicate, isLoading)
    {
        let action = 
            isDuplicate 
            ? 'Duplicated' 
            : isLoading
            ? 'Loaded'
            : 'Pasted';

        if (pasteConnected)
            action += ' & connected';

        uiNotify(
            action + ' ' + nodes.length + ' ' + countString(nodes.length, 'node'), 
            {delay: 2500});
    }
}
class CreateNodeAction
extends Action
{
    nodeType;
    createdNodeId;

    prevSelectedIds = []; // currently selected nodes that are deselected as a result of creation

    oldActiveNodeId = '';


    autoConnect;

    newConnections  = []; // [{outputNodeId, outputId, inputNodeId, inputId}]


    creatingButton;
    


    constructor(nodeType, creatingButton, autoConnect)
    {
        super('CREATE \'' + nodeType + '\'');
        
        this.nodeType       = nodeType;
        this.creatingButton = creatingButton;

        this.autoConnect    = autoConnect;
    }



    do()
    {
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);


        const node = createNode(this.nodeType, this.creatingButton, this.createdId);
        

        const autoConnect = 
               this.autoConnect
            && this.prevSelectedIds.length > 0
            && canAutoConnectNode(node);

            
        graph.addNode(node, !autoConnect);

        this.createdNodeId = node.id;
        

        if (autoConnect)
        {
            this.oldActiveNodeId = idFromNode(getActiveFromNodeId(this.prevSelectedIds[0]));

            const selNode = nodeFromId(this.prevSelectedIds[0]);
            const inputs  = node.headerInputs.filter(i => i.canConnectFrom(selNode.headerOutputs[0]));
            
            if (inputs.length > 0)
            {
                const conn = createNodeAction_connect(this, selNode.outputs[0], inputs[0]);
                graphView.autoPlaceNewNode(conn.output, conn.input);
            }
        }


        uiMakeNodeActive(node);


        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [node];


        pushUpdate([node]);
    }



    undo()
    {
        for (const _conn of this.newConnections)
        {
            const input = nodeFromId(_conn.inputNodeId).inputFromId(_conn.inputId);

            uiDeleteSavedConn(input.connection);
            uiDisconnect(input);
        }
        
        this.newConnections = [];
            
            
        uiDeleteNodes([this.createdNodeId]);


        if (this.oldActiveNodeId != '')
        {
            const oldInputActiveNode = nodeFromId(this.oldActiveNodeId);
            
            uiMakeNodeActive(oldInputActiveNode);
            pushUpdate([oldInputActiveNode]);

            this.oldActiveNodeId = '';
        }

        
        graphView.selectByIds(this.prevSelectedIds);
    }
}



function createNodeAction_connect(act, output, input)
{
    const conn = uiConnect(output, input);
    uiSaveConn(conn);

    act.newConnections.push(
    {
        outputNodeId: conn.output.node.id,
        outputId:     conn.output.id,
        outputOrder:  conn.outputOrder,
        inputNodeId:  conn.input.node.id,
        inputId:      conn.input.id
    });

    return conn;
}
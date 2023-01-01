class CreateNodeAction
extends Action
{
    nodeType;
    createdNodeId;

    node;


    prevSelectedIds = []; // currently selected nodes that are deselected as a result of creation

    oldInputActiveNodeId = '';


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


        this.node = createNode(this.nodeType, this.creatingButton, this.createdId);
        

        const autoConnect = 
               this.autoConnect
            && this.prevSelectedIds.length > 0
            && canAutoConnectNode(this.node);

            
        graph.addNode(this.node, !autoConnect);

        this.createdNodeId = this.node.id;
        

        if (autoConnect)
        {
            this.oldInputActiveNodeId = idFromNode(getActiveFromNodeId(this.prevSelectedIds[0]));

            const selNode = nodeFromId(this.prevSelectedIds[0]);
            const inputs  = this.node.headerInputs.filter(i => i.canConnectFrom(selNode.headerOutputs[0]));
            
            if (inputs.length > 0)
            {
                const conn = createNodeAction_connect(this, selNode.outputs[0], this.node, inputs[0].id);
                graphView.autoPlaceNewNode(conn.output, conn.input);
            }
        }


        uiMakeNodeActive(this.node);


        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [this.node];


        pushUpdate(this, [this.node]);
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

        createNodeAction_activateOldInput(this);

        
        graphView.selectByIds(this.prevSelectedIds);


        this.newConnections = [];
    }
}



function createNodeAction_connect(act, output, inputNode, inputId, outputOrder = -1)
{
    const conn = uiVariableConnect(
        output.node, output.id,
        inputNode,  inputId,
        outputOrder);
        
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



function createNodeAction_activateOldInput(act)
{
    if (act.oldInputActiveNodeId != '')
    {
        const oldInputActiveNode = nodeFromId(act.oldInputActiveNodeId);
        
        uiMakeNodeActive(oldInputActiveNode);
        pushUpdate(act, [oldInputActiveNode]);

        act.oldInputActiveNodeId = '';
    }
}
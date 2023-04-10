class CreateNodeAction
extends Action
{
    nodeType;
    createdNodeId;

    options;


    node;


    prevSelectedIds      = []; // currently selected nodes that are deselected as a result of creation

    oldInputActiveNodeId = NULL;


    autoConnect;


    creatingButton;
    


    constructor(nodeType, creatingButton, options, autoConnect)
    {
        super(
            CREATE_ACTION, 
            'CREATE \'' + nodeType + '\'');

        this.nodeType       = nodeType;
        this.creatingButton = creatingButton;

        this.options        = options;

        this.autoConnect    = autoConnect;
    }



    do(updateNodes)
    {
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);


        graphView.creatingNodes = true;

        this.node = createNode(this.nodeType, this.creatingButton, this.createdId, this.options);
        

        const autoConnect = 
                this.autoConnect
            && !isEmpty(this.prevSelectedIds)
            &&  canAutoConnectNode(graph, this.node)
            && !!this.options.autoConnect;

            
        graph.addNode(this.node, !autoConnect);

        this.createdNodeId = this.node.id;
        

        if (autoConnect)
        {
            this.oldInputActiveNodeId = idFromNode(graph.getActiveFromNodeId(this.prevSelectedIds[0]));

            const selNode = graph.nodeFromId(this.prevSelectedIds[0]);
            const inputs  = this.node.headerInputs.filter(i => i.canConnectFrom(selNode.headerOutputs[0]));
            
            if (!isEmpty(inputs))
            {
                const conn = createNodeAction_connect(this, selNode.outputs[0], this.node, inputs[0].id);
                graphView.autoPlaceNewNode(conn.output, conn.input);
            }
        }


        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [this.node];

        uiMakeNodeActive(this.node);
        pushUnique(updateNodes, this.node);
    }



    undo(updateNodes)
    {
        uiDeleteNodes(graph, [this.createdNodeId]);

        createNodeAction_activateOldInput(this, updateNodes);
        
        graphView.selectByIds(this.prevSelectedIds);
    }
}



function createNodeAction_connect(act, output, inputNode, inputId, outputOrder = -1)
{
    const conn = uiVariableConnect(
        output.node, output.id,
        inputNode,   inputId,
        outputOrder);
        
    uiSaveConn(conn);

    pushUnique(act.newConnectionData, conn.toDataObject());

    return conn;
}



function createNodeAction_activateOldInput(act, updateNodes)
{
    if (act.oldInputActiveNodeId == NULL)
        return;

    const oldInputActiveNode = act.graph.nodeFromId(act.oldInputActiveNodeId);
    
    uiMakeNodeActive(oldInputActiveNode);
    pushUnique(updateNodes, oldInputActiveNode);

    act.oldInputActiveNodeId = NULL;
}
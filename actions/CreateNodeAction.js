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


        const canAutoConnect =
            canAutoConnectNode(
                this.node, 
                true, 
                   this.options.fromNodeId
                && this.options.fromOutputId
                    ? nodeFromId(this.options.fromNodeId)
                          .outputFromId(this.options.fromOutputId)
                    : null);


        const autoConnect = 
                this.autoConnect
            && (   !isEmpty(this.prevSelectedIds)
                || this.options.fromNodeId)
            && canAutoConnect
            && this.options.autoConnect != undefined
            && this.options.autoConnect;

          
        graph.addNode(
            this.node, 
            !autoConnect, 
            true, 
               this.options
            && this.options.fromSearch === true);

        this.createdNodeId = this.node.id;
        

        const selNodeId = 
            this.options.fromNodeId
                ? this.options.fromNodeId
                : this.prevSelectedIds[0];


        if (autoConnect)
        {
            this.oldInputActiveNodeId = idFromNode(getActiveFromNodeId(selNodeId));

            const selNode = nodeFromId(selNodeId);

            const output =
                this.options.fromOutputId
                    ? selNode.outputFromId(this.options.fromOutputId)
                    : selNode.headerOutputs[0];

            const inputs = this.node.headerInputs.filter(i => i.canConnectFrom(output));
            
            if (!isEmpty(inputs))
            {
                const conn = createNodeAction_connect(this, output, this.node, inputs[0].id);
                graphView.autoPlaceNewNode(conn.output, conn.input);
            }
        }


        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [this.node];

        
        uiMakeNodeActive(this.node);
        
        pushUnique(updateNodes, this.node);

        setTimeout(() => this.node.updateHeaderLabelOffsetX(), 100);
    }



    undo(updateNodes)
    {
        uiDeleteNodes([this.createdNodeId]);

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

    pushUnique(
        act.newConnectionData, 
        conn.toDataObject(), 
        connDataObjectsEqual);

    return conn;
}



function createNodeAction_activateOldInput(act, updateNodes)
{
    if (act.oldInputActiveNodeId == NULL)
        return;

    const oldInputActiveNode = nodeFromId(act.oldInputActiveNodeId);
    
    uiMakeNodeActive(oldInputActiveNode);
    pushUnique(updateNodes, oldInputActiveNode);

    act.oldInputActiveNodeId = NULL;
}
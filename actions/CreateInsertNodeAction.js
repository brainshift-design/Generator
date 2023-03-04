class CreateInsertNodeAction
extends Action
{
    nodeType;
    createdNodeId;

    options;


    prevSelectedIds      = []; // currently selected nodes that are deselected as a result of creation

    oldInputActiveNodeId = NULL;


    prevConnections      = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]


    creatingButton;
    


    constructor(graph, nodeType, creatingButton, options)
    {
        super(
            graph,
            CREATE_INSERT_ACTION, 
            'CREATE / INSERT \'' + nodeType + '\'');
        
        this.nodeType       = nodeType;
        this.creatingButton = creatingButton;

        this.options        = options;
    }



    do(updateNodes)
    {
        this.prevSelectedIds = this.graph.view.selectedNodes.map(n => n.id);

        createInsertNodeAction_savePrevConnections(this);


        this.graph.view.creatingNodes = true;

        const node = createNode(this.nodeType, this.creatingButton, this.createdId, this.options);


        const insert = 
               !isEmpty(this.prevSelectedIds)
            && canAutoConnectNode(this.graph, node);
   
            
        this.graph.addNode(node, !insert);
        
        this.createdNodeId = node.id;


        if (insert)
        {
            const selNode   = this.graph.nodeFromId(this.prevSelectedIds[0]);
            const selOutput = selNode.headerOutputs[0];


            for (let i = selOutput.connectedInputs.length-1; i >= 0; i--)
            {
                const input = selOutput.connectedInputs[i];

                uiDeleteSavedConn(input.connection);
                uiDisconnect(input);
            }


            const inputs = node.headerInputs.filter(i => i.canConnectFrom(selNode.headerOutputs[0]));

            if (!isEmpty(inputs))
            {
                const newConn = createNodeAction_connect(this, selNode.outputs[0], node, inputs[0].id);
                this.graph.view.autoPlaceNewNode(newConn.output, newConn.input);


                for (const _conn of this.prevConnections)
                {
                    const _output    = node.headerOutputs[0];
                    const _inputNode = this.graph.nodeFromId(_conn.inputNodeId);
                    const _input     = _inputNode.inputFromId(_conn.inputId);

                    if (_input.canConnectFrom(_output))
                        createNodeAction_connect(this, _output, _inputNode, _conn.inputId, _conn.outputOrder);
                }
            }
        }

            
        this.graph.view.lastSelectedNodes = this.graph.view.selectedNodes;
        this.graph.view.selectedNodes     = [node];


        if (!getActiveAfterNode(node))
            uiMakeNodeActive(node);


        pushUnique(updateNodes, node);
    }



    undo(updateNodes)
    {
        uiDeleteNodes(this.graph, [this.createdNodeId]);

        createNodeAction_activateOldInput(this, updateNodes);

        this.prevConnections = [];
            
        this.graph.view.selectByIds(this.prevSelectedIds);
    }
}



function createInsertNodeAction_savePrevConnections(act)
{
    if (act.prevSelectedIds.length == 0)
        return;
        
    act.oldInputActiveNodeId = idFromNode(act.graph.getActiveFromNodeId(act.prevSelectedIds[0]));

    const selNode = act.graph.nodeFromId(act.prevSelectedIds[0]);
    const output  = selNode.outputs[0];

    for (const input of output.connectedInputs)
        act.prevConnections.push(input.connection.toDataObject());
}
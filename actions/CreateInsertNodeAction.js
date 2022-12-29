class CreateInsertNodeAction
extends Action
{
    nodeType;
    createdNodeId;

    prevSelectedIds = []; // currently selected nodes that are deselected as a result of creation

    oldInputActiveNodeId = '';


    oldConnections = []; // [{outputNodeId, outputId, inputNodeId, inputId}]
    newConnections = []; // [{outputNodeId, outputId, inputNodeId, inputId}]


    creatingButton;
    


    constructor(nodeType, creatingButton)
    {
        super('CREATE / INSERT \'' + nodeType + '\'');
        
        this.nodeType       = nodeType;
        this.creatingButton = creatingButton;
    }



    do()
    {
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);

        createInsertNodeAction_saveOldConnections(this);


        const node = createNode(this.nodeType, this.creatingButton, this.createdId);


        const insert = 
               this.prevSelectedIds.length > 0
            && canAutoConnectNode(node);
   
            
        graph.addNode(node, !insert);
        
        this.createdNodeId = node.id;


        if (insert)
        {
            const selNode   = nodeFromId(this.prevSelectedIds[0]);
            const selOutput = selNode.headerOutputs[0];


            for (let i = selOutput.connectedInputs.length-1; i >= 0; i--)
            {
                const input = selOutput.connectedInputs[i];

                uiDeleteSavedConn(input.connection);
                uiDisconnect(input);
            }


            const inputs = node.headerInputs.filter(i => i.canConnectFrom(selNode.headerOutputs[0]));

            if (inputs.length > 0)
            {
                const newConn = createNodeAction_connect(this, selNode.outputs[0], node, inputs[0].id);
                graphView.autoPlaceNewNode(newConn.output, newConn.input);


                for (const _conn of this.oldConnections)
                {
                    const _output    = node.headerOutputs[0];
                    const _inputNode = nodeFromId(_conn.inputNodeId);
                    const _input     = _inputNode.inputFromId(_conn.inputId);

                    if (_input.canConnectFrom(_output))
                        createNodeAction_connect(this, _output, _inputNode, _conn.inputId, _conn.outputOrder);
                }
            }
        }

            
        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [node];


        if (!getActiveAfterNode(node))
            uiMakeNodeActive(node);


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


        for (const _conn of this.oldConnections)
        {
            createNodeAction_connect(
                this, 
                nodeFromId(_conn.outputNodeId).outputFromId(_conn.outputId),
                nodeFromId(_conn. inputNodeId). inputFromId(_conn. inputId),
                _conn.outputOrder);
        }


        if (this.oldInputActiveNodeId != '')
            createNodeAction_activateOldInput(this);

            
        graphView.selectByIds(this.prevSelectedIds);


        this.oldConnections = [];
        this.newConnections = [];
    }
}



function createInsertNodeAction_saveOldConnections(act)
{
    if (act.prevSelectedIds.length == 0)
        return;

        
    act.oldInputActiveNodeId = idFromNode(getActiveFromNodeId(act.prevSelectedIds[0]));

    const selNode = nodeFromId(act.prevSelectedIds[0]);
    const output  = selNode.outputs[0];

    for (const input of output.connectedInputs)
    {
        act.oldConnections.push(
        {
            outputNodeId: output.node.id,
            outputId:     output.id,
            outputOrder:  input.connection.outputOrder,
            inputNodeId:  input.node.id,
            inputId:      input.id
        });
    }
}
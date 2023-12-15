class CreateInsertNodeAction
extends Action
{
    nodeType;
    createdNodeId;

    options;


    prevSelectedIds       = []; // currently selected nodes that are deselected as a result of creation

    oldInputActiveNodeIds = [];


    prevConnections       = []; // [{outputNodeId, outputId, outputOrder, inputNodeId, inputId}]


    creatingButton;
    


    constructor(nodeType, creatingButton, options)
    {
        super(
            CREATE_INSERT_ACTION, 
            'CREATE / INSERT \'' + nodeType + '\'');
        
        this.nodeType       = nodeType;
        this.creatingButton = creatingButton;

        this.options        = options;
    }



    do(updateNodes)
    {
        this.prevSelectedIds = graphView.selectedNodes.map(n => n.id);

        createInsertNodeAction_savePrevConnections(this);


        graphView.creatingNodes = true;

        const node = createNode(this.nodeType, this.creatingButton, this.createdId, this.options);


        const insert = 
               this.prevSelectedIds.length == 1
            && canAutoConnectNode(node);
   
            
        graph.addNode(
            node, 
            false,
            true,
               this.options
            && this.options.fromSearch === true);
        
        this.createdNodeId = node.id;


        if (insert) this.do_insert  (node);
        else        this.do_noInsert(node);

            
        graphView.lastSelectedNodes = graphView.selectedNodes;
        graphView.selectedNodes     = [node];


        if (!getActiveAfterNode(node, true))
            uiMakeNodeActive(node);


        pushUnique(updateNodes, node);
    }



    undo(updateNodes)
    {
        uiDeleteNodes([this.createdNodeId]);

        createInsertNodeAction_activateOldInputs(this, updateNodes);

        pushUnique(updateNodes, this.prevSelectedIds.map(id => nodeFromId(id))); 

        this.prevConnections = [];
            
        graphView.selectByIds(this.prevSelectedIds);
    }



    do_insert(node)
    {
        //console.log('insert');

        const selNode   = nodeFromId(this.prevSelectedIds[0]);
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
            const newConn = createNodeAction_connect(this, selNode.headerOutputs[0], node, inputs[0].id);
            graphView.autoPlaceNewNode(newConn.output, newConn.input);


            for (const _conn of this.prevConnections)
            {
                const _output    = node.headerOutputs[0];
                const _inputNode = nodeFromId(_conn.inputNodeId);
                const _input     = _inputNode.inputFromId(_conn.inputId);

                if (   _output
                    && _input.canConnectFrom(_output)
                    && LIST_TYPES.includes(selOutput.types[0]) == LIST_TYPES.includes(_input.types[0]))
                    createNodeAction_connect(this, _output, _inputNode, _conn.inputId, _conn.outputOrder);
            }
        }
    }



    do_noInsert(node)
    {
        //console.log('no insert');

        if (node.variableInputs)
        {
            //console.log('variable inputs');

            const selNodes = this.prevSelectedIds.map(id => nodeFromId(id)).filter(n => n.headerOutputs.length > 0);

            if (selNodes.length > 0)
            {
                selNodes.sort((n1, n2) => n1.div.offsetTop - n2.div.offsetTop);
                
                const outputs = [];
                
                for (const selNode of selNodes)
                {
                    const conn = createNodeAction_connect(this, selNode.headerOutputs[0], node, node.headerInputs.at(-1).id);
                    outputs.push(conn.output);
                }

                graphView.autoPlaceNewVariableNode(outputs, node);
            }
            else
                graphView.placeNewNode(node, this.options.fromSearch);
        }
        else
        {
            //console.log('regular inputs');

            const selNode = nodeFromId(this.prevSelectedIds[0]);

            if (   selNode
                && selNode.headerOutputs.length > 0)
            {
                const inputs = node.headerInputs
                    .filter(i => i.canConnectFrom(selNode.headerOutputs[0]));
                
                if (!isEmpty(inputs))
                {
                    const conn = createNodeAction_connect(this, selNode.headerOutputs[0], node, inputs[0].id);
                    graphView.autoPlaceNewNode(conn.output, conn.input);
                }
                else
                    graphView.placeNewNode(node, this.options.fromSearch);
            }
            else
                graphView.placeNewNode(node, this.options.fromSearch);
        }
    }
}



function createInsertNodeAction_savePrevConnections(act)
{
    if (act.prevSelectedIds.length == 0)
        return;
        
    act.oldInputActiveNodeIds = act.prevSelectedIds.map(id => idFromNode(getActiveFromNodeId(id)));

    const selNodes = act.prevSelectedIds.map(id => nodeFromId(id));

    for (const selNode of selNodes)
    {
        if (isEmpty(selNode.headerOutputs))
            continue;

        const output = selNode.headerOutputs[0];

        for (const input of output.connectedInputs)
            act.prevConnections.push(input.connection.toDataObject());
    }
}



function createInsertNodeAction_activateOldInputs(act, updateNodes)
{
    if (act.oldInputActiveNodeIds.length == 0)
        return;

    const oldInputActiveNodes = 
        act.oldInputActiveNodeIds
            .map(id => nodeFromId(id))
            .filter(n => n);
    
    for (const node of oldInputActiveNodes)
    {
        uiMakeNodeActive(node);
        pushUnique(updateNodes, node);
    }

    act.oldInputActiveNodeIds = [];
}
class ReconnectAction
extends Action
{
    outputNodeId;
    outputId;
    outputOrder            = -1;
    
    prevInputNodeId        = '';
    prevInputId;
    prevInputOutputOrder   = -1; // output order of previous connection
    prevInputActiveNodeIds = [];
    prevInputValues        = []; // in id,value pairs, to be restored on undo

    inputNodeId;
    inputId;
    inputActiveNodeIds     = [];
    inputValues            = []; // in id,value pairs, to be restored on undo
    
    newActiveNodeIds       = [];
        
    oldOutputNodeId        = '';
    oldOutputId;
    oldOutputOrder;
    oldOutputActiveNodeId  = '';

    

    
    get outputNode()    { return nodeFromId(this.outputNodeId); }
    get output()        { return this.outputNode.outputs.find(o => o.id == this.outputId); }

    get prevInputNode() { return nodeFromId(this.prevInputNodeId); }
    get prevInput()     { return this.prevInputNode.inputFromId(this.prevInputId); }
    
    get inputNode()     { return nodeFromId(this.inputNodeId); }
    get input()         { return this.inputNode.inputFromId(this.inputId); }


    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }
    get oldOutput()     { return this.oldOutputNode.outputFromId(this.oldOutputId); }
    


    constructor(output, prevInput, input)
    {
        super(
             'RECONNECT '
            + output.node.id + '.' + output.id
            + ' (' + leftArrowChar(prevInput.supportsTypes(LIST_TYPES)) + ' '
            + prevInput.node.id + '.' + prevInput.id
            + ') ' + rightArrowChar(output.supportsTypes(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId         = output.node.id;
        this.outputId             = output.id;
        
        this.prevInputNodeId      = prevInput.node.id;
        this.prevInputId          = prevInput.id;
        this.prevInputOutputOrder = this.prevInput.connection.outputOrder;

        this.inputNodeId          = input.node.id;
        this.inputId              = input.id;
        

        this.oldOutputNodeId      = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputId          = input.connected ? input.connectedOutput.id      : '';
        this.oldOutputOrder       = input.connected ? input.connection.outputOrder  : -1;
    }



    do()
    {
        this.newActiveNodeIds = [];
        const updateNodes     = [];

        //this.oldInputActiveNodeIds = getActiveNodesFromNodeId(this.inputNodeId).map(n => n.id);
        connectAction_saveOutputActiveNodes(this);
        connectAction_saveInputActiveNodesAndValues(this);
      reconnectAction_savePrevInputActiveNodesAndValues(this);

        connectAction_removeOldOutputConnection(this);
      reconnectAction_removePrevInputConnection(this);        

        connectAction_makeNewConnection(this);

        connectAction_updateOldOutput(this, updateNodes);
        connectAction_updateInputActiveNodes(this, updateNodes);

        connectAction_updateNodes(this, updateNodes);
        connectAction_cleanup(this);

        pushUpdate(updateNodes);
    }



    undo()
    {
        const updateNodes = [];

        connectAction_removeNewConnection(this);
      reconnectAction_restorePrevConnection(this);    

        connectAction_restoreOldConnection(this);
        connectAction_restoreInputValues(this);
      reconnectAction_restorePrevInputValues(this);

        connectAction_deactivateNewActiveNodes(this);
        connectAction_activateOldActiveNodes(this, updateNodes); 

        connectAction_restoreCleanup(this);

        pushUpdate(updateNodes);
    }
}



function reconnectAction_savePrevInputActiveNodesAndValues(act)
{
    //act.prevInputValues        = act.prevInput.getValuesForUndo ? act.prevInput.getValuesForUndo() : [];
    act.prevInputActiveNodeIds = getActiveNodesRightFromNodeId(act.prevInputNodeId).map(n => n.id);
}



function reconnectAction_removePrevInputConnection(act)
{
    const prevInput = act.prevInputNode.inputFromId(act.prevInputId);

    uiDeleteSavedConn(prevInput.connection);
    uiDisconnect(prevInput);
}



function reconnectAction_restorePrevInputValues(act)
{
    for (const param of act.prevInputValues)
    {
        act.prevInputNode.params[act.prevInputNode.params.findIndex(p => p.id == param[0])]
            .setValue(param[1], true, true, false);
    }
}



function reconnectAction_restorePrevConnection(act)
{
    act.output.updateSavedConnectionOrder(act.prevInputOutputOrder, +1);

    const prevConn = uiVariableConnect(
        act.outputNode,    act.outputId, 
        act.prevInputNode, act.prevInputId,
        act.prevInputOutputOrder);

    uiSaveConn(prevConn);
}
class ReconnectAction
extends Action
{
    outputNodeId;
    outputId;
    outputOrder           = -1;

    inputNodeId;
    inputId;

    newActiveNodeIds      = [];
    

    oldInputNodeId        = '';
    oldInputId;
    oldInputActiveNodeIds = [];
    oldInputValues        = []; // in id,value pairs, to be restored on undo

    
    oldOutputNodeId       = '';
    oldOutputId;
    oldOutputOrder;
    oldOutputActiveNodeId = '';
    

    
    get outputNode()    { return nodeFromId(this.outputNodeId); }
    get output()        { return this.outputNode.outputs.find(o => o.id == this.outputId); }

    get inputNode()     { return nodeFromId(this.inputNodeId); }
    get input()         { return this.inputNode.inputFromId(this.inputId); }

    
    get oldInputNode()  { return nodeFromId(this.oldInputNodeId); }
    get oldInput()      { return this.oldInputNode.inputFromId(this.oldInputId); }
    
    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }
    get oldOutput()     { return this.oldOutputNode.outputFromId(this.oldOutputId); }



    constructor(output, oldInput, input)
    {
        super(
             'RECONNECT '
            + output.node.id + '.' + output.id
            + ' (' + leftArrowChar(oldInput.supportsTypes(LIST_TYPES)) + ' '
            + oldInput.node.id + '.' + oldInput.id
            + ') ' + rightArrowChar(output.supportsTypes(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId    = output.node.id;
        this.outputId        = output.id;
               
        this.inputNodeId     = input.node.id;
        this.inputId         = input.id;


        this.oldOutputNodeId = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputId     = input.connected ? input.connectedOutput.id      : '';
        this.oldOutputOrder  = input.connected ? input.connection.outputOrder  : -1;
       
        this.oldInputNodeId  = oldInput.node.id;
        this.oldInputId      = oldInput.id;
    }



    do()
    {
        this.newActiveNodeIds = [];
        const updateNodes     = [];

        //this.oldInputActiveNodeIds = getActiveNodesFromNodeId(this.inputNodeId).map(n => n.id);
        connectAction_saveOutputInput(this);

        connectAction_removeOldOutputConnection(this);
      reconnectAction_removeOldInputConnection(this);        

        connectAction_updateOldOutput(this, updateNodes);
        connectAction_updateOldInput(this, updateNodes);

        connectAction_makeNewConnection(this);

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
        connectAction_restoreOldInputValues(this);

        connectAction_deactivateNewActiveNodes(this);
        connectAction_activateOldActiveNodes(this, updateNodes); 

        connectAction_restoreCleanup(this);

        pushUpdate(updateNodes);
    }
}



function reconnectAction_removeOldInputConnection(act)
{
    const oldInput = act.oldInputNode.inputFromId(act.oldInputId);

    uiDeleteSavedConn(oldInput.connection);
    uiDisconnect(oldInput);
}



function reconnectAction_restorePrevConnection(act)
{
    act.output.updateSavedConnectionOrder(act.outputOrder, +1);

    const prevConn = uiVariableConnect(
        act.outputNode,   act.outputId, 
        act.oldInputNode, act.oldInputId,
        act.outputOrder);

    uiSaveConn(prevConn);
}
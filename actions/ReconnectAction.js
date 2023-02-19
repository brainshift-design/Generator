class ReconnectAction
extends Action
{
    outputNodeId;
    outputId;
    outputOrder            = -1;
    outputValues           = [];
    
    prevInputNodeId        = NULL;
    prevInputId;
    prevInputOutputOrder   = -1; // output order of previous connection
    prevInputActiveNodeIds = [];
    prevInputValues        = []; // in id,value pairs, to be restored on undo

    inputNodeId;
    inputId;
    inputActiveNodeIds     = [];
    inputValues            = []; // in id,value pairs, to be restored on undo
    
    newActiveNodeIds       = [];
        
    oldOutputNodeId        = NULL;
    oldOutputId;
    oldOutputOrder;
    oldOutputActiveNodeId  = NULL;

    backInit               = false;

    

    
    get outputNode()    { return nodeFromId(this.outputNodeId); }
    get output()        { return this.outputNode.outputs.find(o => o.id == this.outputId); }

    get prevInputNode() { return nodeFromId(this.prevInputNodeId); }
    get prevInput()     { return this.prevInputNode.inputFromId(this.prevInputId); }
    
    get inputNode()     { return nodeFromId(this.inputNodeId); }
    get input()         { return this.inputNode.inputFromId(this.inputId); }


    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }
    get oldOutput()     { return this.oldOutputNode.outputFromId(this.oldOutputId); }
    


    constructor(output, prevInput, input, options = {})
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
        

        this.oldOutputNodeId      = input.connected ? input.connectedOutput.node.id : NULL;
        this.oldOutputId          = input.connected ? input.connectedOutput.id      : NULL;
        this.oldOutputOrder       = input.connected ? input.connection.outputOrder  : -1;


        if (   options 
            && isValid(options.backInit))
            this.backInit = options.backInit;
    }



    do(updateNodes)
    {
        this.newActiveNodeIds = [];

        connectAction_saveOutputActiveNodesAndValues(this);
        connectAction_saveInputActiveNodesAndValues(this);
        this.savePrevInputActiveNodesAndValues();

        if (this.backInit)
            connectAction_backInitOutputValue(this);

        connectAction_removeOldOutputConnection(this);
        this.removePrevInputConnection();

        connectAction_makeNewConnection(this);

        connectAction_updateOldOutput(this, updateNodes);
        connectAction_updateInputActiveNodes(this, updateNodes);

        connectAction_updateNodes(this, updateNodes);
        connectAction_cleanup(this);
    }



    undo(updateNodes)
    {
        connectAction_restoreInputValues(this);
        this.restorePrevInputValues();

        connectAction_restoreOutputValues(this);
        
        this.deactivateNewActiveNodes();
        connectAction_activateOldActiveNodes(this, updateNodes); 

        connectAction_restoreCleanup(this);
    }



    savePrevInputActiveNodesAndValues()
    {
        this.prevInputActiveNodeIds = getActiveNodesAfterNodeId(this.prevInputNodeId).map(n => n.id);
    }
    
    
    
    removePrevInputConnection()
    {
        uiDeleteSavedConn(this.prevInput.connection);
        uiDisconnect(this.prevInput);
    }
    
    
    
    restorePrevInputValues()
    {
        for (const param of this.prevInputValues)
        {
            this.prevInputNode.params[this.prevInputNode.params.findIndex(p => p.id == param[0])]
                .setValue(param[1], true, true, false);
        }
    }
    
    
    
    restorePrevConnection()
    {
        this.output.updateSavedConnectionOrder(this.prevInputOutputOrder, +1);
    
        const prevConn = uiVariableConnect(
            this.outputNode,    this.outputId, 
            this.prevInputNode, this.prevInputId,
            this.prevInputOutputOrder);
    
        uiSaveConn(prevConn);
    }}
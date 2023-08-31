class LinkExistingVariableAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    get  inputNode() { return this.node; } // dummy for ConnectAction_...
    get outputNode() { return this.node; } // dummy for ConnectAction_...

    get  input() { return this.node.paramValue. input; } // dummy for ConnectAction_...
    get output() { return this.node.paramValue.output; } // dummy for ConnectAction_...

    variableId;
    variableName;

    prevVariableId;
    prevVariableName;

    outputValues = []; // in id,value pairs, to be restored on undo
    inputValues  = []; // in id,value pairs, to be restored on undo


    constructor(nodeId, variableId, variableName)
    {
        super(
            LINK_VARIABLE_ACTION, 
            'LINK VARIABLE \'' + nodeId + ' ⟶ ' + variableId + ')');
        
        this.affectsConnections = false;

        this.nodeId       = nodeId;
        this.variableId   = variableId;
        this.variableName = variableName;
    }



    do(updateNodes)
    {
        this.prevVariableId   = this.node.linkedVariableId;
        this.prevVariableName = this.node.linkedVariableName;
        
        connectAction_saveOutputValues(this);
        connectAction_saveInputValues(this);

        uiLinkNodeToVariable(
            this.node,
            this.variableId,
            this.variableName);

        pushUnique(updateNodes, this.node);

        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        connectAction_restoreInputValues(this);
        connectAction_restoreOutputValues(this);

        uiLinkNodeToVariable(
            this.node,
            this.prevVariableId,
            this.prevVariableName);

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);

        if (this.node.paramValue.input.connected)
            uiTriggerUndo();
    }    
}
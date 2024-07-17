class LinkExistingVariableAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    get  inputNode() { return this.node; } // dummy for ConnectAction_...
    get outputNode() { return this.node; } // dummy for ConnectAction_...

    get  input() { return this.node.paramValue ? this.node.paramValue. input : null; } // dummy for ConnectAction_...
    get output() { return this.node.paramValue ? this.node.paramValue.output : null; } // dummy for ConnectAction_...

    variableId;
    variableType;
    variableName;
    variableTemp;

    prevVariableId;
    prevVariableType;
    prevVariableName;
    prevVariableTemp;

    outputValues = []; // in id,value pairs, to be restored on undo
    inputValues  = []; // in id,value pairs, to be restored on undo



    constructor(nodeId, variableId, resolvedType, variableName, variableTemp)
    {
        super(
            LINK_VARIABLE_ACTION, 
            'LINK VARIABLE \'' + nodeId + ' ⟶ ' + (variableId != NULL ? variableId : 'NULL') + ')');
        
        this.nodeId       = nodeId;
        this.variableId   = variableId;
        this.variableType = resolvedType;
        this.variableName = variableName;
        this.variableTemp = variableTemp;
        this.selfUpdate   = true;
    }



    do(updateNodes)
    {
        this.prevVariableId   = this.node.linkedVariableId;
        this.prevVariableType = this.node.linkedVariableType;
        this.prevVariableName = this.node.linkedVariableName;
        this.prevVariableTemp = this.node.linkedVariableTemp;
 
       
        uiLinkNodeToVariable(
            this.node,
            this.variableId,
            this.variableType,
            this.variableName,
            this.variableTemp);


        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        uiLinkNodeToVariable(
            this.node,
            this.prevVariableId,
            this.prevVariableType,
            this.prevVariableName,
            this.prevVariableTemp);

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);

        if (this.node.paramValue.input.connected)
            uiTriggerUndo();
    }    
}
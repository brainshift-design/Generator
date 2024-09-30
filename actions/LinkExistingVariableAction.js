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
    variableValue;
    //variableTemp;

    prevVariableId;
    prevVariableType;
    prevVariableName;
    prevVariableValue;
    //prevVariableTemp;

    outputValues = []; // in id,value pairs, to be restored on undo
    inputValues  = []; // in id,value pairs, to be restored on undo



    constructor(nodeId, variableId, resolvedType, variableName, variableValue)//, variableTemp)
    {
        super(
            LINK_VARIABLE_ACTION, 
            'LINK VARIABLE \'' + nodeId + ' ⟶ ' + (variableId != NULL ? variableId : 'NULL') + ')');
        
        this.nodeId        = nodeId;
        this.variableId    = variableId;
        this.variableType  = resolvedType;
        this.variableName  = variableName;
        this.variableValue = variableValue;
        //this.variableTemp = variableTemp;
        this.selfUpdate   = true;
    }



    do(updateNodes)
    {
        this.prevVariableId    = this.node.variableId;
        this.prevVariableType  = this.node.variableType;
        this.prevVariableName  = this.node.variableName;
        this.prevVariableValue = this.node.variableValue;
        //this.prevVariableTemp = this.node.linkedTemp;
 
       
        uiLinkNodeToVariable(
            this.node,
            this.variableId,
            this.variableType,
            this.variableName,
            this.variableValue);//,
            //this.variableTemp);


        uiSaveNodes([this.nodeId]);
    }



    undo(updateNodes)
    {
        uiLinkNodeToVariable(
            this.node,
            this.prevVariableId,
            this.prevVariableType,
            this.prevVariableName);//,
            //this.prevVariableTemp);

        this.node.updateNode();

        uiSaveNodes([this.nodeId]);

        if (this.node.paramValue.input.connected)
            uiTriggerUndo();
    }    
}
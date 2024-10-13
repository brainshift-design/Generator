class LinkExistingVariableAction
extends Action
{
    nodeId;
    get node() { return nodeFromId(this.nodeId) } 

    get  inputNode() { return this.node; } // dummy for ConnectAction_...
    get outputNode() { return this.node; } // dummy for ConnectAction_...

    get  inputs() { return this.node.paramValues.map(p => p. input); } // dummy for ConnectAction_...
    get outputs() { return this.node.paramValues.map(p => p.output); } // dummy for ConnectAction_...

    variableId;
    variableType;
    variableName;
    variableValues;
    //variableTemp;

    prevVariableId;
    prevVariableType;
    prevVariableName;
    prevVariableValues;
    //prevVariableTemp;

    outputValues = []; // in id,value pairs, to be restored on undo
    inputValues  = []; // in id,value pairs, to be restored on undo



    constructor(nodeId, variableId, resolvedType, variableName, variableValues)//, variableTemp)
    {
        super(
            LINK_VARIABLE_ACTION, 
            'LINK VARIABLE \'' + nodeId + ' ⟶ ' + (variableId != NULL ? variableId : 'NULL') + ')');
        
        this.nodeId         = nodeId;
        this.variableId     = variableId;
        this.variableType   = resolvedType;
        this.variableName   = variableName;
        this.variableValues = [...variableValues];
        //this.variableTemp = variableTemp;
        this.selfUpdate     = true;
    }



    do(updateNodes)
    {
        this.prevVariableId     = this.node.variableId;
        this.prevVariableType   = this.node.variableType;
        this.prevVariableName   = this.node.variableName;
        this.prevVariableValues = [...this.node.variableValue];
        //this.prevVariableTemp = this.node.linkedTemp;
 
       
        uiLinkNodeToVariable(
            this.node,
            this.variableId,
            this.variableType,
            this.variableName,
            this.variableValues);//,
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

        if (this.node.paramValues.some(p => p.input.connected))
            uiTriggerUndo();
    }    
}
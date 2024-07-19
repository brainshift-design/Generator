class FigmaVariable
extends FigmaObject
{
    variableType;
    variableValue;

    

    constructor(nodeId, variableId, variableName, variableType, variableValue)
    {
        super(VARIABLE, nodeId, variableId, variableName);
        
        this.variableType  = variableType;
        this.variableValue = variableValue;
    }



    copy()
    {
        const copy = new FigmaVariable(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.variableType,
            this.variableValue);


        copy.copyBase(this);


        return copy;
    }



    toValue()
    {
        return VariableValue.fromObject(this);
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 24 */ this.variableType,
            /* 25 */ this.variableValue
        ];
    }
}

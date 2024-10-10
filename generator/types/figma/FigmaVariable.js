class FigmaVariable
extends FigmaObject
{
    variableType;
    variableValue;

    

    constructor(nodeId, variableId, variableName, variableValue)
    {
        super(VARIABLE, nodeId, variableId, variableName);
        

        if (variableValue)
        {
            switch (variableValue.type)
            {
                case NUMBER_VALUE: 
                    this.variableType = 
                        variableValue.isBoolean 
                        ? 'BOOLEAN' 
                        : 'FLOAT'; 

                    this.variableValue = variableValue.toNumber();
                    
                    break;


                case TEXT_VALUE: 
                    this.variableType  = 'STRING';
                    this.variableValue = variableValue.toString();
                    break;


                case COLOR_VALUE: 
                    this.variableType  = 'COLOR';
                    this.variableValue = variableValue.toRgbObject();
                    break;


                case FILL_VALUE: 
                    this.variableType  = 'COLOR';
                    this.variableValue = variableValue.toRgbaObject();
                    break;
            }
        }
    }



    copy()
    {
        const copy = new FigmaVariable(
            this.nodeId,
            this.variableId,
            this.objectName,
            null);


        copy.variableType  = this.variableType;
        copy.variableValue = this.variableValue;


        copy.copyBase(this);


        return copy;
    }



    toNewValue()
    {
        return VariableValue.fromObject(this);
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 10 */ this.variableType,
            /* 11 */ this.variableValue
        ];
    }
}

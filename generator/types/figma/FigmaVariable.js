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

                    this.variableValue = variableValue.toPreviewString();
                    
                    break;


                case TEXT_VALUE: 
                    this.variableType  = 'STRING';
                    this.variableValue = variableValue.toJson();
                    break;


                case COLOR_VALUE: 
                    this.variableType = 'COLOR';

                    this.variableValue = 
                    {
                        type:      'SOLID',
                        color:      variableValue.toRgb(),
                        opacity:    variableValue.toRgba()[3],
                        blendMode: 'PASS_THROUGH'
                    };

                    break;
            }
        }
    }



    copy()
    {
        const copy = new FigmaVariable(
            this.nodeId,
            this.variableId,
            this.variableName,
            null);


        copy.variableType  = this.variableType;
        copy.variableValue = this.variableValue;


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
   
            /* 10 */ this.variableType,
            /* 11 */ this.variableValue
        ];
    }
}

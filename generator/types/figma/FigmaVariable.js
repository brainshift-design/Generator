class FigmaVariable
extends FigmaObject
{
    variableType;
    variableValues = [];
    aliasIds       = [];

    

    constructor(nodeId, variableId, variableName, variableValues, aliasIds)
    {
        super(VARIABLE, nodeId, variableId, variableName);
        
        this.aliasIds = aliasIds;

        if (variableValues.length > 0)
        {
            switch (variableValues[0].type)
            {
                case NUMBER_VALUE: this.variableType = variableValues[0].isBoolean ? 'BOOLEAN' : 'FLOAT'; break;
                case TEXT_VALUE:   this.variableType = 'STRING'; break;
                case COLOR_VALUE: 
                case FILL_VALUE:   this.variableType = 'COLOR';  break;
            }
        }


        for (const variableValue of variableValues)
        {
            switch (variableValue.type)
            {
                case NUMBER_VALUE: this.variableValues.push(variableValue.toNumber());     break;
                case TEXT_VALUE:   this.variableValues.push(variableValue.toString());     break;
                case COLOR_VALUE:  this.variableValues.push(variableValue.toRgbObject());  break;
                case FILL_VALUE:   this.variableValues.push(variableValue.toRgbaObject()); break;
            }
        }
    }



    copy()
    {
        const copy = new FigmaVariable(
            this.nodeId,
            this.variableId,
            this.objectName,
            [],
            []);


        copy.variableType   = this.variableType;
        copy.variableValues = [...this.variableValues];
        copy.aliasIds       = [...this.aliasIds];

        copy.copyBase(this);


        return copy;
    }



    toNewValue()
    {
        return VariableValue.fromObject(this);
    }



    toData()
    {
        console.log('this.aliasIds =', this.aliasIds);
        const data = 
        [
            ...super.toData(),
   
            /* 10 */ this.variableType,
            /* 11 */ this.variableValues.length,
            /* 12 */ this.aliasIds.map(a => a !== NULL)
        ];

        for (const val of this.variableValues)
            data.push(val);

        return data;
    }
}

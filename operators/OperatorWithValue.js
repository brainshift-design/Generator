class   OperatorWithValue
extends OperatorBase
{
    paramValue;
    


    constructor(type, shortName, defWidth = defNodeWidth, progressBar = false)
    {
        super(type, shortName, defWidth, progressBar);

        this.paramValue = createParamFromType(type);
        this.paramValue.isResult = true;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramValue.setValue(value, false, true, false);

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}
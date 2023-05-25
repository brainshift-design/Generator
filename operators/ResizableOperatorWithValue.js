class   ResizableOperatorWithValue
extends ResizableBase
{
    paramValue;
    


    constructor(type, id, name, icon, defWidth = defNodeWidth, progressBar = false)
    {
        super(type, id, name, icon, defWidth, progressBar);

        this.paramValue          = createParamFromType(type);
        this.paramValue.isResult = true;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == returnValueId)];

        this.paramValue.setValue(value, false, true, false);

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}
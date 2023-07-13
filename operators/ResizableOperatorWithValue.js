class   ResizableOperatorWithValue
extends ResizableBase
{
    paramValue;
    


    constructor(type, id, name, icon, defWidth = defNodeWidth, progressBar = false)
    {
        super(type, id, name, icon, defWidth, progressBar);

        this.paramValue = createParamFromType(type);

        this.paramValue.isResult    = true;
        this.paramValue.isNodeValue = true;
    }



    // setSize(w, h, updateTransform = true)
    // {
    //     super.setSize(
    //         w, 
    //         settings.showOperationResults ? h : h - defParamHeight, 
    //         updateTransform);
    // }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(
            x,
            y,
            w, 
            settings.showOperationResults ? h : h - defParamHeight, 
            updateTransform);
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramValue.setValue(value, false, true, false);

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}
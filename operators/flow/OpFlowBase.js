class OpFlowBase
extends OperatorBase
{
    value;



    getHeaderOutputColor()
    {
        if (  !this.value
            || this.isUnknown())
            return super.getHeaderOutputColor();


        switch (this.value.type)
        {
            case COLOR_VALUE: return this.value.toRgb();
            case FILL_VALUE:  return this.value.color.toRgb();
            default:          return super.getHeaderOutputColor();
        }
    }



    getOutputWireColor()
    {
        if (  !this.value
            || this.isUnknown())
            return super.getOutputWireColor();


        switch (this.value.type)
        {
            case COLOR_VALUE: return this.value.toRgb();
            case FILL_VALUE:  return this.value.color.toRgb();
            default:          return super.getOutputWireColor();
        }
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        const type = values[paramIds.findIndex(id => id == 'type' )];
        this.value = values[paramIds.findIndex(id => id == 'value')];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        colors.text = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        return colors;
    }
}
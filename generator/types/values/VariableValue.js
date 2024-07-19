class VariableValue
extends GValue
{
    nodeId;

    variableId;
    variableType;
    variableName;
    variableValue;



    constructor(nodeId,
                variableId    = NULL, 
                variableType  = NULL, 
                variableName  = '', 
                variableValue = new NullValue())
    {
        super(VARIABLE_VALUE, nodeId);

        this.variableId    = variableId;
        this.variableType  = variableType;
        this.variableName  = variableName;
        this.variableValue = variableValue;
    }



    static fromObject(obj)
    {
        return new VariableValue(
            obj.nodeId,
            obj.objectId, 
            obj.variableType, 
            obj.objectName, 
            new NullValue()); //NumberValue(obj.variableValue));
    }



    copy()
    {
        const copy = new VariableValue(
            this.nodeId,
            this.variableId, 
            this.variableType, 
            this.variableName, 
            this.variableValue.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(rect)
    {
        return rect
            && this.variableId   == rect.variableId  
            && this.variableType == rect.variableType
            && this.variableName == rect.variableName
            && this.variableValue.equals(rect.variableValue);
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      this.variableId
            + ' ' + this.variableType
            + ' ' + encodeURIComponent(this.variableName)
            + ' ' + this.variableValue.toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'variable';
            // + ' ' + this.variableId   .toPreviewString()
            // + ' ' + this.variableType .toPreviewString()
            // + ' ' + this.variableName .toPreviewString()
            // + ' ' + this.variableValue.toPreviewString();
    }



    toDisplayString()
    {
        return      this.variableId   .toDisplayString()
            + ' ' + this.variableType .toDisplayString()
            + ' ' + this.variableName .toDisplayString()
            + ' ' + this.variableValue.toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.variableValue.hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.variableId   != NULL
            && this.variableType != NULL
            && this.variableName != ''
            && this.variableValue.isValid();
    }


    
    static NaN = new VariableValue(
        '',
        NULL,
        NULL,
        '',
        new NullValue());
}



function parseVariableValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [VariableValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const variableId    = str[i];                     i++;
    const variableType  = str[i];                     i++;
    const variableName  = decodeURIComponent(str[i]); i++;
    const variableValue = parseValueFromType(variableType, str[i]); i += variableValue[1];


    const _var = new VariableValue(
        '', // set node ID elsewhere
        variableId,
        variableType,
        variableName,
        variableValue[0]);


    return [_var, i - iStart];
}

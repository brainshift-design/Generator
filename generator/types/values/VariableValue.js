class VariableValue
extends GValue
{
    nodeId;

    variableId;
    variableName;
    variableValue;



    constructor(nodeId,
                variableId    = NULL, 
                variableName  = '', 
                variableValue = new NullValue())
    {
        super(VARIABLE_VALUE, nodeId);

        this.variableId    = variableId;
        this.variableName  = variableName;
        this.variableValue = variableValue ? variableValue.copy() : new NullValue();
    }



    static fromObject(obj)
    {
        return new VariableValue(
            obj.nodeId,
            obj.objectId, 
            obj.objectName, 
            new NullValue()); //NumberValue(obj.variableValue));
    }



    copy()
    {
        const copy = new VariableValue(
            this.nodeId,
            this.variableId, 
            this.variableName, 
            this.variableValue ? this.variableValue.copy() : new NullValue());

        copy.copyBase(this);

        return copy;
    }



    equals(_var)
    {
        return _var
            && this.variableId   == _var.variableId  
            && this.variableName == _var.variableName
            &&    this.variableValue
               && _var.variableValue
               && this.variableValue.equals(_var.variableValue);
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      (this.variableId   != NULL ? this.variableId  : NULL_VALUE)
            + ' ' + (this.variableName != ''   ? encodeURIComponent(this.variableName)  : NULL_VALUE)
            + ' ' + (this.variableValue ? this.variableValue.type : NULL_VALUE)
            + ' ' + (this.variableValue ? this.variableValue.toString() : NULL_VALUE);
    }



    toPreviewString()
    {
        return 'variable';
            // + ' ' + this.variableId   .toPreviewString()
            // + ' ' + this.variableName .toPreviewString()
            // + ' ' + (this.variableValue ? this.variableValue.type : NULL_VALUE)
            // + ' ' + this.variableValue.toPreviewString();
    }



    toDisplayString()
    {
        return      (this.variableId   != NULL ? this.variableId   : NULL_VALUE)
            + ' ' + (this.variableName != ''   ? this.variableName : NULL_VALUE)
            + ' ' + (this.variableValue ? this.variableValue.type : NULL_VALUE)
            + ' ' + (this.variableValue ? this.variableValue.toDisplayString() : NULL_VALUE);
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
            && this.variableName != ''
            && this.variableValue && this.variableValue.isValid();
    }


    
    static NaN = new VariableValue(
        NULL,
        NULL,
        '',
        null);
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

    const variableId    = str[i];                                    i++;
    const variableName  = decodeURIComponent(str[i]);                i++;
    const variableType  = str[i];                                    i++;
    const variableValue = parseValueFromType(variableType, str[i]);  i += variableValue ? variableValue[1] : 1;


    const _var = new VariableValue(
        NULL, // set node ID elsewhere
        variableId,
        variableName,
        variableValue);


    return [_var, i - iStart];
}

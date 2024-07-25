class VariableValue
extends GValue
{
    nodeId;

    linkedId;
    linkedType;
    linkedName;
    linkedValue;



    constructor(nodeId,
                linkedId    = NULL, 
                linkedType  = NULL, 
                linkedName  = '', 
                linkedValue = NULL)
    {
        super(VARIABLE_VALUE, nodeId);

        this.linkedId    = linkedId;
        this.linkedType  = linkedType;
        this.linkedName  = linkedName;
        this.linkedValue = linkedValue;
    }



    static fromObject(obj)
    {
        return new VariableValue(
            obj.nodeId,
            obj.objectId, 
            obj.variableType, 
            obj.objectName, 
            NULL); //NumberValue(obj.variableValue));
    }



    copy()
    {
        const copy = new VariableValue(
            this.nodeId,
            this.linkedId, 
            this.linkedType, 
            this.linkedName, 
            this.linkedValue);

        copy.copyBase(this);

        return copy;
    }



    equals(_var)
    {
        return _var
            && this.linkedId    == _var.linkedId  
            && this.linkedType  == _var.linkedType
            && this.linkedName  == _var.linkedName
            && this.linkedValue == _var.linkedValue;
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      (this.linkedId    != NULL ? this.linkedId                        : NULL_VALUE)
            + ' ' + (this.linkedType  != NULL ? this.linkedType                      : NULL_VALUE)
            + ' ' + (this.linkedName  != ''   ? encodeURIComponent(this.linkedName)  : NULL_VALUE)
            + ' ' + (this.linkedValue != NULL ? encodeURIComponent(this.linkedValue) : NULL_VALUE);
    }



    toPreviewString()
    {
        return 'variable';
            // + ' ' + this.linkedId   .toPreviewString()
            // + ' ' + this.linkedType .toPreviewString()
            // + ' ' + this.linkedName .toPreviewString()
            // + ' ' + this.linkedValue.toPreviewString();
    }



    toDisplayString()
    {
        return      (this.linkedId    ? this.linkedId   .toDisplayString() : NULL_VALUE)
            + ' ' + (this.linkedType  ? this.linkedType .toDisplayString() : NULL_VALUE)
            + ' ' + (this.linkedName  ? this.linkedName .toDisplayString() : NULL_VALUE)
            + ' ' + (this.linkedValue ? this.linkedValue.toDisplayString() : NULL_VALUE);
    }



    toValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.linkedValue.hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.linkedId    != NULL
            && this.linkedType  != NULL
            && this.linkedName  != ''
            && this.linkedValue != NULL;
    }


    
    static NaN = new VariableValue(
        NULL,
        NULL,
        NULL,
        '',
        NULL);
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

    const linkedId    = str[i];                     i++;
    const linkedType  = str[i];                     i++;
    const linkedName  = decodeURIComponent(str[i]); i++;
    const linkedValue = decodeURIComponent(str[i]); i++;


    const _var = new VariableValue(
        NULL, // set node ID elsewhere
        linkedId,
        linkedType,
        linkedName,
        linkedValue);


    return [_var, i - iStart];
}

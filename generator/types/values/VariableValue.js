class VariableValue
extends GValue
{
    nodeId;

    variableId;
    variableName;
    variableValues;
    variableTemp;



    constructor(nodeId,
                variableId     = NULL, 
                variableName   = '', 
                variableValues = [],
                variableTemp = false)
    {
        super(VARIABLE_VALUE, nodeId, 'variable');

        this.variableId     = variableId;
        this.variableName   = variableName;
        this.variableValues = [...variableValues];
        this.variableTemp   = variableTemp;
    }



    static fromObject(obj)
    {
        return new VariableValue(
            obj.nodeId,
            obj.objectId, 
            obj.objectName, 
            [],
            true);
    }



    copy()
    {
        const copy = new VariableValue(
            this.nodeId,
            this.variableId, 
            this.variableName, 
            this.variableValues.map(v => v.copy()),
            this.variableTemp);

        copy.copyBase(this);

        return copy;
    }



    equals(_var)
    {
        let result =
              _var
            && this.variableId   == _var.variableId  
            && this.variableName == _var.variableName;

        for (let i = 0; i < this.variableValues.length; i++)
        {
            if (   !this.variableValues[i]
                || !_var.variableValues[i]
                || !this.variableValues[i].equals(_var.variableValues[i]))
            {
                result = false;
                break;
            }
        }

        return result;
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      (this.variableId   != NULL ? this.variableId  : NULL_VALUE)
            + ' ' + (this.variableName != ''   ? encodeURIComponent(this.variableName)  : NULL_VALUE)
            + ' ' + (this.variableValues.length > 0 ? this.variableValues[0].type : NULL_VALUE)
            + ' ' +  this.variableValues.length
            + ' ' +  this.variableValues.map(v => encodeURIComponent(v.toString())).join(' ')
            + ' ' + (this.variableTemp ? 'T' : 'X'); // T = temp, X = existing
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
            + ' ' + (this.variableValues.length > 0 ? this.variableValues[0].type : NULL_VALUE)
            + ' ' +  this.variableValues.map(v => encodeURIComponent(v.toDisplayString())).join(' ')
            + ' ' + (this.variableTemp ? 'T' : 'X'); // T = temp, X = existing
    }



    toNewValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.variableValues.some(v => v.hasInitValue());
    }



    isValid()
    {
        return this.variableId   != NULL
            && this.variableName != ''
            && this.variableValues.every(v => v.isValid());
    }


    
    static NaN = new VariableValue(
        NULL,
        NULL,
        '',
        []);
}



function parseVariableValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [VariableValue.NaN(), 1];


    let _str;

    if (i < 0)
    {
       _str = str.split(' ');
        i   = 0;
    }
    else
        _str = str;


    const iStart = i;
    let   length = 0;

    const variableId      = _str[i] != NULL_VALUE ? _str[i] : NULL;               length += _str[i].length + 1;  i++;

    const strName         = decodeURIComponent(_str[i]);
    const variableName    = strName != NULL_VALUE ? strName : NULL;               length += _str[i].length + 1;  i++;

    const variableType    = _str[i] != NULL_VALUE ? _str[i] : NULL;               length += _str[i].length + 1;  i++;
    
    const nVariableValues = _str[i] != NULL_VALUE ? parseInt(_str[i]) : NULL;     length += _str[i].length + 1;  i++;
    

    const variableValues = [];

    for (let j = 0; j < nVariableValues; j++)
    {
        const variableValue = parseValueFromType(variableType, decodeURIComponent(_str[i]));

        variableValues.push(variableValue);

        length += _str[i].length + 1;
        i++;
    }


    const variableTemp = _str[i] == 'T';  length += _str[i].length + 1;  i++;


    const _var = new VariableValue(
        NULL, // set node ID elsewhere
        variableId,
        variableName,
        variableValues,
        variableTemp);


    return [_var, i - iStart];
}

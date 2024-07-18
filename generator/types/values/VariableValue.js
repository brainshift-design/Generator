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
            new NumberValue(obj.x     ), 
            new NumberValue(obj.y     ), 
            new NumberValue(obj.width ), 
            new NumberValue(obj.height), 
            new NumberValue(obj.round ));
    }



    copy()
    {
        const copy = new VariableValue(
            this.nodeId,
            this.x     .copy(), 
            this.y     .copy(), 
            this.width .copy(), 
            this.height.copy(), 
            this.round .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(rect)
    {
        return rect
            && this.x     .equals(rect.x     )
            && this.y     .equals(rect.y     )
            && this.width .equals(rect.width )
            && this.height.equals(rect.height)
            && this.round .equals(rect.round );
    }



    async eval(parse)
    {
        return this.copy();
    }



    toString()
    {
        return      this.x     .toString()
            + ' ' + this.y     .toString()
            + ' ' + this.width .toString()
            + ' ' + this.height.toString()
            + ' ' + this.round .toString()
            + ' ' + super.toString();
    }



    toPreviewString()
    {
        return 'variable';
            // + ' ' + this.x     .toPreviewString()
            // + ' ' + this.y     .toPreviewString()
            // + ' ' + this.width .toPreviewString()
            // + ' ' + this.height.toPreviewString()
            // + ' ' + this.round .toPreviewString();
    }



    toDisplayString()
    {
        return      this.x     .toDisplayString()
            + ' ' + this.y     .toDisplayString()
            + ' ' + this.width .toDisplayString()
            + ' ' + this.height.toDisplayString()
            + ' ' + this.round .toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    hasInitValue()
    {
        return super.hasInitValue()
            && this.x     .hasInitValue()
            && this.y     .hasInitValue()
            && this.width .hasInitValue()
            && this.height.hasInitValue()
            && this.round .hasInitValue();
    }



    isValid()
    {
        return super.isValid()
            && this.x     .isValid()
            && this.y     .isValid()
            && this.width .isValid()
            && this.height.isValid()
            && this.round .isValid();
    }


    
    static NaN = new VariableValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN);
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

    const x      = parseNumberValue(str[i]); i += x     [1];
    const y      = parseNumberValue(str[i]); i += y     [1];
    const width  = parseNumberValue(str[i]); i += width [1];
    const height = parseNumberValue(str[i]); i += height[1];
    const round  = parseNumberValue(str[i]); i += round [1];


    const rect = new VariableValue(
        '', // set node ID elsewhere
        x     [0],
        y     [0],
        width [0],
        height[0],
        round [0]);


    i = parseShapeBaseValue(str, i, rect);

    
    return [rect, i - iStart];
}

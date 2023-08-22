class ShapeBooleanValue
extends ShapeValue
{
    operation;
    children;



    constructor(nodeId, operation, children)
    {
        super(BOOLEAN_VALUE, nodeId);

        this.operation = operation;
        this.children  = children;

        this.objects = 
            children.objects
            ? children.objects.map(o => o.copy())
            : null;
    }



    copy()
    {
        const copy = new ShapeGroupValue(
            this.nodeId,
            this.operation.copy(),
            this.children .copy());

        copy.copyBase(this);

        return copy;
    }



    equals(bool)
    {
        return bool
            && this.operation.equals(bool.operation)
            && this.children .equals(bool.children );
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.operation.toString()
            + ' ' + this.children .toString();
    }



    toPreviewString()
    {
        return      this.operation.toPreviewString()
            + ' ' + this.children .toPreviewString();
    }



    toDisplayString()
    {
        return      this.operation.toDisplayString()
            + ' ' + this.children .toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.operation.isValid()
            && this.children .isValid();
    }


    
    static NaN = new ShapeBooleanValue(
        '',
        NumberValue.NaN,
        ListValue  .NaN);
}



function parseShapeBooleanValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [ShapeBooleanValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const operation = parseNumberValue(str[i]); i += operation[1];
    const children  = parseListValue  (str, i); i += children [1];

    const bool = new ShapeBooleanValue(
        '', // set node ID elsewhere
        operation[0],
        children [0]);


    i = parseShapeBaseValue(str, i, bool);

    
    return [bool, i - iStart];
}

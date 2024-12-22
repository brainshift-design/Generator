class ShapeBooleanValue
extends ShapeValue
{
    static { GNode.types[SHAPE_BOOLEAN_VALUE] = this; }



    operation;
    children;



    constructor(nodeId, children, operation)
    {
        super(SHAPE_BOOLEAN_VALUE, nodeId, 'boolean');

        this.children  = children;
        this.operation = operation;

        this.objects = 
            children.objects
            ? children.objects.map(o => o.copy())
            : null;
    }



    copy()
    {
        const copy = new ShapeBooleanValue(
            this.nodeId,
            this.children .copy(),
            this.operation.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(bool)
    {
        return bool
            && this.children .equals(bool.children )
            && this.operation.equals(bool.operation);
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.children .toString()
            + ' ' + this.operation.toString();
    }



    toPreviewString()
    {
        return      this.children .toPreviewString()
            + ' ' + this.operation.toPreviewString();
    }



    toDisplayString()
    {
        return      this.children .toDisplayString()
            + ' ' + this.operation.toDisplayString();
    }



    toNewValue()
    {
        return this.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.children .isValid()
            && this.operation.isValid();
    }


    
    static NaN()
    {
        return new ShapeBooleanValue(
            '',
            ListValue  .NaN(),
            NumberValue.NaN());
    }
}



function parseShapeBooleanValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [ShapeBooleanValue.NaN(), 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const children  = ListValue.parse  (str, i); i += children [1];
    const operation = NumberValue.parse(str[i]); i += operation[1];

    const bool = new ShapeBooleanValue(
        '', // set node ID elsewhere
        children [0],
        operation[0]);


    i = parseShapeBaseValue(str, i, bool);

    
    return [bool, i - iStart];
}

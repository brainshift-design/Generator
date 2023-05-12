class ShapeGroupValue
extends ShapeValue
{
    children;



    constructor(nodeId, children)
    {
        super(SHAPE_GROUP_VALUE, nodeId);

        this.children = children;

        this.objects  = children.objects.map(o => o.copy());
    }



    copy()
    {
        const copy = new ShapeGroupValue(
            this.nodeId,
            this.children.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(group)
    {
        return group
            && this.children.equals(group.children);
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return this.children.toString();
    }



    toDisplayString()
    {
        return this.children.toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return this.children.isValid()
            && super.isValid();
    }


    
    static NaN = new ShapeGroupValue(
        '',
        ListValue.NaN);
}



function parseShapeGroupValue(str, i = -1)
{
    if (   i <  0 && str    == NAN_DISPLAY
        || i >= 0 && str[i] == NAN_DISPLAY)
        return [ShapeGroupValue.NaN, 1];


    if (i < 0)
    {
        str = str.split(' ');
        i   = 0;
    }


    const iStart = i;

    const children = parseListValue  (str, i); i += children[1];

    const group = new ShapeGroupValue(
        '', // set node ID elsewhere
        children[0]);


    i = parseShapeBaseValue(str, i, group);

    
    return [group, i - iStart];
}

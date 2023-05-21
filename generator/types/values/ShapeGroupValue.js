class ShapeGroupValue
extends ShapeValue
{
    items = [];



    constructor(nodeId, items = [])
    {
        super(SHAPE_GROUP_VALUE, nodeId);

        this.items = items;

        //this.objects  = children.objects.map(o => o.copy());
    }



    copy()
    {
        const copy = new ShapeGroupValue(
            this.nodeId,
            this.items.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(group)
    {
        return group
            && this.items.equals(group.children);
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return this.items.toString();
    }



    toDisplayString()
    {
        return this.items.toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.items.isValid();
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

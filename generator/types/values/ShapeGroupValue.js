class ShapeGroupValue
extends ShapeValue
{
    x;
    y;
    width;
    height;
    angle;
    children;



    constructor(nodeId, x, y, width, height, angle, children)
    {
        super(SHAPE_GROUP_VALUE, nodeId);

        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
        this.angle    = angle;
        this.children = children;
    }



    copy()
    {
        const copy = new ShapeGroupValue(
            this.nodeId,
            x            .copy(),
            y            .copy(),
            width        .copy(),
            height       .copy(),
            angle        .copy(),
            this.children.copy());

        copy.copyBase(this);

        return copy;
    }



    equals(group)
    {
        return group
            && this.x       .equals(group.x       )
            && this.y       .equals(group.y       )
            && this.width   .equals(group.width   )
            && this.height  .equals(group.height  )
            && this.angle   .equals(group.angle   )
            && this.children.equals(group.children);
    }



    async eval(parse)
    {
        return this;
    }



    toString()
    {
        return      this.x       .toString()
            + ' ' + this.y       .toString()
            + ' ' + this.width   .toString()
            + ' ' + this.height  .toString()
            + ' ' + this.angle   .toString()
            + ' ' + this.children.toString();
    }



    toDisplayString()
    {
        return      this.x       .toDisplayString()
            + ' ' + this.y       .toDisplayString()
            + ' ' + this.width   .toDisplayString()
            + ' ' + this.height  .toDisplayString()
            + ' ' + this.angle   .toDisplayString()
            + ' ' + this.children.toDisplayString();
    }



    toValue()
    {
        return this.copy();
    }



    isValid()
    {
        return this.x       .isValid()
            && this.y       .isValid()
            && this.width   .isValid()
            && this.height  .isValid()
            && this.angle   .isValid()
            && this.children.isValid()
            && super.isValid();
    }


    
    static NaN = new ShapeGroupValue(
        '',
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        NumberValue.NaN,
        ListValue  .NaN);
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

    const x        = parseNumberValue(str[i]); i += x       [1];
    const y        = parseNumberValue(str[i]); i += y       [1];
    const width    = parseNumberValue(str[i]); i += width   [1];
    const height   = parseNumberValue(str[i]); i += height  [1];
    const angle    = parseNumberValue(str[i]); i += angle   [1];
    const children = parseListValue  (str, i); i += children[1];

    const group = new ShapeGroupValue(
        '', // set node ID elsewhere
        x       [0],
        y       [0],
        width   [0],
        height  [0],
        angle   [0],
        children[0]);


    i = parseShapeBaseValue(str, i, group);

    
    return [group, i - iStart];
}

/*
    This is getting closer to Figma now, so here the format changes,
    and objects hold stroke values directly, which incoming stroke values just set.
*/

class ShapeValue
extends GValue
{
    nodeId;

    props;



    constructor(type, nodeId)
    {
        super(type);

        this.nodeId = nodeId; 
    }



    copyBase(base)
    {
        this.nodeId = base.nodeId;

        this.props  = base.props.copy();
    }



    isValid()
    {
        return this.props.isValid();
    }
}



function parseShapeBaseValue(str, i, obj)
{
    const props = parseListValue(str, i); i += props[1];

    obj.props = props[0];

    return i;
}
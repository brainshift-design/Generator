// This is getting closer to Figma now, so here the format changes,
// and objects hold stroke values directly, which incoming stroke values just set.

class ShapeValue
extends GValue
{
    nodeId;

    props = null;



    constructor(type, nodeId)
    {
        super(type);

        this.nodeId = nodeId; 

        this.objects = [];
    }



    copyBase(base)
    {
        super.copyBase(base);
        
        this.nodeId  = base.nodeId;

        this.objects = base.objects.map(o => o.copy());

        if (base.props) this.props = base.props.copy();
    }



    hasInitValue()
    {
        return !this.props
            ||  this.props.hasInitValue();
    }



    isValid()
    {
        return !this.props
            ||  this.props.isValid();
    }
}



function parseShapeBaseValue(str, i, obj)
{
    const props = parseListValue(str, i); i += props[1];

    obj.props = props[0];

    return i;
}
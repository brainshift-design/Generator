class GOperator
extends GType
{
    nodeId;
    options;



    constructor(type, nodeId, options)
    {
        super(type);

        this.nodeId  = nodeId;
        this.options = options;
    }



    toValue()
    {
        return null;
    }
}

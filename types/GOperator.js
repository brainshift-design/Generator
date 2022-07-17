class GOperator
extends GType
{
    nodeId;

    valid = false;



    constructor(type, nodeId)
    {
        super(type);

        this.nodeId = nodeId;
    }
}
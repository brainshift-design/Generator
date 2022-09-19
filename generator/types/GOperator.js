class GOperator
extends GType
{
    nodeId;
    active;



    constructor(type, nodeId, active)
    {
        super(type);

        this.nodeId = nodeId;
        this.active = active;
    }
}

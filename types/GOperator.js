class GOperator
extends GType
{
    nodeId;
    valid;



    constructor(type, nodeId)
    {
        super(type);

        this.nodeId = nodeId;
        this.valid  = false;
    }



    eval(parse)
    {
        // calculate and add value update here

        return null;
    }
}
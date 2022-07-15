class GParam
extends GType
{
    nodeId;
    paramId;



    constructor(nodeId, paramId)
    {
        super(PARAM);

        this.nodeId  = nodeId;
        this.paramId = paramId;
    }



    toString()
    {
        return 'GPARAM ERROR';
    }
}
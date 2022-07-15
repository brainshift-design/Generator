class GParam
extends GType
{
    nodeId;
    paramId;

    value;



    constructor(nodeId, paramId)
    {
        super(PARAM);

        this.nodeId  = nodeId;
        this.paramId = paramId;

        this.value   = null;
    }



    toString()
    {
        return 'GPARAM ERROR';
    }
}
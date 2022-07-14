class GParam
extends GType
{
    nodeId;
    index;

    value;



    constructor(nodeId, index)
    {
        super(PARAM);

        this.nodeId = nodeId;
        this.index  = index;

        this.value  = null;
    }



    toString()
    {
        return 'GPARAM ERROR';
    }
}
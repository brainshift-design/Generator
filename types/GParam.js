class GParam
extends GOperator
{
    paramId;



    constructor(nodeId, paramId)
    {
        super(PARAM, nodeId);

        this.paramId = paramId;
    }



    eval(parse)
    {
        const val = parse.parsed.find(v =>
               v.nodeId  == this.nodeId
            && v.paramId == this.paramId);

        console.assert(val);

        return val.eval(parse);
    }
}
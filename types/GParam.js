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
        if (!this.valid)
        {
            this.result = parse.tree
                .find(v => v.nodeId  == this.nodeId)
                .eval(parse)[this.paramId]
                .eval(parse);

            this.result = this.result.eval(parse);

            this.valid        = true;
            this.result.valid = true;
        }

        return this.result;
    }
}
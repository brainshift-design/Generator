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
            let node = parse.tree
                .find(v => v.nodeId == this.nodeId);

            if (   node.type == RECTANGLE
                || node.type == LINE
                || node.type == ELLIPSE
                || node.type == POLYGON
                || node.type == STAR)
                node = node.eval(parse);

            this.result = node[this.paramId]
                .eval(parse);

            this.result = this.result.eval(parse);

            this.valid        = true;
            this.result.valid = true;
        }

        return this.result;
    }
}
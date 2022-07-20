class GParam
extends GOperator
{
    paramId;



    constructor(nodeId, paramId)
    {
        super(PARAM, nodeId);

        this.paramId = paramId;
    }



    copy()
    {
        const param = new GParam(this.nodeId, this.paramId);
        return param;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = parse.parsedNodes.find(v => 
                v.nodeId == this.nodeId);

            if (   this.result.type == RECTANGLE
                || this.result.type == LINE
                || this.result.type == ELLIPSE
                || this.result.type == POLYGON
                || this.result.type == STAR)
                //|| this.result.type == TEXT)
                this.result = this.result.eval(parse).copy();

            this.result = this.result[this.paramId].eval(parse).copy();

            this.valid        = true;
            this.result.valid = true;
        }

        return this.result;
    }
}
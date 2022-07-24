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
            this.result = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
            console.assert(this.result, 'can\'t find parameter node \'' + this.nodeId + '\'');

            if (   COLOR_TYPES   .includes(this.result.type)
                || GEOMETRY_TYPES.includes(this.result.type))
                this.result = this.result.eval(parse).copy();

            this.result = this.result[this.paramId].eval(parse).copy();


            this.result.valid = true;
            this.valid        = true;
        }


        return this.result;
    }
}
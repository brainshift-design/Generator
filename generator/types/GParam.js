class GParam
extends GOperator
{
    paramId;



    constructor(nodeId, paramId)
    {
        super(PARAM, nodeId, false);

        this.paramId = paramId;
    }



    copy()
    {
        return new GParam(this.nodeId, this.paramId);
    }



    eval(parse)
    {
        if (!this.valid)
        {
            const node = parse.parsedNodes.find(v => v.nodeId == this.nodeId).result;
            console.assert(node, 'can\'t find parameter node \'' + this.nodeId + '\'');


            this.result = node[this.paramId].eval(parse).copy();

            
            this.result.valid = true;
            this.valid        = true;
        }


        return this.result;
    }
}
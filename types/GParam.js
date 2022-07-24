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
            const node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
            //console.log('this.nodeId = ', this.nodeId);
            console.assert(node, 'can\'t find parameter node \'' + this.nodeId + '\'');

            // if (   COLOR_TYPES   .includes(node.type)
            //     || GEOMETRY_TYPES.includes(node.type))
                //this.result = this.result.eval(parse).copy();

            this.result = node[this.paramId].eval(parse).copy();


            this.result.valid = true;
            this.valid        = true;
        }


        return this.result;
    }
}
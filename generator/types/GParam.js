class GParam
extends GOperator
{
    paramId;

    node;



    constructor(nodeId, paramId)
    {
        super(PARAM, nodeId, false);

        this.paramId = paramId;
    }



    copy()
    {
        const param = new GParam(this.nodeId, this.paramId);

        param.copyBase(this);

        param.node = this.node;

        return param;
    }



    eval(parse)
    {
        if (this.valid)
            return;


        this.node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
        console.assert(this.node, 'can\'t find parameter node \'' + this.nodeId + '\'');


        const param = this.node[this.paramId];
        
        param.eval(parse);


        this.valid = param.valid;

        return this;
    }



    toValue()
    {
        console.assert(this.node, 'invalid parameter node \'' + this.nodeId + '\'');
        return this.node[this.paramId].toValue();
    }
}
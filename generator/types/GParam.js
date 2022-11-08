class GParam
extends GOperator
{
    paramId;
    
    node;
    param;
    


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
        // if (this.valid)
        //     return this.param;


        this.node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
        console.assert(this.node, 'can\'t find parameter node \'' + this.nodeId + '\'');

        this.param = this.node[this.paramId];
        this.param.eval(parse);


        // this.valid = this.param.valid;

        return this.param;//this;
    }



    // toValue()
    // {
    //     //console.assert(this.node, 'invalid parameter node \'' + this.nodeId + '\'');
    //     return this.param.toValue();//this.node[this.paramId].toValue();
    // }
}
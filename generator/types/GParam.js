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
        this.node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
        console.assert(this.node, 'can\'t find parameter node \'' + this.nodeId + '\'');

        this.node.eval(parse);
        console.log('this.node =', this.node);
        console.log('this.paramId =', this.paramId);
        
        this.param = this.node.getParamFromId(this.paramId);
        this.param.eval(parse);
        
        return this.param.toValue();
    }
}
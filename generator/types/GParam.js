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
        const copy = new GParam(this.nodeId, this.paramId);

        copy.copyBase(this);

        copy.node = this.node;
    
        return copy;
    }



    eval(parse)
    {
        this.node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
        console.assert(this.node, 'can\'t find parameter node \'' + this.nodeId + '\'');

        this.node.eval(parse);
        
        this.param = this.node.getParamFromId(this.paramId);

        if (isValid(this.param)) // could have been deleted from OpRepeat for example
            return this.param.eval(parse).toValue();
        else
            return NullValue;
    }
}
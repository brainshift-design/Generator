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



    async eval(parse)
    {
        this.node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
        consoleAssert(this.node, 'can\'t find parameter node \'' + this.nodeId + '\'');


        await this.node.eval(parse);


        this.param = this.node.paramFromId(this.paramId);

        if (this.node.type == ITEMS)
            this.param = this.node[this.paramId];

        
        if (isValid(this.param))
        {
            const value = (await this.param.eval(parse)).toValue();
            this.value = value;
            
            return this.value;
        }
        else
            return this.value = NullValue.copy();
    }



    isCached()
    {
        return super.isCached();
//            && this.node.isCached();
    }



    toValue()
    {
        return this.value.copy();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.node) this.node.pushValueUpdates(parse);
    }


    
    invalidateInputs(parse, from)
    {
        super.invalidateInputs(parse, from);

        if (this.node) this.node.invalidateInputs(parse, from);
    }



    initLoop(parse, nodeId)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        node.initLoop(parse, nodeId);
    }



    invalidateLoop(parse, nodeId)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        node.invalidateLoop(parse, nodeId);
    }



    iterateLoop(parse)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        node.iterateLoop(parse);
    }



    resetLoop(parse, nodeId)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        node.resetLoop(parse, nodeId);
    }
}
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



    reset()
    {
        if (this.node)
            this.node.reset();
    }



    copy()
    {
        const copy = new GParam(this.nodeId, this.paramId);

        copy.copyBase(this);

        copy.node = this.node;
    
        return copy;
    }



    getConditionNode()
    {
        return this.node
             ? this.node.getConditionNode()
             : null;
    }



    async eval(parse)
    {
        this.node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
        consoleAssert(this.node, 'can\'t find parameter node \'' + this.nodeId + '\'');


        if (    this.node.type != EXPAND
            || !this.node.cachedValue)
            await this.node.eval(parse);


        this.param = this.node.paramFromId(this.paramId);


        if (isValid(this.param))
        {
            if (   this.node.type != FEEDBACK
                && this.paramId != 'from')
                this.value = await evalValue(this.param, parse);
            else
                this.value = new NullValue();

                
            return this.value
                 ? this.value.copy()
                 : null;
        }
        else
            return this.value = new NullValue();
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
    


    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);
        
        if (this.node) this.node.invalidateInputs(parse, from, force);
    }



    initLoop(parse, nodeId)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        
        node.initLoop(parse, nodeId);
    }



    iterateCache(parse, from)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        //if (this.node.nodeId == 'start') console.log('node =', node);

        node.iterateCache(parse, from);
    }



    invalidateLoop(parse, nodeId)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        
        node.invalidateLoop(parse, nodeId);
    }



    initLoop(parse, nodeId)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        
        node.initLoop(parse, nodeId);
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
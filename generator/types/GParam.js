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


        if (    this.node.type != LIST
            || !this.node.cachedValue)
            await this.node.eval(parse);


        this.param = this.node.paramFromId(this.paramId);


        if (this.node.nodeId == 'rect')
        {
            console.log('this.paramId =', this.paramId);
            console.log('this.param =', this.param);
        }

        if (isValid(this.param))
        {
            // await this.node.eval(parse);
            const value = (await this.param.eval(parse)).toValue();
            this.value = value;
            
            return this.value;
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
        const node = parse.parsedNodes.find(n => n.nodeId == from.nodeId);
        
        node.iterateCache(parse, from);
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



    // pushValueUpdates(parse)
    // {
    //     super.pushValueUpdates(parse);

    //     //if (this.node) this.node.pushValueUpdates(parse);
    // }


    
    // invalidateInputs(parse, from, force)
    // {
    //     super.invalidateInputs(parse, from, force);

    //     // if (this.node) this.node.invalidateInputs(parse, from, force);
    // }



    // initLoop(parse, nodeId)
    // {
    //     super.initLoop(parse, nodeId);

    //     // const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
    //     // node.initLoop(parse, nodeId);
    // }



    // invalidateLoop(parse, nodeId)
    // {
    //     // const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
    //     // node.invalidateLoop(parse, nodeId);
    // }



    // iterateLoop(parse)
    // {
    //     super.iterateLoop(parse);

    //     // const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
    //     // node.iterateLoop(parse);
    // }



    // resetLoop(parse, nodeId)
    // {
    //     super.resetLoop(parse, nodeId);

    //     // const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
    //     // node.resetLoop(parse, nodeId);
    // }
}
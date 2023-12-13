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



    getOrderNode()
    {
        return this.node
             ? this.node.getOrderNode()
             : null;
    }



    async eval(parse)
    {
        this.node = parse.parsedNodes.find(v => v.nodeId == this.nodeId);
        consoleAssert(this.node, 'can\'t find parameter node \'' + this.nodeId + '\'');


        if (this.node.type != LIST)
            await this.node.eval(parse);


        this.param = this.node.paramFromId(this.paramId);

        if (this.node.type == LIST)
            this.param = this.node[this.paramId];//.copy();
        

        if (isValid(this.param))
        {
            const value = (await this.param.eval(parse)).toValue();
            this.value = value;
            
            return this.value;
        }
        else
            return this.value = new NullValue();
        
        
        // this.param = 
        //     this.node.type == LIST
        //     ? this.node[this.paramId]//.copy();
        //     : this.node.paramFromId(this.paramId);

        
        // if (isValid(this.param))
        // {
        //     // const value = (await this.param.eval(parse)).toValue();
        //     // this.value = value;
        //     this.value = this.param;
        // }
        // else
        //     this.value = new NullValue();


        // this.validate();

        // return this;
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



    // iterateList(parse, from)
    // {
    //     const node = parse.parsedNodes.find(n => n.nodeId == from.nodeId);
        
    //     node.iterateList(parse, nodeId);
    // }



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
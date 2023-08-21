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


        //this.param.feedbackValue = this.feedbackValue;

        this.node.feedbackValue = this.feedbackValue;
        await this.node.eval(parse);
        this.node.feedbackValue = null;


        this.param = this.node.paramFromId(this.paramId);

        if (this.node.type == ITEMS)
            this.param = this.node[this.paramId];

        
        if (isValid(this.param))
        {
            // if (   this.feedbackValue)
            //     //&& this.param.type == NUMBER_VALUE)
            //     this.param = this.feedbackValue();
            
            const value = (await this.param.eval(parse)).toValue();
            this.value = value;
            
            //this.param.feedbackValue = null;
            return this.value;
        }
        else
        {
            //this.param.feedbackValue = null;
            return this.value = NullValue.copy();
        }
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



    resetLoop(parse, nodeId)
    {
        const node = parse.parsedNodes.find(n => n.nodeId == this.nodeId);
        node.resetLoop(parse, nodeId);
    }
}
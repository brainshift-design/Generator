class GLayerMask
extends GOperator
{
    static { GNode.types[LAYER_MASK] = this; }



    maskType;



    constructor(nodeId, options)
    {
        super(LAYER_MASK, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.maskType = null;
    }



    copy()
    {
        const copy = new GLayerMask(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.maskType) copy.maskType = this.maskType.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const maskType = await evalNumberValue(this.maskType, parse);


        this.value = new LayerMaskValue(maskType, this.options.enabled);


        this.setUpdateValues(parse, 
        [
            ['maskType', maskType]
        ]);


        this.validate();

        return this;
    }



    toNewValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return this.maskType && this.maskType.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.maskType) this.maskType.pushValueUpdates(parse);
    }
    
    
    
    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.maskType) this.maskType.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.maskType) this.maskType.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const mask = new GLayerMask(nodeId, options);
    
    
        if (parse.settings.logRequests) 
            logReq(mask, parse, ignore);
    
    
        if (ignore)
        {
            genParseNodeEnd(parse, mask);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        mask.maskType = genParse(parse);
        
        
        genParseNodeEnd(parse, mask);
        return mask;
    }
}
class GOperator
extends GNode
{
    nodeId;

    valid; // has been evaluated
    topLevel;

    value;

    
    
    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId   = nodeId;

        this.valid    = false;
        this.topLevel = false;
    }



    copyBase(src)
    {
        super.copyBase(src);
        
        this.nodeId = src.nodeId;
    }



    getParamFromId(paramId)
    {
        return this[paramId];
    }



    isCached()
    {
        //console.log(this.nodeId + '.options.cached =', this.options.cached);
        return this.options.cached
            && this.valid;
    }



    eval(parse)
    {
        // calculate and add value update here

        return this;
    }



    toValue()
    {
        return null;
    }
}
class GOperator
extends GNode
{
    nodeId;
    nodeName;

    valid; // has been evaluated
    topLevel;

    value;

   
    
    constructor(type, nodeId, options)
    {
        super(type, options);

        this.nodeId       = nodeId;
        this.nodeName     = options.nodeName;

        this.valid        = false;
        this.topLevel     = false;

        this.value        = null;
    }



    copyBase(src)
    {
        super.copyBase(src);
        
        this.nodeId   = src.nodeId;
        this.nodeName = src.nodeName;

        this.valid    = src.valid;
        this.topLevel = src.topLevel;
    }



    getParamFromId(paramId)
    {
        return this[paramId];
    }



    isCached()
    {
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
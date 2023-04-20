class GOperator
extends GNode
{
    nodeId;
    nodeName;

    valid; // has been evaluated
    topLevel;

    value;

   
    feedbackValue = null; // () => {}

    
    
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



    paramFromId(paramId)
    {
        return this[paramId];
    }



    isCached()
    {
        return this.options.cached
            && this.valid;
    }



    async eval(parse)
    {
        // calculate and add value update here

        return this;
    }



    toValue()
    {
        return null;
    }



    // isValid()
    // {
    //     return this.valid;
    // }
}
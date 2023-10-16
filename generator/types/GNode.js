class GNode
{
    static nextUniqueId = 0;

    type;


    valid; // has been evaluated

    listId        = -1;
    uniqueId;

    cached        = true;
    unknown       = false;

    loopId        = NULL;

    iteration     = 0;
    iterated      = false;


    updateValues  = null;



    constructor(type, options) 
    {
        this.type    = type;

        if (options && options.cached ) this.cached  = options.cached;
        if (options && options.unknown) this.unknown = options.unknown;
     
        this.uniqueId = GNode.nextUniqueId++;
    }



    reset()
    {
        //this.listId       = -1;
    
        //this.cached       = true;
        //this.unknown      = false;
    
        //this.loopId       = NULL;
    
        //this.iteration    = 0;
        //this.iterated     = false;
    
        this.updateValues = null;
    }



    copy()
    {
        consoleError('abstract type GNode cannot be copied');
        return null;
    }



    copyBase(base)
    {
        //this.data     = clone(base.data);
        this.uniqueId = base.uniqueId;
    }



    getOrderNode()
    {
        if (   this.input
            && this.input.getOrderNode)
            return this.input.getOrderNode();
        
        return this;
    }

    

    toValue()
    {
        return null;
    }



    toString() 
    { 
        return this.type; 
    }



    toJson()
    {
        return this.toString();
    }



    isValid() // is a valid value
    {
        return false;
    }


    
    validate()
    {
        this.valid = true;
    }



    pushValueUpdates(parse)
    {

    }



    invalidateInputs(parse, from, force = false)
    {
        if (   this.unknown
            || force)
            this.valid = false;

        return true;
    }



    initLoop(parse, nodeId)
    {

    }



    invalidateLoop(parse, nodeId)
    {

    }



    iterateLoop(parse)
    {

    }



    resetLoop(parse, nodeId)
    {

    }    
}

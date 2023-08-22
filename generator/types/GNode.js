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


    updateValues  = null;



    constructor(type, options) 
    {
        this.type    = type;

        if (options && options.cached ) this.cached  = options.cached;
        if (options && options.unknown) this.unknown = options.unknown;
     
        this.uniqueId = GNode.nextUniqueId++;
    }



    copy()
    {
        consoleError('abstract type GNode cannot be copied');
        return null;
    }



    copyBase(base)
    {
        this.data     = clone(base.data   );

        this.uniqueId = base.uniqueId;
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



    invalidateInputs(parse, from)
    {
        if (this.unknown)
            this.valid = false;

        this.iterateLoop(parse);

        return true;
    }



    initLoop(parse, nodeId)
    {
        this.loopId    = nodeId;
        this.iteration = 0;
    }



    invalidateLoop(parse, nodeId)
    {
        this.valid = false;
    }



    iterateLoop(parse)
    {
        const repeatIndex = parse.repeats.findIndex(r => r.repeatId == this.loopId);
        
        if (   repeatIndex < 0
            || repeatIndex == parse.repeats.length-1)
            this.iteration++;
    }



    resetLoop(parse, nodeId)
    {
        this.valid     = false;
        this.iteration = 0;
    }    
}

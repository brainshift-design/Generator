class GNode
{
    static nextUniqueId = 0;

    type;


    valid; // has been evaluated

    listId        = -1;
    uniqueId;


    options       = {};
    data          = {}; // for type conversion info


    updateValues  = [];


    loopId        = NULL;

    iteration     = 0;



    constructor(type, options) 
    {
        this.type     = type;
        this.options  = options;

        this.uniqueId = GNode.nextUniqueId++;
    }



    copy()
    {
        consoleError('abstract type GNode cannot be copied');
        return null;
    }



    copyBase(base)
    {
        this.options  = clone(base.options);
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


    
    pushValueUpdates(parse)
    {
        for (const value of this.updateValues)
            genPushUpdateValue(parse, this.nodeId, value[0], value[1]);

        if (this.isValid())
            this.updateValues = [];
    }



    validate()
    {
        this.valid = true;
    }



    invalidateInputs(parse, from)
    {
        if (   this.options
            && this.options.unknown)
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

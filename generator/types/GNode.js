class GNode
{
    static nextUniqueId = 0;

    type;


    valid; // has been evaluated

    listId       = -1;
    uniqueId;

    iteration    = 0;

    options      = {};
    data         = {}; // for type conversion info


    updateValues = [];



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
    }



    validate()
    {
        this.valid = true;
        this.iteration++;
    }



    invalidateInputs(from)
    {
        if (   this.options
            && this.options.unknown)
            this.valid = false;

        return true;
    }



    invalidateLoop(parse, nodeId)
    {
        let _this = this;

        if (_this.type == PARAM)
            _this = parse.parsedNodes.find(n => n.nodeId == _this.nodeId);

        _this.valid  = false;
        _this.loopId = nodeId;
    }
}

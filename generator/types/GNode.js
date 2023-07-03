class GNode
{
    type;


    valid; // has been evaluated

    listId       = -1;

    iteration    = 0;

    options      = {};
    data         = {}; // for type conversion info


    updateValues = [];



    constructor(type, options) 
    {
        this.type    = type;
        this.options = options;
    }



    copy()
    {
        consoleError('abstract type GNode cannot be copied');
        return null;
    }



    copyBase(base)
    {
        this.options = clone(base.options);
        this.data    = clone(base.data   );
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
}

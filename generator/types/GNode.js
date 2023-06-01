class GNode
{
    type;


    valid; // has been evaluated

    listId       = -1;

    iteration    = 0;

    options      = {};
    data         = {}; // for type conversion info

    updateValues = [];


    objects      = []; 



    constructor(type, options) 
    {
        this.type    = type;
        this.options = options;
    }



    copy()
    {
        console.assert(false, 'abstract type GNode cannot be copied');
        return null;
    }



    copyBase(base)
    {
        this.options = clone(base.options);
        this.data    = clone(base.data   );

        this.copyObjects(base.objects);
    }



    copyObjects(objects)
    {
        this.objects = objects.map(o => o.copy());
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
        this.valid = false;
    }
}

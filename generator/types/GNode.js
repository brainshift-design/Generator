class GNode
{
    type;

    options = {};
    data    = {}; // for type conversion info

    targets = []; // clients of this object that use its data



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



    copyBase(src)
    {
        this.options  = clone(src.options);
        this.data     = clone(src.data);
    }



    validate()
    {
        this.valid = true;
    }



    isValid() // is a valid value
    {
        return false;
    }



    invalidateForward(parse)
    {
        this.targets.forEach(t => 
        {
            t.valid = false;
            t.invalidateForward(parse);
        });
    }



    toValue()
    {
        return null;
    }



    toString() 
    { 
        return this.type; 
    }
}

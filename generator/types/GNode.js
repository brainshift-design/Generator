class GNode
{
    type;


    valid; // has been evaluated

    listId  = -1;

    options = {};
    data    = {}; // for type conversion info



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



    invalidate()
    {
        this.valid = false;
    }
}

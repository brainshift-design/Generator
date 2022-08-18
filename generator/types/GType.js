class GType
{
    type;

    result;
    valid; // has been evaluated

    topLevel;



    constructor(type) 
    {
        this.type     = type;

        this.result   = null;
        this.valid    = false;

        this.topLevel = false;
    }



    copy()
    {
        return null;
    }



    isValid() // is a valid value
    {
        return false;
    }



    equalChans(c1, c2)
    {
        return !c1 && !c2
            ||  c1 && c2 && c1.equals(c2);
    }


    eval(parse)
    {
        // calculate and add value update here

        return null;
    }



    toString() 
    { 
        return type; 
    }
}
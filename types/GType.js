class GType
{
    type;

    result;
    valid; // has been evaluated



    constructor(type) 
    {
        this.type   = type;

        this.result = null;
        this.valid  = false;
    }



    isValid() // is a valid value
    {
        return false;
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
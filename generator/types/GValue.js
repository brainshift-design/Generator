class GValue
{
    type;

    valid; // has been evaluated
    topLevel;

    options = {};

    data    = {}; // for type conversion info



    constructor(type, options) 
    {
        this.type     = type;
       
        this.valid    = true;
        this.topLevel = false;

        this.options  = options;
    }



    copy()
    {
        console.assert(false, 'abstract class GValue cannot be copied');
        return null;
    }



    copyBase(src)
    {
        this.valid    = src.valid;
        this.topLevel = src.topLevel;

        this.options  = clone(src.options);
        this.data     = clone(src.data);
    }



    isValid() // is a valid value
    {
        return false;
    }



    equalChans(c1, c2)
    {
        return !c1 && !c2
            ||  c1 &&  c2 && c1.equals(c2);
    }


    eval(parse)
    {
        // calculate and add value update here

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
}



function displayValue(type, value)
{
    if (   type == NUMBER_VALUE
        && value.indexOf(',') < 0)
        return value;


    switch (type)
    {
        case NUMBER_VALUE:    return parseNumberValue   (value)[0].toDisplayString();
        case COLOR_VALUE:     return parseColorValue    (value)[0].toDisplayString();
        case FILL_VALUE:      return parseFillValue     (value)[0].toDisplayString();
        case STROKE_VALUE:    return parseStrokeValue   (value)[0].toDisplayString();
        case RECTANGLE_VALUE: return parseRectangleValue(value)[0].toDisplayString();
    }


    console.assert(false, 'cannot display value of type \'' + type + '\'');
}
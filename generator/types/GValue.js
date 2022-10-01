class GValue
{
    type;

    valid; // has been evaluated

    topLevel;


    data = {}; // for type conversion info


    constructor(type) 
    {
        this.type     = type;

        this.valid    = false;

        this.topLevel = false;
    }



    copy()
    {
        return null;
    }



    copyBaseData(obj)
    {
        this.data = clone(obj.data);
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



    toValue()
    {
        
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
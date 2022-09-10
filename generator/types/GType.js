class GType
{
    type;

    result;
    valid; // has been evaluated

    topLevel;


    data = {}; // for type conversion info


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


    let val;

    switch (type)
    {
        case NUMBER_VALUE:    val = parseNumberValue   (value)[0]; break;
        case COLOR_VALUE:     val = parseColorValue    (value)[0]; break;
        case FILL_VALUE:      val = parseFillValue     (value)[0]; break;
        case STROKE_VALUE:    val = parseStrokeValue   (value)[0]; break;
        case RECTANGLE_VALUE: val = parseRectangleValue(value)[0]; break;
    }

    return val.toDisplayString();
}
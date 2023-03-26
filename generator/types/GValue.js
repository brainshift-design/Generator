class GValue
extends GNode
{
    constructor(type, options) 
    {
        super(type, options);
    }



    copy()
    {
        console.assert(false, 'abstract class GValue cannot be copied');
        return null;
    }



    toValue()
    {
        return this.copy();
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
        //case      LIST_VALUE: return parseListValue     (value)[0].toDisplayString();
        case    NUMBER_VALUE: return parseNumberValue   (value)[0].toDisplayString();
        case     COLOR_VALUE: return parseColorValue    (value)[0].toDisplayString();
        // case RECTANGLE_VALUE: return parseRectangleValue(value)[0].toDisplayString();
        // case      LINE_VALUE: return parseLineValue     (value)[0].toDisplayString();
        // case   ELLIPSE_VALUE: return parseEllipseValue  (value)[0].toDisplayString();
        // case   POLYGON_VALUE: return parsePolygonValue  (value)[0].toDisplayString();
        // case      STAR_VALUE: return parseStarValue     (value)[0].toDisplayString();
        case      FILL_VALUE: return parseFillValue     (value)[0].toDisplayString();
        case    STROKE_VALUE: return parseStrokeValue   (value)[0].toDisplayString();
    }


    console.assert(false, 'cannot display value of type \'' + type + '\'');
}
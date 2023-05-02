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



    // eval()
    // {
    //     return this;
    // }



    toValue()
    {
        return this.copy();
    }



    toJson() 
    { 
        return this.toString(); 
    }



    toString() 
    { 
        return this.type; 
    }



    toDisplayString()
    {
        return this.toString();
    }



    toJsCode(gen)
    {
        console.assert(false, 'invalid abstract method');
        return '';
    }



    getNaN()
    {
        console.assert(false, 'invalid abstract method');
        return null;
    }



    isCached()
    {
        return true;
    }
}



function displayValue(type, value)
{
    if (   type == NUMBER_VALUE
        && value.indexOf(',') < 0)
        return value;


    switch (type)
    {
        case      NUMBER_VALUE: return parseNumberValue    (value)[0].toDisplayString();
        case       COLOR_VALUE: return parseColorValue     (value)[0].toDisplayString();
        case        TEXT_VALUE: const val = parseTextValue (value)[0]; return val == '' ? '\'\'' : val.toDisplayString();
        case   RECTANGLE_VALUE: return parseRectangleValue (value)[0].toDisplayString();
        case        LINE_VALUE: return parseLineValue      (value)[0].toDisplayString();
        case     ELLIPSE_VALUE: return parseEllipseValue   (value)[0].toDisplayString();
        case     POLYGON_VALUE: return parsePolygonValue   (value)[0].toDisplayString();
        case        STAR_VALUE: return parseStarValue      (value)[0].toDisplayString();
        case   TEXTSHAPE_VALUE: return parseTextShapeValue (value)[0].toDisplayString();
        case       POINT_VALUE: return parsePointValue     (value)[0].toDisplayString();
        case VECTOR_PATH_VALUE: return parseVectorPathValue(value)[0].toDisplayString();
        case        FILL_VALUE: return parseFillValue      (value)[0].toDisplayString();
        case      STROKE_VALUE: return parseStrokeValue    (value)[0].toDisplayString();
        case        LIST_VALUE: return parseListValue      (value)[0].toDisplayString();
    }


    console.assert(false, 'cannot display value of type \'' + type + '\'');
}



function nullFromType(type)
{
    switch (type)
    {
        case      NUMBER_VALUE: return     NumberValue.NaN;
        case       COLOR_VALUE: return      ColorValue.NaN;
        case        TEXT_VALUE: return new TextValue();
        case   RECTANGLE_VALUE: return  RectangleValue.NaN;
        case        LINE_VALUE: return       LineValue.NaN;
        case     ELLIPSE_VALUE: return    EllipseValue.NaN;
        case     POLYGON_VALUE: return    PolygonValue.NaN;
        case        STAR_VALUE: return       StarValue.NaN;
        case   TEXTSHAPE_VALUE: return  TextShapeValue.NaN;
        case       POINT_VALUE: return      PointValue.NaN;
        case VECTOR_PATH_VALUE: return VectorPathValue.NaN;
        case        FILL_VALUE: return       FillValue.NaN;
        case      STROKE_VALUE: return     StrokeValue.NaN;
        case        LIST_VALUE: return       ListValue.NaN;
    }

    console.assert(false, 'cannot determine null value from type \'' + type + '\'');
}
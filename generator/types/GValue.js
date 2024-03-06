class GValue
//extends GNode
{
    type;
    valueId;

    customParams = []; // [[name, GValue]]

    objects = null;



    constructor(type) 
    {
        //super(type, options);

        this.type = type;

        this.valueId = '';
    }



    reset() {}



    copy()
    {
        consoleError('abstract class GValue cannot be copied');
        return null;
    }



    copyBase(base)
    {
        //super.copyBase(base);
        
        this.valueId = base.valueId;

        this.copyCustomParams(base);

        if (base.objects)
            this.copyObjects(base.objects);
    }



    copyCustomParams(base)
    {
        for (const param of base.customParams)
            this.customParams.push([param[0], param[1].copy()]);
    }



    copyObjects(objects)
    {
        this.objects = objects.map(o => o.copy());
    }



    // eval()
    // {
    //     return this;
    // }



    hasInitValue()
    {
        return false;
    }



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
        consoleError('invalid abstract method');
        return '';
    }



    getNaN()
    {
        consoleError('invalid abstract method');
        return null;
    }



    isCached()
    {
        return true;
    }



    pushValueUpdates(parse)              {}
    invalidateInputs(parse, from, force) {}
    iterateLoop     (parse)              {}
}



function parseValueFromType(type, value)
{
    switch (type)
    {
        case            ANY_VALUE: return parseNullValue         (value)[0];

        case           LIST_VALUE: 
        case    NUMBER_LIST_VALUE: 
        case      TEXT_LIST_VALUE: 
        case     SHAPE_LIST_VALUE: return parseListValue         (value)[0];

        case         NUMBER_VALUE: return parseNumberValue       (value)[0];
        case           TEXT_VALUE: return parseTextValue         (value)[0];
        case          COLOR_VALUE: return parseColorValue        (value)[0];

        case           FILL_VALUE: return parseFillValue         (value)[0];
        case     COLOR_STOP_VALUE: return parseColorStopValue    (value)[0];
        case       GRADIENT_VALUE: return parseGradientValue     (value)[0];
        case         STROKE_VALUE: return parseStrokeValue       (value)[0];
        case    DROP_SHADOW_VALUE: return parseDropShadowValue   (value)[0];
        case   INNER_SHADOW_VALUE: return parseInnerShadowValue  (value)[0];
        case     LAYER_BLUR_VALUE: return parseLayerBlurValue    (value)[0];
        case      BACK_BLUR_VALUE: return parseBackBlurValue     (value)[0];
        case    LAYER_BLEND_VALUE: return parseLayerBlendValue   (value)[0];
        case     LAYER_MASK_VALUE: return parseLayerMaskValue    (value)[0];

        case      RECTANGLE_VALUE: return parseRectangleValue    (value)[0];
        case           LINE_VALUE: return parseLineValue         (value)[0];
        case        ELLIPSE_VALUE: return parseEllipseValue      (value)[0];
        case        TRAPEZE_VALUE: return parseTrapezeValue      (value)[0];
        case        POLYGON_VALUE: return parsePolygonValue      (value)[0];
        case           STAR_VALUE: return parseStarValue         (value)[0];
        case     TEXT_SHAPE_VALUE: return parseTextShapeValue    (value)[0];
        case          POINT_VALUE: return parsePointValue        (value)[0];
        case    VECTOR_PATH_VALUE: return parseVectorPathValue   (value)[0];
        case  VECTOR_VERTEX_VALUE: return parseVectorVertexValue (value)[0];
        case    VECTOR_EDGE_VALUE: return parseVectorEdgeValue   (value)[0];
        case  VECTOR_REGION_VALUE: return parseVectorRegionValue (value)[0];
        case VECTOR_NETWORK_VALUE: return parseVectorNetworkValue(value)[0];
        case        BOOLEAN_VALUE: return parseShapeBooleanValue (value)[0];
        case    SHAPE_GROUP_VALUE: return parseShapeGroupValue   (value)[0];
        case       ARC_PATH_VALUE: return parseArcPathValue      (value)[0];
        case      WAVE_PATH_VALUE: return parseWavePathValue     (value)[0];
        case          FRAME_VALUE: return parseFrameValue        (value)[0];
        
        default: 
            console.error('unknown type \'' + type + '\'');
            return null;
    }
}



function displayValue(type, value)
{
    if (   type == NUMBER_VALUE
        && value.indexOf(',') < 0)
        return value;


    switch (type)
    {
        case            ANY_VALUE: return parseNullValue         (value)[0].toDisplayString();
        case           LIST_VALUE: return parseListValue         (value)[0].toDisplayString();

        case         NUMBER_VALUE: return parseNumberValue       (value)[0].toDisplayString();
        case           TEXT_VALUE: const val = parseTextValue    (value)[0]; return val == '' ? '\'\'' : val.toDisplayString();
        case          COLOR_VALUE: return parseColorValue        (value)[0].toDisplayString();
        case           FILL_VALUE: return parseFillValue         (value)[0].toDisplayString();
        case     COLOR_STOP_VALUE: return parseColorStopValue    (value)[0].toDisplayString();
        case       GRADIENT_VALUE: return parseGradientValue     (value)[0].toDisplayString();
        case         STROKE_VALUE: return parseStrokeValue       (value)[0].toDisplayString();
        case    DROP_SHADOW_VALUE: return parseDropShadowValue   (value)[0].toDisplayString();
        case   INNER_SHADOW_VALUE: return parseInnerShadowValue  (value)[0].toDisplayString();
        case     LAYER_BLUR_VALUE: return parseLayerBlurValue    (value)[0].toDisplayString();
        case      BACK_BLUR_VALUE: return parseBackBlurValue     (value)[0].toDisplayString();
        case    LAYER_BLEND_VALUE: return parseLayerBlendValue   (value)[0].toDisplayString();
        case     LAYER_MASK_VALUE: return parseLayerMaskValue    (value)[0].toDisplayString();

        case      RECTANGLE_VALUE: return parseRectangleValue    (value)[0].toDisplayString();
        case           LINE_VALUE: return parseLineValue         (value)[0].toDisplayString();
        case        ELLIPSE_VALUE: return parseEllipseValue      (value)[0].toDisplayString();
        case        TRAPEZE_VALUE: return parseTrapezeValue      (value)[0].toDisplayString();
        case        POLYGON_VALUE: return parsePolygonValue      (value)[0].toDisplayString();
        case           STAR_VALUE: return parseStarValue         (value)[0].toDisplayString();
        case     TEXT_SHAPE_VALUE: return parseTextShapeValue    (value)[0].toDisplayString();
        case          POINT_VALUE: return parsePointValue        (value)[0].toDisplayString();
        case    VECTOR_PATH_VALUE: return parseVectorPathValue   (value)[0].toDisplayString();
        case  VECTOR_VERTEX_VALUE: return parseVectorVertexValue (value)[0].toDisplayString();
        case    VECTOR_EDGE_VALUE: return parseVectorEdgeValue   (value)[0].toDisplayString();
        case  VECTOR_REGION_VALUE: return parseVectorRegionValue (value)[0].toDisplayString();
        case VECTOR_NETWORK_VALUE: return parseVectorNetworkValue(value)[0].toDisplayString();
        case        BOOLEAN_VALUE: return parseShapeBooleanValue (value)[0].toDisplayString();
        case    SHAPE_GROUP_VALUE: return parseShapeGroupValue   (value)[0].toDisplayString();
        case          FRAME_VALUE: return parseFrameValue        (value)[0].toDisplayString();
    }


    consoleError('cannot display value of type \'' + type + '\'');
}



function nanFromType(type)
{
    switch (type)
    {
        case            LIST_VALUE: return          ListValue.NaN;

        case          NUMBER_VALUE: return        NumberValue.NaN;
        case            TEXT_VALUE: return        new TextValue();
        case           COLOR_VALUE: return         ColorValue.NaN;
        case            FILL_VALUE: return          FillValue.NaN;
        case      COLOR_STOP_VALUE: return     ColorStopValue.NaN;
        case        GRADIENT_VALUE: return      GradientValue.NaN;
        case          STROKE_VALUE: return        StrokeValue.NaN;
        case     DROP_SHADOW_VALUE: return    DropShadowValue.NaN;
        case    INNER_SHADOW_VALUE: return   InnerShadowValue.NaN;
        case      LAYER_BLUR_VALUE: return     LayerBlurValue.NaN;
        case       BACK_BLUR_VALUE: return      BackBlurValue.NaN;
        case     LAYER_BLEND_VALUE: return    LayerBlendValue.NaN;
        case      LAYER_MASK_VALUE: return     LayerMaskValue.NaN;

        case       RECTANGLE_VALUE: return     RectangleValue.NaN;
        case            LINE_VALUE: return          LineValue.NaN;
        case         ELLIPSE_VALUE: return       EllipseValue.NaN;
        case         POLYGON_VALUE: return       PolygonValue.NaN;
        case            STAR_VALUE: return          StarValue.NaN;
        case      TEXT_SHAPE_VALUE: return     TextShapeValue.NaN;
        case           POINT_VALUE: return         PointValue.NaN;
        case     VECTOR_PATH_VALUE: return    VectorPathValue.NaN;
        case   VECTOR_VERTEX_VALUE: return  VectorVertexValue.NaN;
        case     VECTOR_EDGE_VALUE: return    VectorEdgeValue.NaN;
        case   VECTOR_REGION_VALUE: return  VectorRegionValue.NaN;
        case  VECTOR_NETWORK_VALUE: return VectorNetworkValue.NaN;
        case         BOOLEAN_VALUE: return  ShapeBooleanValue.NaN;
        case     SHAPE_GROUP_VALUE: return    ShapeGroupValue.NaN;
        case           FRAME_VALUE: return         FrameValue.NaN;
    }

    consoleError('cannot determine null value from type \'' + type + '\'');
}
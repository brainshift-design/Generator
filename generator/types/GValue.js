class GValue
{
    type;
    valueId;

    parent;

    customParams = []; // [[name, GValue]]

    objects      = null;


    valid; // used for forced reevaluation



    constructor(type, valueId = NULL) 
    {
        this.type    = type;
        this.parent  = null;
        
        this.valueId = valueId;
        
        this.valid   = true;
    }



    reset() {}



    copy()
    {
        consoleError('abstract class GValue cannot be copied');
        return null;
    }



    copyBase(base)
    {
        this.valueId  = base.valueId;
        this.uniqueId = base.uniqueId;

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



    // getMaxDecimals()
    // {
    //     return 0;
    // }



    async eval(parse)
    {
        return this;
    }



    hasInitValue()
    {
        return false;
    }



    toValue() // returns a value directly usable by JS
    {
        console.error('cannot call abstract method GValue.toValue()');
        console.trace();
        return null;
    }



    toNewValue()
    {
        return this.copy();
    }



    toJson() 
    { 
        return this.toString(); 
    }



    toJsonText(options = {}) // for formatting values as JSON for OpToJson
    {
        let json = '';

        if (options.quoteValues === true)
            json += '"';

        json += this.toPreviewString();

        if (options.quoteValues === true)
            json += '"';

        options.lastExpanded = false;
        
        return json;
    }



    toString() 
    { 
        return this.type; 
    }



    toPreviewString()
    {
        return this.toString();
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



    static NaN()
    {
        consoleError('invalid abstract method');
        return null;
    }



    isCached()
    {
        return this.valid;
    }



    pushValueUpdates(parse)
    {

    }



    invalidateInputs(parse, from, force)
    {
        this.valid = false;
    }



    iterateLoop (parse)
    {

    }
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
        case  SHAPE_BOOLEAN_VALUE: return parseShapeBooleanValue (value)[0];
        case    SHAPE_GROUP_VALUE: return parseShapeGroupValue   (value)[0];
        case       ARC_PATH_VALUE: return parseArcPathValue      (value)[0];
        case      WAVE_PATH_VALUE: return parseWavePathValue     (value)[0];
        case          FRAME_VALUE: return parseFrameValue        (value)[0];

        case       VARIABLE_VALUE: return parseVariableValue     (value)[0];

        case           NULL_VALUE: return null;
        
        default: 
            console.error('cannot parse unknown type \'' + type + '\'');
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
        case  SHAPE_BOOLEAN_VALUE: return parseShapeBooleanValue (value)[0].toDisplayString();
        case    SHAPE_GROUP_VALUE: return parseShapeGroupValue   (value)[0].toDisplayString();
        case          FRAME_VALUE: return parseFrameValue        (value)[0].toDisplayString();
        
        case       VARIABLE_VALUE: return parseVariableValue     (value)[0].toDisplayString();

        case           NULL_VALUE: return NULL_VALUE;
    }


    consoleError('cannot display value of type \'' + type + '\'');
}



function nanFromType(type)
{
    switch (type)
    {
        case            LIST_VALUE: return          ListValue.NaN();

        case          NUMBER_VALUE: return        NumberValue.NaN();
        case            TEXT_VALUE: return          TextValue.NaN();
        case           COLOR_VALUE: return         ColorValue.NaN();
        case            FILL_VALUE: return          FillValue.NaN();
        case      COLOR_STOP_VALUE: return     ColorStopValue.NaN();
        case        GRADIENT_VALUE: return      GradientValue.NaN();
        case          STROKE_VALUE: return        StrokeValue.NaN();
        case     DROP_SHADOW_VALUE: return    DropShadowValue.NaN();
        case    INNER_SHADOW_VALUE: return   InnerShadowValue.NaN();
        case      LAYER_BLUR_VALUE: return     LayerBlurValue.NaN();
        case       BACK_BLUR_VALUE: return      BackBlurValue.NaN();
        case     LAYER_BLEND_VALUE: return    LayerBlendValue.NaN();
        case      LAYER_MASK_VALUE: return     LayerMaskValue.NaN();

        case       RECTANGLE_VALUE: return     RectangleValue.NaN();
        case            LINE_VALUE: return          LineValue.NaN();
        case         ELLIPSE_VALUE: return       EllipseValue.NaN();
        case         POLYGON_VALUE: return       PolygonValue.NaN();
        case            STAR_VALUE: return          StarValue.NaN();
        case      TEXT_SHAPE_VALUE: return     TextShapeValue.NaN();
        case           POINT_VALUE: return         PointValue.NaN();
        case     VECTOR_PATH_VALUE: return    VectorPathValue.NaN();
        case   VECTOR_VERTEX_VALUE: return  VectorVertexValue.NaN();
        case     VECTOR_EDGE_VALUE: return    VectorEdgeValue.NaN();
        case   VECTOR_REGION_VALUE: return  VectorRegionValue.NaN();
        case  VECTOR_NETWORK_VALUE: return VectorNetworkValue.NaN();
        case   SHAPE_BOOLEAN_VALUE: return  ShapeBooleanValue.NaN();
        case     SHAPE_GROUP_VALUE: return    ShapeGroupValue.NaN();
        case           FRAME_VALUE: return         FrameValue.NaN();

        case        VARIABLE_VALUE: return      VariableValue.NaN();

        case            NULL_VALUE: return          new NullValue();
    }

    consoleError('cannot determine null value from type \'' + type + '\'');
}
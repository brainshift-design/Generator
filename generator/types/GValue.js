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
        
        this.valueId = NULL;//valueId;
    
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
        case            ANY_VALUE: return NullValue                .parse(value)[0];

        case           LIST_VALUE: 
        case    NUMBER_LIST_VALUE: 
        case      TEXT_LIST_VALUE: 
        case     SHAPE_LIST_VALUE: return ListValue                .parse(value)[0];

        case         NUMBER_VALUE: return NumberValue              .parse(value)[0];
        case           TEXT_VALUE: return TextValue                .parse(value)[0];
        case          COLOR_VALUE: return ColorValue               .parse(value)[0];

        case           FILL_VALUE: return FillValue                .parse(value)[0];
        case     COLOR_STOP_VALUE: return ColorStopValue           .parse(value)[0];
        case       GRADIENT_VALUE: return GradientValue            .parse(value)[0];
        case         STROKE_VALUE: return StrokeValue              .parse(value)[0];
        case    DROP_SHADOW_VALUE: return DropShadowValue          .parse(value)[0];
        case   INNER_SHADOW_VALUE: return InnerShadowValue         .parse(value)[0];
        case     LAYER_BLUR_VALUE: return LayerBlurValue           .parse(value)[0];
        case   LAYER_PRBLUR_VALUE: return LayerBlurProgressiveValue.parse(value)[0];
        case      BACK_BLUR_VALUE: return BackBlurValue            .parse(value)[0];
        case    BACK_PRBLUR_VALUE: return BackBlurProgressiveValue .parse(value)[0];
        case  LAYER_TEXTURE_VALUE: return LayerTextureValue        .parse(value)[0];
        case    LAYER_BLEND_VALUE: return LayerBlendValue          .parse(value)[0];
        case     LAYER_MASK_VALUE: return LayerMaskValue           .parse(value)[0];

        case      RECTANGLE_VALUE: return RectangleValue           .parse(value)[0];
        case           LINE_VALUE: return LineValue                .parse(value)[0];
        case        ELLIPSE_VALUE: return EllipseValue             .parse(value)[0];
        case        TRAPEZE_VALUE: return TrapezeValue             .parse(value)[0];
        case        POLYGON_VALUE: return PolygonValue             .parse(value)[0];
        case           STAR_VALUE: return StarValue                .parse(value)[0];
        case     TEXT_SHAPE_VALUE: return TextShapeValue           .parse(value)[0];
        case          POINT_VALUE: return PointValue               .parse(value)[0];
        case         POINT3_VALUE: return PointValue3              .parse(value)[0];
        case    VECTOR_PATH_VALUE: return VectorPathValue          .parse(value)[0];
        case  VECTOR_VERTEX_VALUE: return VectorVertexValue        .parse(value)[0];
        case    VECTOR_EDGE_VALUE: return VectorEdgeValue          .parse(value)[0];
        case  VECTOR_REGION_VALUE: return VectorRegionValue        .parse(value)[0];
        case VECTOR_NETWORK_VALUE: return VectorNetworkValue       .parse(value)[0];
        case  SHAPE_BOOLEAN_VALUE: return ShapeBooleanValue        .parse(value)[0];
        case    SHAPE_GROUP_VALUE: return ShapeGroupValue          .parse(value)[0];
        case       ARC_PATH_VALUE: return ArcPathValue             .parse(value)[0];
        case      WAVE_PATH_VALUE: return WavePathValue            .parse(value)[0];
        case          FRAME_VALUE: return FrameValue               .parse(value)[0];

        case       VARIABLE_VALUE: return VariableValue            .parse(value)[0];

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
        case            ANY_VALUE: return NullValue                .parse(value)[0].toDisplayString();
        case           LIST_VALUE: return ListValue                .parse(value)[0].toDisplayString();

        case         NUMBER_VALUE: return NumberValue              .parse(value)[0].toDisplayString();
        case           TEXT_VALUE: const val = TextValue           .parse(value)[0]; return val == '' ? '\'\'' : val.toDisplayString();
        case          COLOR_VALUE: return ColorValue               .parse(value)[0].toDisplayString();
        case           FILL_VALUE: return FillValue                .parse(value)[0].toDisplayString();
        case     COLOR_STOP_VALUE: return ColorStopValue           .parse(value)[0].toDisplayString();
        case       GRADIENT_VALUE: return GradientValue            .parse(value)[0].toDisplayString();
        case         STROKE_VALUE: return StrokeValue              .parse(value)[0].toDisplayString();
        case    DROP_SHADOW_VALUE: return DropShadowValue          .parse(value)[0].toDisplayString();
        case   INNER_SHADOW_VALUE: return InnerShadowValue         .parse(value)[0].toDisplayString();
        case     LAYER_BLUR_VALUE: return LayerBlurValue           .parse(value)[0].toDisplayString();
        case   LAYER_PRBLUR_VALUE: return LayerBlurProgressiveValue.parse(value)[0].toDisplayString();
        case      BACK_BLUR_VALUE: return BackBlurValue            .parse(value)[0].toDisplayString();
        case    BACK_PRBLUR_VALUE: return BackBlurProgressiveValue .parse(value)[0].toDisplayString();
        case  LAYER_TEXTURE_VALUE: return LayerTextureValue        .parse(value)[0].toDisplayString();
        case    LAYER_BLEND_VALUE: return LayerBlendValue          .parse(value)[0].toDisplayString();
        case     LAYER_MASK_VALUE: return LayerMaskValue           .parse(value)[0].toDisplayString();

        case      RECTANGLE_VALUE: return RectangleValue           .parse(value)[0].toDisplayString();
        case           LINE_VALUE: return LineValue                .parse(value)[0].toDisplayString();
        case        ELLIPSE_VALUE: return EllipseValue             .parse(value)[0].toDisplayString();
        case        TRAPEZE_VALUE: return TrapezeValue             .parse(value)[0].toDisplayString();
        case        POLYGON_VALUE: return PolygonValue             .parse(value)[0].toDisplayString();
        case           STAR_VALUE: return StarValue                .parse(value)[0].toDisplayString();
        case     TEXT_SHAPE_VALUE: return TextShapeValue           .parse(value)[0].toDisplayString();
        case          POINT_VALUE: return PointValue               .parse(value)[0].toDisplayString();
        case         POINT3_VALUE: return PointValue3              .parse(value)[0].toDisplayString();
        case    VECTOR_PATH_VALUE: return VectorPathValue          .parse(value)[0].toDisplayString();
        case  VECTOR_VERTEX_VALUE: return VectorVertexValue        .parse(value)[0].toDisplayString();
        case    VECTOR_EDGE_VALUE: return VectorEdgeValue          .parse(value)[0].toDisplayString();
        case  VECTOR_REGION_VALUE: return VectorRegionValue        .parse(value)[0].toDisplayString();
        case VECTOR_NETWORK_VALUE: return VectorNetworkValue       .parse(value)[0].toDisplayString();
        case  SHAPE_BOOLEAN_VALUE: return ShapeBooleanValue        .parse(value)[0].toDisplayString();
        case    SHAPE_GROUP_VALUE: return ShapeGroupValue          .parse(value)[0].toDisplayString();
        case          FRAME_VALUE: return FrameValue               .parse(value)[0].toDisplayString();
        
        case       VARIABLE_VALUE: return VariableValue            .parse(value)[0].toDisplayString();

        case           NULL_VALUE: return NULL_VALUE;
    }


    consoleError('cannot display value of type \'' + type + '\'');
}



function nanFromType(type)
{
    switch (type)
    {
        case            LIST_VALUE: return                 ListValue.NaN();

        case          NUMBER_VALUE: return               NumberValue.NaN();
        case            TEXT_VALUE: return                 TextValue.NaN();
        case           COLOR_VALUE: return                ColorValue.NaN();
        case            FILL_VALUE: return                 FillValue.NaN();
        case      COLOR_STOP_VALUE: return            ColorStopValue.NaN();
        case        GRADIENT_VALUE: return             GradientValue.NaN();
        case          STROKE_VALUE: return               StrokeValue.NaN();
        case     DROP_SHADOW_VALUE: return           DropShadowValue.NaN();
        case    INNER_SHADOW_VALUE: return          InnerShadowValue.NaN();
        case      LAYER_BLUR_VALUE: return            LayerBlurValue.NaN();
        case    LAYER_PRBLUR_VALUE: return LayerBlurProgressiveValue.NaN();
        case       BACK_BLUR_VALUE: return             BackBlurValue.NaN();
        case     BACK_PRBLUR_VALUE: return  BackBlurProgressiveValue.NaN();
        case   LAYER_TEXTURE_VALUE: return         LayerTextureValue.NaN();
        case     LAYER_BLEND_VALUE: return           LayerBlendValue.NaN();
        case      LAYER_MASK_VALUE: return            LayerMaskValue.NaN();

        case       RECTANGLE_VALUE: return            RectangleValue.NaN();
        case            LINE_VALUE: return                 LineValue.NaN();
        case         ELLIPSE_VALUE: return              EllipseValue.NaN();
        case         POLYGON_VALUE: return              PolygonValue.NaN();
        case            STAR_VALUE: return                 StarValue.NaN();
        case      TEXT_SHAPE_VALUE: return            TextShapeValue.NaN();
        case           POINT_VALUE: return                PointValue.NaN();
        case          POINT3_VALUE: return               PointValue3.NaN();
        case     VECTOR_PATH_VALUE: return           VectorPathValue.NaN();
        case   VECTOR_VERTEX_VALUE: return         VectorVertexValue.NaN();
        case     VECTOR_EDGE_VALUE: return           VectorEdgeValue.NaN();
        case   VECTOR_REGION_VALUE: return         VectorRegionValue.NaN();
        case  VECTOR_NETWORK_VALUE: return        VectorNetworkValue.NaN();
        case   SHAPE_BOOLEAN_VALUE: return         ShapeBooleanValue.NaN();
        case     SHAPE_GROUP_VALUE: return           ShapeGroupValue.NaN();
        case           FRAME_VALUE: return                FrameValue.NaN();

        case        VARIABLE_VALUE: return             VariableValue.NaN();

        case            NULL_VALUE: return                 new NullValue();
    }

    consoleError('cannot determine null value from type \'' + type + '\'');
}
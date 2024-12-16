class Parse
{
    request;
    requestId;
    
    pos; 
    so;

    settings = {};

    save;


    log  = '';
    
    nTab = 0;

    get tab() { return this.inParam ? ' ' : (NL + HTAB.repeat(Math.max(0, this.nTab))); }

    
    inParam = false;


    evalAccumulate = true;
    evalFeedback   = true;

    
    updateNodeId;
    updateParamId;

    viewportZoom;

    currentProgress = 0;
    totalProgress   = 0;

    scope           = []; // current parse stack
    parsedNodes     = []; // must be evaluated to create the value updates
  
  
    repeats         = [];
    solvers         = [];
  
    stopGenerate    = false;
  
  
    paramNodeIds    = [];
  
    updateParams    = [];
    updateValues    = [];
    updateObjects   = [];
    updateStyles    = [];


    terminalIds     = [];

    

    get next() { return this.request[this.pos]; }

    get afterNext() 
    { 
        return this.pos+1 < this.request.length 
             ? this.request[this.pos+1]
             : null;
    }



    constructor(request, firstPos, requestId, updateNodeId, updateParamId, viewportZoom, settings, save)
    {
        this.request       = request;
        this.requestId     = requestId;
          
        this.pos           = firstPos; 
        this.so            = 0;
        
        this.updateNodeId  = updateNodeId; 
        this.updateParamId = updateParamId;
   
        this.viewportZoom  = viewportZoom;

        this.settings      = settings;

        this.save          = save;
    }



    move()
    {
        //return this.request[this.pos++];

        const token = this.request[this.pos++];
        //console.log('token =', token);
        return token;
    }



    isLastRepeat() 
    {
        return isEmpty(this.repeats)
            ||    this.repeats.length == 1
               && this.repeats[0].currentIteration == this.repeats[0].total-1;
    }

}



function genParse(parse, inParam = true)
{
    //console.log('parse.next', parse.next);

    if (!inParam)
        parse.inParam = false;


    const GClass = nodeTypes[parse.next];

    if (GClass)
    {
        let node = nodeTypes[parse.next].parseRequest(parse);
    }
    else
    {
        consoleError('unknown parse token \'' + parse.next + '\' @ ' + parse.pos);
    }


    
    else if (parse.next == NUMBER_MATH            ) node = GMath              .parseRequest(parse);
    else if (parse.next == NUMBER_SIMPLE_MATH     ) node = GSimpleMath        .parseRequest(parse);
    else if (parse.next == NUMBER_BOOLEAN         ) node = GBoolean           .parseRequest(parse);
    else if (parse.next == NUMBER_COMPARE         ) node = GCompare           .parseRequest(parse);
  
    else if (parse.next == NUMBER_TRIG            ) node = GTrigonometric     .parseRequest(parse);
    else if (parse.next == NUMBER_ATAN2           ) node = GAtan2             .parseRequest(parse);
 
    else if (parse.next == CONVERT_ANGLE          ) node = GConvertAngle      .parseRequest(parse);
  
    else if (parse.next == TEXT_VALUE             ) node = GTextValue         .parseRequest(parse);
    else if (parse.next == TEXT                   ) node = GText              .parseRequest(parse);
    else if (parse.next == TEXT_LENGTH            ) node = GTextLength        .parseRequest(parse);
    else if (parse.next == TEXT_TRIM              ) node = GTextTrim          .parseRequest(parse);
    else if (parse.next == TEXT_SUBSTRING         ) node = GTextSubstring     .parseRequest(parse);
    else if (parse.next == TEXT_CONTAINS          ) node = GTextContains      .parseRequest(parse);
    else if (parse.next == TEXT_FIND              ) node = GTextFind          .parseRequest(parse);
    else if (parse.next == TEXT_CASE              ) node = GTextCase          .parseRequest(parse);
    else if (parse.next == TEXT_CHAR              ) node = GCodeToCharacter   .parseRequest(parse);
    else if (parse.next == TEXT_UNICODE           ) node = GCharacterToCode   .parseRequest(parse);
    else if (parse.next == INDEX_TO_NAME          ) node = GIndexToName       .parseRequest(parse);
    else if (parse.next == NUMBER_TO_TEXT         ) node = GNumberToText      .parseRequest(parse);
    else if (parse.next == COLOR_TO_TEXT          ) node = GColorToText       .parseRequest(parse);
    else if (parse.next == COLOR_TO_CSS           ) node = GColorToCss        .parseRequest(parse);
    else if (parse.next == TEXT_TO_NUMBER         ) node = GTextToNumber      .parseRequest(parse);
    else if (parse.next == TEXT_TO_BOOLEAN        ) node = GTextToBoolean     .parseRequest(parse);
    else if (parse.next == TEXT_TO_COLOR          ) node = GTextToColor       .parseRequest(parse);
    else if (parse.next == TEXT_REPLACE           ) node = GTextReplace       .parseRequest(parse);
    else if (parse.next == TEXT_ADD               ) node = GAddText           .parseRequest(parse);
    else if (parse.next == TEXT_JOIN              ) node = GTextJoin          .parseRequest(parse);
    else if (parse.next == TEXT_PAD               ) node = GTextPad           .parseRequest(parse);
    else if (parse.next == TEXT_ESCAPE            ) node = GTextEscape        .parseRequest(parse);
    else if (parse.next == TEXT_UNESCAPE          ) node = GTextUnescape      .parseRequest(parse);
    else if (parse.next == TEXT_COMPARE           ) node = GTextCompare       .parseRequest(parse);
    else if (parse.next == TEXT_SPLIT             ) node = GTextSplit         .parseRequest(parse);
    else if (parse.next == PARSE_CSV              ) node = GParseCSV          .parseRequest(parse);
    else if (parse.next == PARSE_JSON             ) node = GParseJson         .parseRequest(parse);
    else if (parse.next == TO_JSON                ) node = GToJson            .parseRequest(parse);
    else if (parse.next == TEXT_FETCH             ) node = GTextFetch         .parseRequest(parse);
    else if (parse.next == TEXT_FILE              ) node = GTextFile          .parseRequest(parse);
  
    else if (parse.next == COLOR_VALUE            ) node = ColorValue         .parseRequest(parse);
    else if (parse.next == COLOR                  ) node = GColor             .parseRequest(parse);
    else if (parse.next == VALID_COLOR            ) node = GValidColor        .parseRequest(parse);
    else if (parse.next == CORRECT_COLOR          ) node = GCorrectColor      .parseRequest(parse);
    else if (parse.next == COLOR_CONTRAST         ) node = GColorContrast     .parseRequest(parse);
    else if (parse.next == COLOR_DIFFERENCE       ) node = GColorDifference   .parseRequest(parse);
    else if (parse.next == COLORBLIND             ) node = GColorBlind        .parseRequest(parse);
    else if (parse.next == COLOR_SCHEME           ) node = GColorScheme       .parseRequest(parse);
    else if (parse.next == COLOR_INTERPOLATE      ) node = GColorInterpolate  .parseRequest(parse);
    else if (parse.next == COLOR_BLEND            ) node = GColorBlend        .parseRequest(parse);
       
    else if (parse.next == FILL_VALUE             ) node = FillValue          .parseRequest(parse);
    else if (parse.next == FILL                   ) node = GFill              .parseRequest(parse);
       
    else if (parse.next == COLOR_STOP_VALUE       ) node = ColorStopValue     .parseRequest(parse);
    else if (parse.next == COLOR_STOP             ) node = GColorStop         .parseRequest(parse);
       
    else if (parse.next == GRADIENT_VALUE         ) node = GradientValue      .parseRequest(parse);
    else if (parse.next == GRADIENT               ) node = GGradient          .parseRequest(parse);
       
    else if (parse.next == STROKE_VALUE           ) node = StrokeValue        .parseRequest(parse);
    else if (parse.next == STROKE                 ) node = GStroke            .parseRequest(parse);
       
    else if (parse.next == STROKE_SIDES_VALUE     ) node = StrokeSidesValue   .parseRequest(parse);
    else if (parse.next == STROKE_SIDES           ) node = GStrokeSides       .parseRequest(parse);
       
    else if (parse.next == ROUND_CORNERS_VALUE    ) node = RoundCornersValue  .parseRequest(parse);
    else if (parse.next == ROUND_CORNERS          ) node = GRoundCorners      .parseRequest(parse);
       
    else if (parse.next == DROP_SHADOW_VALUE      ) node = DropShadowValue    .parseRequest(parse);
    else if (parse.next == DROP_SHADOW            ) node = GDropShadow        .parseRequest(parse);
       
    else if (parse.next == INNER_SHADOW_VALUE     ) node = InnerShadowValue   .parseRequest(parse);
    else if (parse.next == INNER_SHADOW           ) node = GInnerShadow       .parseRequest(parse);
       
    else if (parse.next == LAYER_BLUR_VALUE       ) node = LayerBlurValue     .parseRequest(parse);
    else if (parse.next == LAYER_BLUR             ) node = GLayerBlur         .parseRequest(parse);
       
    else if (parse.next == BACK_BLUR_VALUE        ) node = BackBlurValue      .parseRequest(parse);
    else if (parse.next == BACK_BLUR              ) node = GBackBlur          .parseRequest(parse);
 
    else if (parse.next == LAYER_BLEND_VALUE      ) node = LayerBlendValue    .parseRequest(parse);
    else if (parse.next == LAYER_BLEND            ) node = GLayerBlend        .parseRequest(parse);
       
    else if (parse.next == LAYER_MASK_VALUE       ) node = LayerMaskValue     .parseRequest(parse);
    else if (parse.next == LAYER_MASK             ) node = GLayerMask         .parseRequest(parse);
       
    else if (parse.next == COLOR_STYLE            ) node = GColorStyle        .parseRequest(parse);
       
    else if (parse.next == RECTANGLE              ) node = GRectangle         .parseRequest(parse);
    else if (parse.next == LINE                   ) node = GLine              .parseRequest(parse);
    else if (parse.next == ELLIPSE                ) node = GEllipse           .parseRequest(parse);
    else if (parse.next == TRAPEZE                ) node = GTrapeze           .parseRequest(parse);
    else if (parse.next == POLYGON                ) node = GPolygon           .parseRequest(parse);
    else if (parse.next == STAR                   ) node = GStar              .parseRequest(parse);
    else if (parse.next == TEXT_SHAPE             ) node = GTextShape         .parseRequest(parse);
 
    else if (parse.next == POINT_VALUE            ) node = PointValue         .parseRequest(parse);
    else if (parse.next == POINT                  ) node = GPoint             .parseRequest(parse);
    else if (parse.next == POINT_CORNER           ) node = GPointCorner       .parseRequest(parse);

    else if (parse.next == VECTOR_PATH_VALUE      ) node = VectorPathValue    .parseRequest(parse);
    else if (parse.next == VECTOR_PATH            ) node = GVectorPath        .parseRequest(parse);
    
    else if (parse.next == VECTOR_VERTEX_VALUE    ) node = VectorVertexValue  .parseRequest(parse);
    else if (parse.next == VECTOR_VERTEX          ) node = GVectorVertex      .parseRequest(parse);

    else if (parse.next == VECTOR_EDGE_VALUE      ) node = VectorEdgeValue    .parseRequest(parse);
    else if (parse.next == VECTOR_EDGE            ) node = GVectorEdge        .parseRequest(parse);

    else if (parse.next == VECTOR_REGION_VALUE    ) node = VectorRegionValue  .parseRequest(parse);
    else if (parse.next == VECTOR_REGION          ) node = GVectorRegion      .parseRequest(parse);

    else if (parse.next == VECTOR_NETWORK_VALUE   ) node = VectorNetworkValue .parseRequest(parse);
    else if (parse.next == VECTOR_NETWORK         ) node = GVectorNetwork     .parseRequest(parse);

    else if (parse.next == SHAPE_BOOLEAN_VALUE    ) node = ShapeBooleanValue  .parseRequest(parse);
    else if (parse.next == SHAPE_BOOLEAN          ) node = GShapeBoolean      .parseRequest(parse);

    else if (parse.next == ARC_PATH_VALUE         ) node = ArcPathValue       .parseRequest(parse);
    else if (parse.next == ARC_PATH               ) node = GArcPath           .parseRequest(parse);

    else if (parse.next == WAVE_PATH_VALUE        ) node = WavePathValue      .parseRequest(parse);
    else if (parse.next == WAVE_PATH              ) node = GWavePath          .parseRequest(parse);

    else if (parse.next == SHAPE_GROUP_VALUE      ) node = ShapeGroupValue    .parseRequest(parse);
    else if (parse.next == SHAPE_GROUP            ) node = GShapeGroup        .parseRequest(parse);
 
    else if (parse.next == FRAME_VALUE            ) node = FrameValue         .parseRequest(parse);
    else if (parse.next == FRAME                  ) node = GFrame             .parseRequest(parse);
 
    else if (parse.next == MOVE                   ) node = GMove              .parseRequest(parse);
    else if (parse.next == ROTATE                 ) node = GRotate            .parseRequest(parse);
    else if (parse.next == SCALE                  ) node = GScale             .parseRequest(parse);
    else if (parse.next == SKEW                   ) node = GSkew              .parseRequest(parse);

    else if (parse.next == SHOW_CENTER            ) node = GShowCenter        .parseRequest(parse);
    else if (parse.next == SET_CENTER             ) node = GCenter            .parseRequest(parse);
    else if (parse.next == RESET_XFORM            ) node = GResetTransform    .parseRequest(parse);

    else if (parse.next == PATH_LENGTH            ) node = GPathLength        .parseRequest(parse);
    else if (parse.next == JOIN_PATHS             ) node = GJoinPaths         .parseRequest(parse);
    else if (parse.next == REORIENT_PATHS         ) node = GReorientPaths     .parseRequest(parse);
    else if (parse.next == MEASURE_VECTOR         ) node = GMeasureVector     .parseRequest(parse);
    else if (parse.next == POINT_ANGLE            ) node = GPointAngle        .parseRequest(parse);
    else if (parse.next == VECTOR                 ) node = GVector            .parseRequest(parse);
    else if (parse.next == CIRCLE_CENTER          ) node = GCircleCenter      .parseRequest(parse);
    else if (parse.next == ARC_FROM_POINTS        ) node = GArcFromPoints     .parseRequest(parse);
    else if (parse.next == INTERSECT_LINES        ) node = GIntersectLines    .parseRequest(parse);
    else if (parse.next == INTERPOLATE_POINT      ) node = GInterpolatePoint  .parseRequest(parse);
    else if (parse.next == POINT_ALONG_PATH       ) node = GPointAlongPath    .parseRequest(parse);
    else if (parse.next == CLOSEST_POINT_ON_PATH  ) node = GClosestPointOnPath.parseRequest(parse);
    else if (parse.next == REVERSE_PATH           ) node = GReversePath       .parseRequest(parse);
    else if (parse.next == BLEND_PATH             ) node = GBlendPath         .parseRequest(parse);

    else if (parse.next == PLACE                  ) node = GPlace             .parseRequest(parse);
    else if (parse.next == SHAPE_APPLY            ) node = GShapeApply        .parseRequest(parse);
    
    else if (parse.next == RETAIN                 ) node = GRetain            .parseRequest(parse);
    else if (parse.next == EXPORT                 ) node = GExport            .parseRequest(parse);
 
    else if (parse.next == GROUP_NODE             ) node = GGroupNode         .parseRequest(parse);
    else if (parse.next == GROUP_PARAM            ) node = GGroupParam        .parseRequest(parse);
 
    else if (parse.next == COMMENT                ) node = GComment           .parseRequest(parse);
    else if (parse.next == COMMENT_ARROW          ) node = GCommentArrow      .parseRequest(parse);
    else if (parse.next == PANEL                  ) node = GPanel             .parseRequest(parse);

    else consoleError('unknown parse token \'' + parse.next + '\' @ ' + parse.pos);


    parse.inParam = false;


    if (node)
        return node;
    else
    {
        parse.so++;
        return null;
    }
}



function genParseNodeStart(parse)
{
    const type     = parse.move();
    const nodeId   = parse.move();
    const nodeName = decodeURIComponent(parse.move());

    
    parse.scope.push(nodeId);


    if (parse.parsedNodes.find(n => n.nodeId == nodeId))
        return [type, nodeId, {nodeName: nodeName}, true];


    const options = genParseNodeOptions(parse);

    options.nodeName = nodeName;


    return [type, nodeId, options, false];
}



function genParseNodeEnd(parse, node = null)
{
    parse.scope.pop();

    if (node)
    {
        if (isEmpty(parse.scope))
            node.topLevel = true;

        pushUnique(parse.parsedNodes, node);
    }
}



function genParseNodeOptions(parse)
{
    const opt = parseInt(parse.move());

    const options = 
    {
        active:       ((opt >>  0) & 1) != 0,
        beforeActive: ((opt >>  1) & 1) != 0,
        beforeList:   ((opt >>  2) & 1) != 0,
        enabled:      ((opt >>  3) & 1) != 0,
        cached:       ((opt >>  4) & 1) != 0,
        unknown:      ((opt >>  5) & 1) != 0,
        notCondition: ((opt >>  6) & 1) != 0,
        hasInputs:    ((opt >> 20) & 1) != 0
    };

    return options;
}



function genParseParamCount(parse)
{
    const nParamIds = parseInt(parse.move());

    if (parse.settings.logRequests) 
        parse.log += parse.tab + nParamIds;

    return nParamIds;
}






function genParseParamId(parse)
{
    const paramId = parse.move();

    if (parse.settings.logRequests)
        parse.log += parse.tab + paramId;

    return paramId;
}
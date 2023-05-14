class Parse
{
    request;
    
    pos; 
    so;

    settings = {};


    log  = '';
    
    nTab = 0;

    get tab() { return this.inParam ? ' ' : (NL + HTAB.repeat(Math.max(0, this.nTab))); }

    
    inParam = false;

    
    updateNodeId;
    updateParamId;

    viewportZoom;


    scope         = []; // current parse stack
    parsedNodes   = []; // must be evaluated to create the value updates


    repeats       = [];


    paramNodeIds  = [];

    updateParams  = [];
    updateValues  = [];
    updateObjects = [];
    updateStyles  = [];

    

    get next() { return this.request[this.pos]; }

    get afterNext() 
    { 
        return this.pos+1 < this.request.length 
             ? this.request[this.pos+1]
             : null;
    }



    constructor(request, firstPos, updateNodeId, updateParamId, viewportZoom, showAllColorSpaces, logRequests)
    {
        this.request       = request;
          
        this.pos           = firstPos; 
        this.so            = 0;
        
        this.updateNodeId  = updateNodeId; 
        this.updateParamId = updateParamId;
   
        this.viewportZoom  = viewportZoom;

        
        this.settings.showAllColorSpaces = showAllColorSpaces;
        this.settings.logRequests        = logRequests;
    }



    move()
    {
        return this.request[this.pos++];
    }



    isLastRepeat() 
    {
        return isEmpty(this.repeats)
            ||    this.repeats.length == 1
               && this.repeats[0].iteration == this.repeats[0].total-1;
    }
}



function genParse(parse, inParam = true)
{
    //console.log('parse.next', parse.next);

    if (!inParam)
        parse.inParam = false;


    let result = null;


         if (parse.next == PARAM                  ) result = genParseParam           (parse);
        
    else if (parse.next ==        LIST_VALUE             
          || parse.next == NUMBER_LIST_VALUE             
          || parse.next ==   TEXT_LIST_VALUE             
          || parse.next ==  SHAPE_LIST_VALUE      ) result = genParseListValue       (parse);
    else if (parse.next == LIST                   ) result = genParseList            (parse);
    else if (parse.next == LIST_EXPAND            ) result = genParseExpandList      (parse);
    else if (parse.next == ITEMS                  ) result = genParseItems           (parse);
    else if (parse.next == SELECT                 ) result = genParseSelect          (parse);
    else if (parse.next == LIST_COUNT             ) result = genParseListCount       (parse);
    else if (parse.next == IF_ELSE                ) result = genParseIfElse          (parse);
    else if (parse.next == START                  ) result = genParseStart           (parse);
    else if (parse.next == REPEAT                 ) result = genParseRepeat          (parse);
    else if (parse.next == CACHE                  ) result = genParseCache           (parse);
    else if (parse.next == COPY                   ) result = genParseCopy            (parse);
    
    else if (parse.next == NUMBER_VALUE           ) result = genParseNumValue        (parse);
    else if (parse.next == NUMBER                 ) result = genParseNumber          (parse);
    
    else if (parse.next == NUMBER_SIGN            ) result = genParseSign            (parse);
    else if (parse.next == NUMBER_ABSOLUTE        ) result = genParseAbsolute        (parse);
    else if (parse.next == NUMBER_ROUND           ) result = genParseRound           (parse);
    else if (parse.next == NUMBER_LIMITS          ) result = genParseLimits          (parse);
    else if (parse.next == NUMBER_RANDOM          ) result = genParseRandom          (parse);
    else if (parse.next == NUMBER_CONSTANT        ) result = genParseConstant        (parse);
    else if (parse.next == NUMBER_DISTRIBUTE      ) result = genParseDistribute      (parse);
    else if (parse.next == NUMBER_SEQUENCE        ) result = genParseSequence        (parse);
    else if (parse.next == NUMBER_INTERPOLATE     ) result = genParseInterpolate     (parse);
    else if (parse.next == NUMBER_SOLVE           ) result = genParseSolve           (parse);
    else if (parse.next == NUMBER_ANIMATE         ) result = genParseAnimate         (parse);
    
    else if (parse.next == NUMBER_MATH            ) result = genParseMath            (parse, (nodeId, options) => new GMath          (nodeId, options));
    else if (parse.next == NUMBER_ADD             ) result = genParseArithmetic      (parse, (nodeId, options) => new GAdd           (nodeId, options));
    else if (parse.next == NUMBER_SUBTRACT        ) result = genParseArithmetic      (parse, (nodeId, options) => new GSubtract      (nodeId, options));
    else if (parse.next == NUMBER_MULTIPLY        ) result = genParseArithmetic      (parse, (nodeId, options) => new GMultiply      (nodeId, options));
    else if (parse.next == NUMBER_DIVIDE          ) result = genParseArithmetic      (parse, (nodeId, options) => new GDivide        (nodeId, options));
    else if (parse.next == NUMBER_MODULO          ) result = genParseArithmetic      (parse, (nodeId, options) => new GModulo        (nodeId, options));
    else if (parse.next == NUMBER_EXPONENT        ) result = genParseArithmetic      (parse, (nodeId, options) => new GExponent      (nodeId, options));
    
    else if (parse.next == NUMBER_BOOLEAN         ) result = genParseBoolean         (parse);
    else if (parse.next == NUMBER_NOT             ) result = genParseArithmetic      (parse, (nodeId, options) => new GNot           (nodeId, options));
    else if (parse.next == NUMBER_AND             ) result = genParseArithmetic      (parse, (nodeId, options) => new GAnd           (nodeId, options));
    else if (parse.next == NUMBER_OR              ) result = genParseArithmetic      (parse, (nodeId, options) => new GOr            (nodeId, options));
    else if (parse.next == NUMBER_XOR             ) result = genParseArithmetic      (parse, (nodeId, options) => new GXor           (nodeId, options));
    
    else if (parse.next == NUMBER_CONDITION       ) result = genParseCondition       (parse);
    else if (parse.next == NUMBER_EQUAL           ) result = genParseConditionBase   (parse, (nodeId, options) => new GEqual         (nodeId, options));
    else if (parse.next == NUMBER_NOT_EQUAL       ) result = genParseConditionBase   (parse, (nodeId, options) => new GNotEqual      (nodeId, options));
    else if (parse.next == NUMBER_LESS            ) result = genParseConditionBase   (parse, (nodeId, options) => new GLess          (nodeId, options));
    else if (parse.next == NUMBER_LESS_OR_EQUAL   ) result = genParseConditionBase   (parse, (nodeId, options) => new GLessOrEqual   (nodeId, options));
    else if (parse.next == NUMBER_GREATER         ) result = genParseConditionBase   (parse, (nodeId, options) => new GGreater       (nodeId, options));
    else if (parse.next == NUMBER_GREATER_OR_EQUAL) result = genParseConditionBase   (parse, (nodeId, options) => new GGreaterOrEqual(nodeId, options));

    else if (parse.next == NUMBER_TRIG            ) result = genParseTrigonometric   (parse);
    else if (parse.next == NUMBER_SIN             ) result = genParseTrigBase        (parse, (nodeId, options) => new GSine          (nodeId, options));
    else if (parse.next == NUMBER_COS             ) result = genParseTrigBase        (parse, (nodeId, options) => new GCosine        (nodeId, options));
    else if (parse.next == NUMBER_TAN             ) result = genParseTrigBase        (parse, (nodeId, options) => new GTangent       (nodeId, options));

    else if (parse.next == TEXT_VALUE             ) result = genParseTextValue       (parse);
    else if (parse.next == TEXT                   ) result = genParseText            (parse);
    else if (parse.next == TEXT_LENGTH            ) result = genParseTextLength      (parse);
    else if (parse.next == TEXT_TRIM              ) result = genParseTextTrim        (parse);
    else if (parse.next == TEXT_SUBSTRING         ) result = genParseTextSubstring   (parse);
    else if (parse.next == TEXT_CHAR              ) result = genParseTextCharacter   (parse);
    else if (parse.next == NUMBER_TO_TEXT         ) result = genParseNumberToText    (parse);
    else if (parse.next == TEXT_REPLACE           ) result = genParseTextReplace     (parse);
    else if (parse.next == TEXT_JOIN              ) result = genParseTextJoin        (parse);
    else if (parse.next == TEXT_CSV               ) result = genParseTextCSV         (parse);
    else if (parse.next == TEXT_FETCH             ) result = genParseTextFetch       (parse);

    else if (parse.next == COLOR_VALUE            ) result = genParseColorValue      (parse);
    else if (parse.next == COLOR                  ) result = genParseColor           (parse);
    else if (parse.next == VALID_COLOR            ) result = genParseValidColor      (parse);
    else if (parse.next == CORRECT_COLOR          ) result = genParseCorrectColor    (parse);
    else if (parse.next == COLOR_CONTRAST         ) result = genParseColorContrast   (parse);
    else if (parse.next == COLORBLIND             ) result = genParseColorBlind      (parse);
    else if (parse.next == COLOR_INTERPOLATE      ) result = genParseColorInterpolate(parse);
    else if (parse.next == COLOR_BLEND            ) result = genParseColorBlend      (parse);
     
    else if (parse.next == FILL_VALUE             ) result = genParseFillValue       (parse);
    else if (parse.next == FILL                   ) result = genParseFill            (parse);
     
    else if (parse.next == STROKE_VALUE           ) result = genParseStrokeValue     (parse);
    else if (parse.next == STROKE                 ) result = genParseStroke          (parse);
     
    else if (parse.next == COLOR_STOP_VALUE       ) result = genParseColorStopValue  (parse);
    else if (parse.next == COLOR_STOP             ) result = genParseColorStop       (parse);
     
    else if (parse.next == COLOR_STYLE            ) result = genParseColorStyle      (parse);
     
    else if (parse.next == RECTANGLE              ) result = genParseRectangle       (parse);
    else if (parse.next == LINE                   ) result = genParseLine            (parse);
    else if (parse.next == ELLIPSE                ) result = genParseEllipse         (parse);
    else if (parse.next == POLYGON                ) result = genParsePolygon         (parse);
    else if (parse.next == STAR                   ) result = genParseStar            (parse);
    else if (parse.next == TEXTSHAPE              ) result = genParseTextShape       (parse);

    else if (parse.next == POINT_VALUE            ) result = genParsePointValue      (parse);
    else if (parse.next == POINT                  ) result = genParsePoint           (parse);
    else if (parse.next == VECTOR_PATH_VALUE      ) result = genParseVectorPathValue (parse);
    else if (parse.next == VECTOR_PATH            ) result = genParseVectorPath      (parse);

    else if (parse.next == SHAPE_GROUP_VALUE      ) result = genParseShapeGroupValue (parse);
    else if (parse.next == SHAPE_GROUP            ) result = genParseShapeGroup      (parse);

    else if (parse.next == FRAME_VALUE            ) result = genParseFrameValue      (parse);
    else if (parse.next == FRAME                  ) result = genParseFrame           (parse);

    else if (parse.next == MOVE                   ) result = genParseMove            (parse);
    else if (parse.next == ROTATE                 ) result = genParseRotate          (parse);
    else if (parse.next == SCALE                  ) result = genParseScale           (parse);
    else if (parse.next == SKEW                   ) result = genParseSkew            (parse);

    else if (parse.next == GROUP_NODE             ) result = genParseGroupNode       (parse);
    else if (parse.next == GROUP_PARAM            ) result = genParseGroupParam      (parse);

    else if (parse.next == COMMENT                ) result = genParseComment         (parse);

    else console.assert(false, 'unknown parse token \'' + parse.next + '\' @ ' + parse.pos);


    parse.inParam = false;


    if (result)
        return result;
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
    const nodeName = parse.move();

    
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
        enabled:      ((opt >>  2) & 1) != 0,
        cached:       ((opt >>  3) & 1) != 0,
        hasInputs:    ((opt >> 20) & 1) != 0,
        existing:     ((opt >> 21) & 1) != 0
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



function genParseParam(parse)
{
    if (parse.next != PARAM) 
        return null;
        
    parse.move(); // PARAM
    const type = parse.move(); // type

    
    const nodeId  = parse.move();
    const paramId = parse.move();
    
    const param   = new GParam(nodeId, paramId);
 
    
    pushUnique(parse.paramNodeIds, nodeId);


    if (parse.settings.logRequests) 
        logReqParam(param, type, parse);


    return param;
}



function genParseParamId(parse)
{
    const paramId = parse.move();

    if (parse.settings.logRequests)
        parse.log += parse.tab + paramId;

    return paramId;
}
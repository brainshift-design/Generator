class Parse
{
    request;
    
    pos; 
    so;

    settings = {};


    log  = '';
    
    nTab = 0;

    get tab() { return this.inParam ? ' ' : (NL + TAB.repeat(Math.max(0, this.nTab))); }

    
    inParam = false;

    
    updateNodeId;
    updateParamId;

    scope         = []; // current parse stack
    parsedNodes   = []; // must be evaluated to create the value updates

    paramNodeIds  = [];

    updateParams  = [];
    updateValues  = [];
    updateObjects = [];

    
    get next() { return this.request[this.pos]; }

    get afterNext() 
    { 
        return this.pos+1 < this.request.length 
             ? this.request[this.pos+1]
             : null;
    }



    constructor(request, updateNodeId, updateParamId, includeLxxColorSpaces, logRequests)
    {
        this.request       = request;
          
        this.pos           = 3; 
        this.so            = 0;
        
        this.updateNodeId  = updateNodeId; 
        this.updateParamId = updateParamId;
   
        
        this.settings.includeLxxColorSpaces = includeLxxColorSpaces;
        this.settings.logRequests           = logRequests;
    }



    move()
    {
        return this.request[this.pos++];
    }
}



function genParse(parse, inParam = true)
{
    //console.log('parse.next', parse.next);

    if (!inParam)
        parse.inParam = false;


    let result = null;


         if (parse.next == PARAM              ) result = genParseParam           (parse);
    
    else if (parse.next == LIST_VALUE         ) result = genParseListValue       (parse);
    else if (parse.next == LIST               ) result = genParseList            (parse);
    else if (parse.next == ITEMS              ) result = genParseItems           (parse);
    else if (parse.next == START              ) result = genParseStart           (parse);
    else if (parse.next == REPEAT             ) result = genParseRepeat          (parse);
    else if (parse.next == CACHE              ) result = genParseCache           (parse);

    else if (parse.next == NUMBER_VALUE       ) result = genParseNumValue        (parse);
    else if (parse.next == NUMBER             ) result = genParseNumber          (parse);
    else if (parse.next == NUMBER_LIMITS      ) result = genParseLimits          (parse);
    else if (parse.next == NUMBER_RANDOM      ) result = genParseRandom          (parse);
    else if (parse.next == NUMBER_INTERPOLATE ) result = genParseInterpolate     (parse);
 
    else if (parse.next == NUMBER_MATH        ) result = genParseMath            (parse, (nodeId, options) => new GMath    (nodeId, options));
    else if (parse.next == NUMBER_ADD         ) result = genParseArithmetic      (parse, (nodeId, options) => new GAdd     (nodeId, options));
    else if (parse.next == NUMBER_SUBTRACT    ) result = genParseArithmetic      (parse, (nodeId, options) => new GSubtract(nodeId, options));
    else if (parse.next == NUMBER_MULTIPLY    ) result = genParseArithmetic      (parse, (nodeId, options) => new GMultiply(nodeId, options));
    else if (parse.next == NUMBER_DIVIDE      ) result = genParseArithmetic      (parse, (nodeId, options) => new GDivide  (nodeId, options));
    else if (parse.next == NUMBER_MODULO      ) result = genParseArithmetic      (parse, (nodeId, options) => new GModulo  (nodeId, options));
    else if (parse.next == NUMBER_EXPONENT    ) result = genParseArithmetic      (parse, (nodeId, options) => new GExponent(nodeId, options));

    else if (parse.next == NUMBER_VAR_MATH    ) result = genParseVarMath         (parse, (nodeId, options) => new GVarMath    (nodeId, options));
    else if (parse.next == NUMBER_VAR_ADD     ) result = genParseVarArithmetic   (parse, (nodeId, options) => new GVarAdd     (nodeId, options));
    else if (parse.next == NUMBER_VAR_SUBTRACT) result = genParseVarArithmetic   (parse, (nodeId, options) => new GVarSubtract(nodeId, options));
    else if (parse.next == NUMBER_VAR_MULTIPLY) result = genParseVarArithmetic   (parse, (nodeId, options) => new GVarMultiply(nodeId, options));
    else if (parse.next == NUMBER_VAR_DIVIDE  ) result = genParseVarArithmetic   (parse, (nodeId, options) => new GVarDivide  (nodeId, options));
    else if (parse.next == NUMBER_VAR_MODULO  ) result = genParseVarArithmetic   (parse, (nodeId, options) => new GVarModulo  (nodeId, options));
    else if (parse.next == NUMBER_VAR_EXPONENT) result = genParseVarArithmetic   (parse, (nodeId, options) => new GVarExponent(nodeId, options));

    else if (parse.next == COLOR_VALUE        ) result = genParseColorValue      (parse);
    else if (parse.next == COLOR              ) result = genParseColor           (parse);
    else if (parse.next == COLOR_INTERPOLATE  ) result = genParseColorInterpolate(parse);
    else if (parse.next == COLOR_CONTRAST     ) result = genParseColorContrast   (parse);
    else if (parse.next == COLORBLIND         ) result = genParseColorBlind      (parse);
    else if (parse.next == COLOR_CORRECT      ) result = genParseColorCorrect    (parse);
 
    else if (parse.next == FILL_VALUE         ) result = genParseFillValue       (parse);
    else if (parse.next == FILL               ) result = genParseFill            (parse);
 
    else if (parse.next == STROKE_VALUE       ) result = genParseStrokeValue     (parse);
    else if (parse.next == STROKE             ) result = genParseStroke          (parse);
 
    else if (parse.next == COLOR_STOP_VALUE   ) result = genParseColorStopValue  (parse);
    else if (parse.next == COLOR_STOP         ) result = genParseColorStop       (parse);
 
    else if (parse.next == STYLE_VALUE        ) result = genParseStyleValue      (parse);
    else if (parse.next == STYLE              ) result = genParseStyle           (parse);
 
    else if (parse.next == RECTANGLE          ) result = genParseRectangle       (parse);
    else if (parse.next == LINE               ) result = genParseLine            (parse);
    else if (parse.next == ELLIPSE            ) result = genParseEllipse         (parse);
    else if (parse.next == POLYGON            ) result = genParsePolygon         (parse);
    else if (parse.next == STAR               ) result = genParseStar            (parse);

    else console.assert(false, 'unknown parse token \'' + parse.next + '\'');


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
    const type   = parse.move();
    const nodeId = parse.move();

    parse.scope.push(nodeId);

    if (parse.parsedNodes.find(n => n.nodeId == nodeId))
        return [type, nodeId, false, true];

    const options = genParseNodeOptions(parse);

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
        active:       ((opt >> 0) & 1) != 0,
        beforeActive: ((opt >> 1) & 1) != 0,
        enabled:      ((opt >> 2) & 1) != 0,
        cached:       ((opt >> 3) & 1) != 0
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



// function genCreateNumber(input)
// {
//     const num = new NumberValue(input.nodeId);

//     num.input = input;

//     return num;
// }
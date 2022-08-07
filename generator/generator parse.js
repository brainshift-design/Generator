// some parse functions return values
// some parse functions update values
// some parse functions update objects



class Parse
{
    request;
    
    pos; 
    so;
    
    logRequests;
    log  = '';
    
    nTab = 0;

    get tab() { return NL + TAB.repeat(Math.max(0, this.nTab)); }

    updateNodeId;
    updateParamId;

    scope         = []; // current parse stack
    parsedNodes   = []; // must be evaluated to create the value updates

    paramNodeIds  = [];

    updateParams  = [];
    updateValues  = [];
    updateObjects = [];

    get next() { return this.request[this.pos]; }



    constructor(request, updateNodeId, updateParamId, logRequests)
    {
        this.request       = request;
          
        this.pos           = 2; 
        this.so            = 0;
        
        this.logRequests   = logRequests;

        this.updateNodeId  = updateNodeId; 
        this.updateParamId = updateParamId;
    }



    move()
    {
        return this.request[this.pos++];
    }
}



function genParse(parse)
{
    //console.log('next', next);


         if (parse.next == PARAM             ) return genParseParam           (parse);

    else if (parse.next == NUMBER_VALUE      ) return genParseNumValue        (parse);
    else if (parse.next == NUMBER            ) return genParseNumber          (parse);
    else if (parse.next == NUMBER_LIMITS     ) return genParseLimits          (parse);
    else if (parse.next == NUMBER_ADD        ) return genParseArithmetic      (parse, (nodeId, active) => new GAdd     (nodeId, active));
    else if (parse.next == NUMBER_SUBTRACT   ) return genParseArithmetic      (parse, (nodeId, active) => new GSubtract(nodeId, active));
    else if (parse.next == NUMBER_MULTIPLY   ) return genParseArithmetic      (parse, (nodeId, active) => new GMultiply(nodeId, active));
    else if (parse.next == NUMBER_DIVIDE     ) return genParseArithmetic      (parse, (nodeId, active) => new GDivide  (nodeId, active));
    else if (parse.next == NUMBER_MODULO     ) return genParseArithmetic      (parse, (nodeId, active) => new GModulo  (nodeId, active));
    else if (parse.next == NUMBER_EXPONENT   ) return genParseArithmetic      (parse, (nodeId, active) => new GExponent(nodeId, active));
    else if (parse.next == NUMBER_INTERPOLATE) return genParseInterpolate     (parse);

    else if (parse.next == COLOR_VALUE       ) return genParseColorValue      (parse);
    else if (parse.next == COLOR             ) return genParseColor           (parse);
    else if (parse.next == COLOR_INTERPOLATE ) return genParseColorInterpolate(parse);
    else if (parse.next == COLOR_CONTRAST    ) return genParseColorContrast   (parse);
    else if (parse.next == COLORBLIND        ) return genParseColorBlind      (parse);
    else if (parse.next == COLOR_VALIDATE    ) return genParseColorValidate   (parse);

    else if (parse.next == FILL              ) return genParseFill            (parse);

    else if (parse.next == RECTANGLE         ) return genParseRectangle       (parse);
    else if (parse.next == LINE              ) return genParseLine            (parse);
    else if (parse.next == ELLIPSE           ) return genParseEllipse         (parse);
    else if (parse.next == POLYGON           ) return genParsePolygon         (parse);
    else if (parse.next == STAR              ) return genParseStar            (parse);

    // else if (parse.next == COLOR_FILL        ) return genParseColorFill       (parse);

    // else if (parse.next == STROKE            ) return genParseColorStroke     (parse);

    
    parse.so++;
    return null;
}



function genParseNodeStart(parse)
{
    const type   = parse.move();
    const nodeId = parse.move();

    parse.scope.push(nodeId);

    if (parse.parsedNodes.find(n => n.nodeId == nodeId))
        return [type, nodeId, false, true];

    const active = genParseActive(parse);

    return [type, nodeId, active, false];
}



function genParseNodeEnd(parse, node = null)
{
    parse.scope.pop();

    if (node)
    {
        if (parse.scope.length == 0)
            node.topLevel = true;

        pushUnique(parse.parsedNodes, node);
    }
}



function genParseActive(parse)
{
    if (parse.next == ACTIVE)
    {
        parse.move();
        return true;
    }

    return false;
}



function genParseParam(parse)
{
    if (parse.next != PARAM) 
        return null;
        
    parse.move();

    
    const nodeId  = parse.move();
    const paramId = parse.move();
    

    const param = new GParam(nodeId, paramId);
    

    pushUnique(parse.paramNodeIds, nodeId);


    if (parse.logRequests) 
        logReqParam(param, parse);


    return param;
}
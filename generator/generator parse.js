// some parse functions return values
// some parse functions update values
// some parse functions update objects



class Parse
{
    req;
    
    pos; 
    so;
    
    updateNodeId;
    updateParamId;

    scope         = []; // current parse stack
    tree          = []; // must be evaluated to create the value updates

    updateParams  = [];
    updateValues  = [];
    updateObjects = [];

    get next() { return this.req[this.pos]; }



    constructor(req, updateNodeId, updateParamId)
    {
        this.req           = req;
          
        this.pos           = 2; 
        this.so            = 0;
        
        this.updateNodeId  = updateNodeId; 
        this.updateParamId = updateParamId;
    }



    move()
    {
        return this.req[this.pos++];
    }
}



/* 
    the generation request format

    no-update param nodeId ('' if n/a)
    no-update paramId ('' if n/a)

    generation string
*/



function genParse(parse)
{
    //console.log('next', next);


         if (parse.next == PARAM             ) return genParseParam      (parse);

    else if (parse.next == NUMBER_VALUE      ) return genParseNumValue   (parse);
    else if (parse.next == NUMBER            ) return genParseNumber     (parse);
    else if (parse.next == NUMBER_MINMAX     ) return genParseMinMax     (parse);
    else if (parse.next == NUMBER_ADD        ) return genParseArithmetic (parse, (nodeId, active) => new GAdd     (nodeId, active));
    else if (parse.next == NUMBER_SUBTRACT   ) return genParseArithmetic (parse, (nodeId, active) => new GSubtract(nodeId, active));
    else if (parse.next == NUMBER_MULTIPLY   ) return genParseArithmetic (parse, (nodeId, active) => new GMultiply(nodeId, active));
    else if (parse.next == NUMBER_DIVIDE     ) return genParseArithmetic (parse, (nodeId, active) => new GDivide  (nodeId, active));
    else if (parse.next == NUMBER_MODULO     ) return genParseArithmetic (parse, (nodeId, active) => new GModulo  (nodeId, active));
    else if (parse.next == NUMBER_EXPONENT   ) return genParseArithmetic (parse, (nodeId, active) => new GExponent(nodeId, active));
    else if (parse.next == NUMBER_INTERPOLATE) return genParseInterpolate(parse);

    else if (parse.next == COLOR             ) return genParseColor      (parse);

    else if (parse.next == RECTANGLE         ) return genParseRectangle  (parse);
    else if (parse.next == LINE              ) return genParseLine       (parse);
    else if (parse.next == ELLIPSE           ) return genParseEllipse    (parse);
    else if (parse.next == POLYGON           ) return genParsePolygon    (parse);
    else if (parse.next == STAR              ) return genParseStar       (parse);

    
    parse.so++;
    return null;
}



function genParseNodeStart(parse)
{
    parse.pos++; // tag
    
    const nodeId = parse.move();
    const active = genParseActive(parse);
    
    parse.scope.push(nodeId);

    return [nodeId, active];
}



function genParseNodeEnd(parse, value = null)
{
    parse.scope.pop();

    if (   value
        && parse.scope.length == 0) // only top level
        pushUnique(parse.tree, value);
}



function genParseActive(parse)
{
    if (parse.next == ACTIVE)
    {
        parse.pos++;
        return true;
    }

    return false;
}



function genParseParam(parse)
{
    if (parse.next != PARAM) 
        return null;
    
    parse.pos++;

    const nodeId  = parse.move();
    const paramId = parse.move();

    return new GParam(nodeId, paramId);
}
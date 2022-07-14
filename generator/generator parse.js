// some parse functions return values
// some parse functions update values
// some parse functions update objects



/* 
    the generation request format

    no-update param nodeId ('' if n/a)
    no-update paramIndex (0 if n/a)

    generation string
*/



function genParse(parse)
{
    const next = parse.req[parse.pos];
    //console.log('next', next);


         if (next == PARAM             ) return genParseParam            (parse);

    else if (next == NUMBER_VALUE      ) return genParseNumValue         (parse);
    else if (next == NUMBER            ) return genParseNumber           (parse);
    else if (next == NUMBER_ADD        ) return genParseNumberAdd        (parse);
    else if (next == NUMBER_SUBTRACT   ) return genParseNumberSubtract   (parse);
    else if (next == NUMBER_MULTIPLY   ) return genParseNumberMultiply   (parse);
    else if (next == NUMBER_DIVIDE     ) return genParseNumberDivide     (parse);
    else if (next == NUMBER_MODULO     ) return genParseNumberModulo     (parse);
    else if (next == NUMBER_EXPONENT   ) return genParseNumberExponent   (parse);
    else if (next == NUMBER_INTERPOLATE) return genParseNumberInterpolate(parse);

    else if (next == COLOR             ) return genParseColor            (parse);

    else if (next == RECTANGLE         ) return genParseRectangle        (parse);
    else if (next == LINE              ) return genParseLine             (parse);
    else if (next == ELLIPSE           ) return genParseEllipse          (parse);
    else if (next == POLYGON           ) return genParsePolygon          (parse);
    else if (next == STAR              ) return genParseStar             (parse);

    
    parse.so++;
    return null;
}



function genParseActive(parse)
{
    if (parse.req[parse.pos] == ACTIVE)
    {
        parse.pos++;
        return true;
    }

    return false;
}



function genParseNumberNodeId(parse)
{
    parse.pos++; // tag
    
    const nodeId = parse.req[parse.pos++];
    genParseActive(parse);
    
    return nodeId;
}



function genParseParam(parse)
{
    if (parse.req[parse.pos] != PARAM) 
        return null;
    
    parse.pos++;


    const val = new GParam(
        parse.req[parse.pos++],
        parse.req[parse.pos++]);


    //genPushUpdateParamValue(parse, nodeId, paramIndex, val);

    return val;
}
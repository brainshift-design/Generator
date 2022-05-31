// some parse functions return values
// some parse functions update values
// some parse functions update objects



/* 
    the generation request format

    no-update param nodeId ('' if n/a)
    no-update paramIndex (0 if n/a)

    generation string
*/



function genParseRequest(parse)
{
    const next = parse.req[parse.pos];
        //console.log('next', next);

         if (next == NUMBER_VALUE      ) return genParseNumValue         (parse);
    else if (next == NUMBER            ) return genParseNumber           (parse);
    else if (next == NUMBER_ADD        ) return genParseNumberAdd        (parse);
    else if (next == NUMBER_SUBTRACT   ) return genParseNumberSubtract   (parse);
    else if (next == NUMBER_MULTIPLY   ) return genParseNumberMultiply   (parse);
    else if (next == NUMBER_DIVIDE     ) return genParseNumberDivide     (parse);
    else if (next == NUMBER_MODULO     ) return genParseNumberModulo     (parse);
    else if (next == NUMBER_EXPONENT   ) return genParseNumberExponent   (parse);
    else if (next == NUMBER_INTERPOLATE) return genParseNumberInterpolate(parse);

    else if (next == RECTANGLE         ) return genParseRectangle        (parse);

    parse.so++;
    return null;
}



function genParseActive(parse)
{
    let active = false;

    if (parse.req[parse.pos] == ACTIVE)
    {
        active = true;
        parse.pos++;
    }

    return active;
}
function logReqColorValue(val, parse, ignore)
{
    parse.log += parse.tab + COLOR_VALUE + ' ' + displayValue(COLOR_VALUE, val);
}



function logReqColor(col, nInputs, parse, ignore) 
{
    parse.log += parse.tab + COLOR;
    parse.log += logReqNodeId(col, ignore);

    if (!ignore) 
        parse.log += ' ' + nInputs;
}



function logReqValidColor(val, nInputs, parse, ignore)
{
    parse.log += parse.tab + VALID_COLOR;
    parse.log += logReqNodeId(val, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqCorrectColor(corr, nInputs, parse, ignore)
{
    parse.log += parse.tab + CORRECT_COLOR;
    parse.log += logReqNodeId(corr, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqColorContrast(lerp, nInputs, valueIndex, parse, ignore)
{
    parse.log += parse.tab + COLOR_CONTRAST;
    parse.log += logReqNodeId(lerp, ignore);

    if (!ignore)
    {
        parse.log += ' ' + nInputs;

        if (nInputs == 1)
            parse.log += ' ' + valueIndex;
    }
}



function logReqColorBlind(cb, nInputs, parse, ignore)
{
    parse.log += parse.tab + COLORBLIND;
    parse.log += logReqNodeId(cb, ignore);
    
    if (!ignore)
        parse.log += ' ' + nInputs;
}



function logReqColorInterpolate(lerp, nInputs, parse, ignore)
{
    parse.log += parse.tab + COLOR_INTERPOLATE;
    parse.log += logReqNodeId(lerp, ignore);

    if (!ignore)
        parse.log += ' ' + nInputs;
}

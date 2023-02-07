function logReqColorValue(val, parse)
{
    parse.log += parse.tab + COLOR_VALUE + ' ' + displayValue(COLOR_VALUE, val);
}



function logReqColor(col, nInputs, parse) 
{
    parse.log += parse.tab + COLOR;
    parse.log += logReqNodeId(col);
    parse.log += ' ' + nInputs;
}



function logReqColorInterpolate(lerp, nInputs, parse)
{
    parse.log += parse.tab + COLOR_INTERPOLATE;
    parse.log += logReqNodeId(lerp);
    parse.log += ' ' + nInputs;
}



function logReqColorContrast(lerp, nInputs, valueIndex, parse)
{
    parse.log += parse.tab + COLOR_CONTRAST;
    parse.log += logReqNodeId(lerp);
    parse.log += ' ' + nInputs;

    if (nInputs == 1)
        parse.log += ' ' + valueIndex;
}



function logReqColorBlind(cb, parse)
{
    parse.log += parse.tab + COLORBLIND;
    parse.log += logReqNodeId(cb);
}



function logReqValidColor(val, parse)
{
    parse.log += parse.tab + VALID_COLOR;
    parse.log += logReqNodeId(val);
}
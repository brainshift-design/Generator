function logReqColor(col, parse) 
{
    logReqNode(col, COLOR, parse); 
}



function logReqColorInterpolate(lerp, nValues, parse)
{
    parse.log += parse.tab + COLOR_INTERPOLATE;
    parse.log += logReqNodeId(lerp);
    parse.log += ' ' + nValues;
}



function logReqColorContrast(lerp, nValues, valueIndex, parse)
{
    parse.log += parse.tab + COLOR_CONTRAST;
    parse.log += logReqNodeId(lerp);
    parse.log += ' ' + nValues;

    if (nValues == 1)
        parse.log += ' ' + valueIndex;
}



function logReqColorBlind(cb, parse)
{
    parse.log += parse.tab + COLORBLIND;
    parse.log += logReqNodeId(cb);
}



function logReqColorValidate(val, parse)
{
    parse.log += parse.tab + COLOR_VALIDATE;
    parse.log += logReqNodeId(val);
}
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
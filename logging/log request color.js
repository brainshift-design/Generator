function logReqColorValue(val, parse)
{
    parse.log += ' ' + COLOR_VALUE + ' ' + val;
}



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



function logReqColorFillValue(fill, parse)
{
    parse.log += ' ' + COLOR_FILL_VALUE + ' ' + fill;
}



function logReqColorFill(fill, parse)
{
    parse.log += parse.tab + fill.type;
    parse.log += logReqNodeId(fill);
}



function logReqColorStopValue(stop, parse)
{
    parse.log += parse.tab + COLOR_STOP_VALUE + ' ' + stop;
}



function logReqColorStop(stop, parse)
{
    parse.log += parse.tab + stop.type;
    parse.log += logReqNodeId(stop);
}
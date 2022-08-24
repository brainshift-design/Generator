function logReqFillValue(fill, parse)
{
    parse.log += ' ' + FILL_VALUE + ' ' + fill;
}



function logReqFill(fill, parse)
{
    parse.log += parse.tab + fill.type;
    parse.log += logReqNodeId(fill);
}



function logReqStrokeValue(stroke, parse)
{
    parse.log += ' ' + STROKE_VALUE + ' ' + stroke;
}



function logReqStroke(stroke, parse)
{
    parse.log += parse.tab + stroke.type;
    parse.log += logReqNodeId(stroke);
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
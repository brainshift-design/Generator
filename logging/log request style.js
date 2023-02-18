function logReqFillValue(fill, parse, ignore)
{
    parse.log += parse.tab + FILL_VALUE + ' ' + displayValue(FILL_VALUE, fill);
}



// function logReqFill(fill, parse, ignore)
// {
//     parse.log += parse.tab + fill.type;
//     parse.log += logReqNodeId(fill, ignore);
// }



function logReqStrokeValue(stroke, parse, ignore)
{
    parse.log += parse.tab + STROKE_VALUE + ' ' + displayValue(STROKE_VALUE, stroke);
}



// function logReqStroke(stroke, parse)
// {
//     parse.log += parse.tab + stroke.type;
//     parse.log += logReqNodeId(stroke, ignore);
// }



function logReqColorStopValue(stop, parse, ignore)
{
    parse.log += parse.tab + COLOR_STOP_VALUE + ' ' + displayValue(COLOR_STOP_VALUE, stop);
}



// function logReqColorStop(stop, parse, ignore)
// {
//     parse.log += parse.tab + stop.type;
//     parse.log += logReqNodeId(stop, ignore);
// }



// function logReqColorStyleValue(style, parse, ignore)
// {
//     parse.log += parse.tab + COLOR_STYLE_VALUE + ' ' + displayValue(COLOR_STYLE_VALUE, style);
// }



// function logReqColorStyle(style, parse, ignore)
// {
//     parse.log += parse.tab + COLOR_STYLE;
//     parse.log += logReqNodeId(style, ignore);
// }

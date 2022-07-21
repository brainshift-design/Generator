function logReqNumberValue(val, parse)
{
    parse.log += parse.tab + NUMBER_VALUE + ' ' + val;
}



function logReqNumber(num, parse)
{
    parse.log += parse.tab + NUMBER;
    parse.log += logReqNodeId(num);
}



function logReqLimits(lim, nValues, parse)
{
    parse.log += parse.tab + NUMBER_LIMITS;
    parse.log += logReqNodeId(lim);

    if (nValues > -1)
        parse.log += ' ' + nValues;
}



function logReqArithmetic(arith, type, nValues, parse)
{
    parse.log += parse.tab + type;
    parse.log += logReqNodeId(arith);
    parse.log += ' ' + nValues;
}



function logReqInterpolate(lerp, nValues, parse)
{
    parse.log += parse.tab + NUMBER_INTERPOLATE;
    parse.log += logReqNodeId(lerp);
    parse.log += ' ' + nValues;
}



// function logReqRectangle(req) { logReqNode(req, RECTANGLE, ['x', 'y', 'width', 'height', 'angle', 'round']); }
// function logReqLine     (req) { logReqNode(req, LINE,      ['x', 'y', 'width', 'angle']); }
// function logReqEllipse  (req) { logReqNode(req, ELLIPSE,   ['x', 'y', 'width', 'height', 'angle']); }
// function logReqPolygon  (req) { logReqNode(req, POLYGON,   ['x', 'y', 'width', 'height', 'angle', 'round', 'corners']); }
// function logReqStar     (req) { logReqNode(req, STAR,      ['x', 'y', 'width', 'height', 'angle', 'round', 'points', 'convex']); }
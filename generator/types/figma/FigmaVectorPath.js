class FigmaVectorPath
extends FigmaShape
{
    x;
    y;
    
    points;
    closed;
    degree;

    pathPoints;
    pathData;
    winding;
    round;



    constructor(nodeId, objectId, objectName, points, closed, degree, winding, round)
    {
        super(VECTOR_PATH, nodeId, objectId, objectName);
        
        this.points = points.map(p => p.copy());
        this.closed = closed;
        this.degree = degree;

        this.winding = winding;
        this.round   = round;

        this.updatePathPoints();
        this.updatePathData();
    }



    copy()
    {
        const copy = new FigmaVectorPath(
            this.nodeId,
            this.objectId,
            this.objectName,
            this.points, 
            this.closed, 
            this.degree,
            this.winding,
            this.round);

        copy.x = this.x;
        copy.y = this.y;

        copy.copyBase(this);

        return copy;
    }



    updatePathPoints()
    {
        switch (this.degree)
        {
        case 0: this.pathPoints = this.points.map(p => p.toPoint()); break;
        case 1: this.pathPoints = this.points.map(p => p.toPoint()); break;
        case 2: this.pathPoints = this.points.map(p => p.toPoint()); break;
        case 3: this.pathPoints = getSmoothPoints(this.points, this.closed, getSmoothSegment);     break;
        case 4: this.pathPoints = getSmoothPoints(this.points, this.closed, getSineXSegment );      break;
        case 5: this.pathPoints = getSmoothPoints(this.points, this.closed, getSineYSegment );      break;
        }
    }



    updatePathData()
    {
        let minX = Number.MAX_SAFE_INTEGER;
        let minY = Number.MAX_SAFE_INTEGER;

        for (const p of this.points)
        {
            minX = Math.min(minX, NumberValue.prototype.toNumber.call(p.x));
            minY = Math.min(minY, NumberValue.prototype.toNumber.call(p.y));
        }


        this.x = minX;
        this.y = minY;

        this.pathData = getPathDataFromPoints(this.pathPoints, this.closed, this.degree);
    }
}



function getPathDataFromPoints(points, closed, degree)
{
    let pathData = '';


    switch (degree)
    {
    case 0: pathData = getLinearPathData   (points);         break;
    case 1: pathData = getQuadraticPathData(points, closed); break;
    case 2: 
    case 3: 
    case 4: 
    case 5: pathData = getCubicPathData    (points, closed); break;
    }


    const pointsAreValid =
           degree == 0 && points.length > 2
        || degree == 1 && points.length > 2
        || degree == 2 && points.length > 3
        || degree == 3 && points.length > 2
        || degree == 4 && points.length > 2
        || degree == 5 && points.length > 2;


    if (   pointsAreValid
        && (   closed
            || equalv(points[0], points.at(-1))))
        pathData += ' Z';


    //console.log('pathData =', pathData);
    return pathData;
}



function getQuadraticPathData(points, closed)
{
    let pathData = '';


    if (points.length < 3)
        return pathData;


    pathData += 'M';
    pathData += ' ' + points[0].x;
    pathData += ' ' + points[0].y;

    let i;
    for (i = 1; i < points.length-1; i += 2)
    {
        pathData += 
              ' Q'
            + ' ' + points[i  ].x
            + ' ' + points[i  ].y
            + ' ' + points[i+1].x
            + ' ' + points[i+1].y;
    }


    if (   points.length - i == 1
        && closed)
    {
        pathData += 
              ' Q'
            + ' ' + points.at(-1).x
            + ' ' + points.at(-1).y
            + ' ' + points.at( 0).x
            + ' ' + points.at( 0).y;
    }


    return pathData;
}



function getCubicPathData(points, closed)
{
    let pathData = '';


    if (points.length < 4)
        return pathData;


    pathData += 'M';
    pathData += ' ' + points[0].x;
    pathData += ' ' + points[0].y;

    let i;
    for (i = 1; i < points.length-2; i += 3)
    {
        pathData += 
              ' C'
            + ' ' + points[i  ].x
            + ' ' + points[i  ].y
            + ' ' + points[i+1].x
            + ' ' + points[i+1].y
            + ' ' + points[i+2].x
            + ' ' + points[i+2].y;
    }


    if (points.length - i == 2)
    {
        pathData += 
              ' C'
            + ' ' + points.at(-2).x
            + ' ' + points.at(-2).y
            + ' ' + points.at(-1).x
            + ' ' + points.at(-1).y
            + ' ' + points.at( 0).x
            + ' ' + points.at( 0).y;
    }


    return pathData;
}



function getSmoothPoints(points, closed, getSegment)
{
    if (points.length < 2)
        return '';


    const bp = [];


    // first point
    let [pp, p, pn] = getSegment(
        closed ? points.at(-1) : points[0], 
        points[0],
        points[1]);

    bp.push(p);


    let _pp = pn;


    // middle segments
    for (let i = 1; i < points.length; i++)
    {
        [pp, p, pn] = getSegment(
            points[i-1], 
            points[i],
            i == points.length-1 
            ? (closed ? points[0] : points[i])
            : points[i+1]);

        bp.push(_pp, pp, p);

        _pp = pn;
    }


    if (bp.length > 3)
    {
        if (closed)
        {
            if (   equal(bp[0].x, bp.at(-1).x, 0.01)
                && equal(bp[0].y, bp.at(-1).y, 0.01))
            {
                // last segment
                [pp, p, pn] = getSegment(
                    points.at(-2), 
                    points.at( 0),
                    points.at( 1));

                bp[1]           = pn;
                bp[bp.length-2] = pp;
            }
            else
            {
                // last segment
                [pp, p, pn] = getSegment(
                    points.at(-1), 
                    points.at( 0),
                    points.at( 1));

                bp.push(_pp, pp, p);

                bp[1]           = pn;
                bp[bp.length-2] = pp;
            }
        }
        else // open
        {
            bp[1]           = addv(bp[0],     mulvs(unitv(subv(bp[2],     bp[0]    )), distance(bp[3],     bp[0]    )/3));
            bp[bp.length-2] = addv(bp.at(-1), mulvs(unitv(subv(bp.at(-3), bp.at(-1))), distance(bp.at(-4), bp.at(-1))/3));
        }
    }


    return bp;
}



function getSmoothSegment(_pointP, _point, _pointN)
{
    const _pp = point(
        NumberValue.prototype.toNumber.call(_pointP.x),
        NumberValue.prototype.toNumber.call(_pointP.y));

    const _p = point(
        NumberValue.prototype.toNumber.call(_point.x),
        NumberValue.prototype.toNumber.call(_point.y));

    const _pn = point(
        NumberValue.prototype.toNumber.call(_pointN.x),
        NumberValue.prototype.toNumber.call(_pointN.y));


    const v = subv(_pn, _pp);
    
    
    let a = angleDiff(
        angle(subv(_p, _pp)), 
        angle(subv(_pn, _p)));
       
    a = Math.abs(a);
    while (a > Tau/2) a -= Tau;
    

    const k     = 4 * (Math.sqrt(2) - 1) / 3;        // or use the value 0.55191502449 from http://spencermortensen.com/articles/bezier-circle/
	const kCorr = 0.9993391093366649465402826439248; // slight improvement (see Bézier Curves p. 13, Gernot Hoffmann);

    let f =
        a > Tau/4
        ? 1/3 + (k*kCorr - 1/3) * Math.sin(a)
        : 1/3 + (k*kCorr - 1/3) * (1 - Math.cos(a));
    

    const pp = addv(_p, mulvs(unitv(v), -lengthv(v)/2 * f));
    const pn = addv(_p, mulvs(unitv(v),  lengthv(v)/2 * f));


    return [pp, _p, pn];
}



function getSineXSegment(_pointP, _point, _pointN)
{
    const _pp = point(
        NumberValue.prototype.toNumber.call(_pointP.x),
        NumberValue.prototype.toNumber.call(_pointP.y));

    const _p = point(
        NumberValue.prototype.toNumber.call(_point.x),
        NumberValue.prototype.toNumber.call(_point.y));

    const _pn = point(
        NumberValue.prototype.toNumber.call(_pointN.x),
        NumberValue.prototype.toNumber.call(_pointN.y));


    const pp = point(_p.x - (_p.x - _pp.x) * 0.3615, _p.y);
    const pn = point(_p.x + (_pn.x - _p.x) * 0.3615, _p.y);

    return [pp, _p, pn];
}



function getSineYSegment(_pointP, _point, _pointN)
{
    const _pp = point(
        NumberValue.prototype.toNumber.call(_pointP.x),
        NumberValue.prototype.toNumber.call(_pointP.y));

    const _p = point(
        NumberValue.prototype.toNumber.call(_point.x),
        NumberValue.prototype.toNumber.call(_point.y));

    const _pn = point(
        NumberValue.prototype.toNumber.call(_pointN.x),
        NumberValue.prototype.toNumber.call(_pointN.y));


    const pp = point(_p.x, _p.y - (_p.y - _pp.y) * 0.3615);
    const pn = point(_p.x, _p.y + (_pn.y - _p.y) * 0.3615);

    return [pp, _p, pn];
}
class FigmaVectorPath
extends FigmaShape
{
    x;
    y;
    
    points;
    closed;
    degree;

    pathData;
    winding;
    round;



    constructor(nodeId, objectId, points, closed, degree, winding, round)
    {
        super(VECTOR_PATH, nodeId, objectId);
        
        this.points = [...points];
        this.closed = closed;
        this.degree = degree;

        this.updatePathData();
        
        this.winding = winding;
        this.round   = round;
    }



    copy()
    {
        const copy = new FigmaVectorPath(
            this.nodeId,
            this.objectId,
            [], 0, 0,
            this.winding,
            this.round);

        copy.x        = this.x;
        copy.y        = this.y;

        copy.points   = [...this.points];
        copy.closed   = this.closed;
        copy.degree   = this.degree;

        copy.pathData = this.pathData;

        copy.copyBase(this);

        return copy;
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

        this.pathData = getPathDataFromPoints(this.points, this.closed, this.degree);
    }
}



function getPathDataFromPoints(points, closed, degree)
{
    let pathData = '';


    switch (degree)
    {
    case 0: pathData = getLinearPathData   (points.map(p => p.toPoint()));     break;
    case 1: pathData = getQuadraticPathData(points.map(p => p.toPoint()));     break;
    case 2: pathData = getCubicPathData    (points.map(p => p.toPoint()));     break;
    case 3: pathData = getSmoothPathData   (points, closed, getSmoothSegment); break;
    case 4: pathData = getSmoothPathData   (points, closed, getSineXSegment);  break;
    case 5: pathData = getSmoothPathData   (points, closed, getSineYSegment);  break;
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
            || points[0].equals(points.at(-1))))
        pathData += ' Z';


    //console.log('pathData =', pathData);
    return pathData;
}



function getLinearPathData(points)
{
    let pathData = '';


    if (points.length < 2)
        return pathData;


    pathData += 'M';
    pathData += ' ' + points[0].x;
    pathData += ' ' + points[0].y;

    for (let i = 1; i < points.length; i++)
    {
        pathData += 
              ' L'
            + ' ' + points[i].x
            + ' ' + points[i].y;
    }


    return pathData;
}



function getQuadraticPathData(points)
{
    let pathData = '';


    if (points.length < 3)
        return pathData;


    pathData += 'M';
    pathData += ' ' + points[0].x;
    pathData += ' ' + points[0].y;

    for (let i = 1; i < points.length-1; i += 2)
    {
        pathData += 
                ' Q'
            + ' ' + points[i  ].x
            + ' ' + points[i  ].y
            + ' ' + points[i+1].x
            + ' ' + points[i+1].y;
    }


    return pathData;
}



function getCubicPathData(points)
{
    let pathData = '';


    if (points.length < 4)
        return pathData;


    pathData += 'M';
    pathData += ' ' + points[0].x;
    pathData += ' ' + points[0].y;

    for (let i = 1; i < points.length-2; i += 3)
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


    return pathData;
}



function getSmoothPathData(points, closed, getSegment)
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
            // last segment
            [pp, p, pn] = getSegment(
                points.at(-1), 
                points.at( 0),
                points.at( 1));
    
            bp.push(_pp, pp, p);

            bp[1]           = addv(bp[0],     mulvs(unitv(subv(bp.at(-1), bp[0])), -distance(bp[3],     bp[0]    )/3));
            bp[bp.length-2] = addv(bp.at(-1), mulvs(unitv(subv(bp[0], bp.at(-1))), -distance(bp.at(-4), bp.at(-1))/3));
        }
        else // open
        {
            bp[1]           = addv(bp[0],     mulvs(unitv(subv(bp[2],     bp[0]    )), distance(bp[3],     bp[0]    )/3));
            bp[bp.length-2] = addv(bp.at(-1), mulvs(unitv(subv(bp.at(-3), bp.at(-1))), distance(bp.at(-4), bp.at(-1))/3));
        }
    }


    return getCubicPathData(bp);
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

    // console.log('_pp =', _pp);
    // console.log('_p  =', _p );
    // console.log('_pn =', _pn);

    const v = subv(_pn, _pp);
    
    let a = angleDiff(
        angle(_p, _pp), 
        angle(_pn, _p));

    while (a > Tau/2)
        a -= Tau;

    a = Math.abs(a);
    console.log('a =', a);
    

    const k     = 4 * (Math.sqrt(2) - 1) / 3;        // or use the value 0.55191502449 from http://spencermortensen.com/articles/bezier-circle/
	const kCorr = 0.9993391093366649465402826439248; // slight improvement (see Bézier Curves p. 13, Gernot Hoffmann);

    const f = 
        a < Tau/4
        ? k*kCorr * Math.sin(a)
        : 1/3 + (k*kCorr - 1/3) * Math.sin(a);

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
class FigmaVectorPath
extends FigmaShape
{
    x;
    y;
    width;
    height;
    
    points;

    closed;
    degree;
    winding;


    round;
    
    pathPoints;
    pathData;



    constructor(nodeId, objectId, objectName, points, closed, degree, winding, round)
    {
        super(VECTOR_PATH, nodeId, objectId, objectName);
        
        
        this.points  = points.map(p => p.copy());
   
        this.closed  = closed;
        this.degree  = degree;
        this.winding = winding;

        this.round   = round;
        

        this.updatePathPoints();
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


        copy.x          = this.x;
        copy.y          = this.y;
        copy.width      = this.width;
        copy.height     = this.height;

        copy.pathPoints = [...this.pathPoints];
        copy.pathData   = this.pathData;


        copy.copyBase(this);


        return copy;
    }



    copyBase(base)
    {
        super.copyBase(base);

        if (base.points) this.points = base.points.map(p => p.copy());
    }



    getBounds()
    {
        let bounds = Rect.NaN;


        switch (this.degree)
        {
            case 0:
                for (const p of this.pathPoints)
                    bounds = expandRect_(bounds, p);

                break;

            case 1:
                {
                    let i;
                    for (i = 0; i < this.pathPoints.length-2; i += 2)
                    {
                        bounds = expandRect(
                            bounds, 
                            bounds2(
                                this.pathPoints[i  ], 
                                this.pathPoints[i+1],
                                this.pathPoints[i+2]));
                    }

                    if (   this.closed
                        && i < this.pathPoints.length-1)
                    {
                        bounds = expandRect(
                            bounds, 
                            bounds2(
                                this.pathPoints.at(-2), 
                                this.pathPoints.at(-1),
                                this.pathPoints.at( 0)));
                    }

                    break;
                }
            case 2:
            case 3:
            case 4:
            case 5:
                {
                    let i;
                    for (i = 0; i < this.pathPoints.length-3; i += 3)
                    {
                        const b3 = bounds3(
                            this.pathPoints[i  ], 
                            this.pathPoints[i+1],
                            this.pathPoints[i+2],
                            this.pathPoints[i+3]);

                        bounds = expandRect(
                            bounds, 
                            b3);
                    }

                    if (   this.closed
                        && i < this.pathPoints.length - 2)
                    {
                        const b3 = bounds3(
                            this.pathPoints.at(-3), 
                            this.pathPoints.at(-2), 
                            this.pathPoints.at(-1),
                            this.pathPoints.at( 0));

                        bounds = expandRect(
                            bounds, 
                            b3);
                    }

                    break;
                }
            default:
                console.error('invalid curve degree');
        }


        return bounds;
    }



    applyTransform2(xform, affectSpace)
    {
        const space = this.createSpaceTransform();


        if (affectSpace > 0)
        {
            this.applyObjectTransform(xform, space);

            this.updatePoints(xform, space);
            this.updatePathPoints();
        }

        if (affectSpace != 1)
            this.applySpaceTransform2(xform, space);
    }
    
    
    
    updatePoints(xform, space)
    {
        for (let i = 0; i < this.points.length; i++)
        {
            let p      = this.points[i].toPoint();
            let smooth = this.points[i].smooth;

            p = transformPoint2(p, xform, space);

            this.points[i]        = PointValue.fromPoint(this.nodeId, p);
            this.points[i].smooth = smooth;
        }
    }



    updatePathPoints()
    {
        switch (this.degree)
        {
        case 0: this.pathPoints = this.points.map(p => p.toPoint());                           break;
        case 1: this.pathPoints = this.points.map(p => p.toPoint());                           break;
        case 2: this.pathPoints = this.points.map(p => p.toPoint());                           break;
        case 3: this.pathPoints = getSmoothPoints(this.points, this.closed, getSmoothSegment); break;
        case 4: this.pathPoints = getSmoothPoints(this.points, this.closed, getSineXSegment ); break;
        case 5: this.pathPoints = getSmoothPoints(this.points, this.closed, getSineYSegment ); break;
        }
    }



    updatePathData()
    {
        if (   this.type == VECTOR_PATH
            || this.type == TRAPEZE)
        {
            const bounds = this.getBounds();

            this.x      = bounds.x;
            this.y      = bounds.y;
            this.width  = bounds.width;
            this.height = bounds.height;

            this.createDefaultTransformPoints(this.x, this.y, this.width, this.height);
        }

        this.pathData = getPathDataFromPoints(this.pathPoints, this.closed, this.degree);
    }



    checkFlipped2(flipX, flipY)
    {
        super.checkFlipped2(flipX, flipY);


        const bounds = this.getBounds();


        for (const point of this.points)
        {
            if (flipX) point.x.value = bounds.width  - point.x.value;
            if (flipY) point.y.value = bounds.height - point.y.value;
        }

        this.updatePathPoints();
    }



    toData()
    {
        // this.updatePathPoints();
        this.updatePathData();


        const oldType = this.type;
        this.type = VECTOR_PATH;

        const data = 
        [
            ...super.toData(),
   
            /* 24 */ this.x,
            /* 25 */ this.y,
            /* 26 */ this.width,
            /* 27 */ this.height,

            /* 28 */ this.pathData,
            /* 29 */ this.winding,
            /* 30 */ this.round * Math.abs(this.scaleCorners)
        ];

        this.type = oldType;


        return data;
    }



    toNewValue()
    {
        return VectorPathValue.fromObject(this);
    }
}



function getPathDataFromPoints(points, closed, degree)
{
    for (const p of points)
        if (   isNaN(p.x)
            || isNaN(p.y))
            return '';

            
    let pathData = '';


    switch (degree)
    {
    case 0: pathData = getLinearPathData   (points);         break; // linear
    case 1: pathData = getQuadraticPathData(points, closed); break; // quadratic
    case 2:                                                         // cubic
    case 3:                                                         // smooth
    case 4:                                                         // sine X
    case 5: pathData = getCubicPathData    (points, closed); break; // sine Y
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


    return pathData;
}



function getQuadraticPathData(points, closed)
{
    let pathData = '';


    if (points.length < 3)
        return pathData;


    pathData += 'M';
    pathData += ' ' + hardZero(points[0].x);
    pathData += ' ' + hardZero(points[0].y);

    let i;
    for (i = 1; i < points.length-1; i += 2)
    {
        pathData += 
              ' Q'
            + ' ' + hardZero(points[i  ].x)
            + ' ' + hardZero(points[i  ].y)
            + ' ' + hardZero(points[i+1].x)
            + ' ' + hardZero(points[i+1].y);
    }


    if (   points.length - i == 1
        && closed)
    {
        pathData += 
              ' Q'
            + ' ' + hardZero(points.at(-1).x)
            + ' ' + hardZero(points.at(-1).y)
            + ' ' + hardZero(points.at( 0).x)
            + ' ' + hardZero(points.at( 0).y);
    }


    return pathData;
}



function getCubicPathData(points, closed)
{
    let pathData = '';


    if (points.length < 4)
        return pathData;


    pathData += 'M';
    pathData += ' ' + hardZero(points[0].x);
    pathData += ' ' + hardZero(points[0].y);

    let i;
    for (i = 1; i < points.length-2; i += 3)
    {
        pathData += 
              ' C'
            + ' ' + hardZero(points[i  ].x)
            + ' ' + hardZero(points[i  ].y)
            + ' ' + hardZero(points[i+1].x)
            + ' ' + hardZero(points[i+1].y)
            + ' ' + hardZero(points[i+2].x)
            + ' ' + hardZero(points[i+2].y);
    }


    if (   points.length - i == 2
        && closed)
    {
        pathData += 
              ' C'
            + ' ' + hardZero(points.at(-2).x)
            + ' ' + hardZero(points.at(-2).y)
            + ' ' + hardZero(points.at(-1).x)
            + ' ' + hardZero(points.at(-1).y)
            + ' ' + hardZero(points.at( 0).x)
            + ' ' + hardZero(points.at( 0).y);
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

        if (points[i].smooth)
            [pp, pn] = getSmoothPoint(points[i], pp, p, pn);
            
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

                if (points[0].smooth)
                    [pp, pn] = getSmoothPoint(points[0], pp, p, pn);

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

                if (points[0].smooth)
                    [pp, pn] = getSmoothPoint(points[0], pp, p, pn);

                bp.push(_pp, pp, p);

                bp[1]           = pn;
                bp[bp.length-2] = pp;
            }
        }
        else // open
        {
            bp[1]           = addv(bp[0],     mulvs(unitv(subv(bp[2],     bp[0]    )), distv(bp[3],     bp[0]    )/3));
            bp[bp.length-2] = addv(bp.at(-1), mulvs(unitv(subv(bp.at(-3), bp.at(-1))), distv(bp.at(-4), bp.at(-1))/3));
        }
    }


    return bp;
}



function getSmoothPoint(point, pp, p, pn)
{
    if (point.smooth)
    {
        const smooth = point.smooth.value;
        
        pp = addv(p, mulvs(subv(pp, p), smooth));
        pn = addv(p, mulvs(subv(pn, p), smooth));
    }

    return [pp, pn];
}



function getSmoothSegment(_pointP, _point, _pointN)
{
    const _pp = point(_pointP.x.value, _pointP.y.value);
    let   _p  = point(_point .x.value, _point .y.value);
    const _pn = point(_pointN.x.value, _pointN.y.value);


    const v = subv(_pn, _pp);
    
    
    let a = angleDiff(
        anglev(subv(_p, _pp)), 
        anglev(subv(_pn, _p)));
        

    a = Math.abs(a);
    while (a >= Tau/2) a -= Tau;


    const k     = 4 * (Math.sqrt(2) - 1) / 3;        // or use the value 0.55191502449 from http://spencermortensen.com/articles/bezier-circle/
	const kCorr = 0.9993391093366649465402826439248; // slight improvement (see Bézier Curves p. 13, Gernot Hoffmann);

    let f =
        a > Tau/4
        ? 1/3 + (k*kCorr - 1/3) * Math.sin(a)
        : 1/3 + (k*kCorr - 1/3) * (1 - Math.cos(a));
    

    let pp = addv(_p, mulvs(unitv(v), -lengthv(v)/2 * f));
    let pn = addv(_p, mulvs(unitv(v),  lengthv(v)/2 * f));

    pp = saltv(pp); // add salt to get around Figma's issue 
    _p = saltv(_p); // with straight otrhogonal bezier lines
    pn = saltv(pn);


    return [pp, _p, pn];
}



function getSineXSegment(_pointP, _point, _pointN)
{
    const _pp = point(_pointP.x.value, _pointP.y.value);
    const _p  = point(_point .x.value, _point .y.value);
    const _pn = point(_pointN.x.value, _pointN.y.value);

    const  pp = point(_p.x - (_p.x - _pp.x) * 0.3615, _p.y);
    const  pn = point(_p.x + (_pn.x - _p.x) * 0.3615, _p.y);

    return [pp, _p, pn];
}



function getSineYSegment(_pointP, _point, _pointN)
{
    const _pp = point(_pointP.x.value, _pointP.y.value);
    const _p  = point(_point .x.value, _point .y.value);
    const _pn = point(_pointN.x.value, _pointN.y.value);

    const  pp = point(_p.x, _p.y - (_p.y - _pp.y) * 0.3615);
    const  pn = point(_p.x, _p.y + (_pn.y - _p.y) * 0.3615);

    return [pp, _p, pn];
}
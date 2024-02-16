const quadrantKappa   = 4 * (Math.sqrt(2) - 1) / 3;        // or use the value 0.55191502449 from http://spencermortensen.com/articles/bezier-circle/
const kappaCorrection = 0.9993391093366649465402826439248; // slight improvement (see Bézier Curves p. 13, Gernot Hoffmann);



function bezierTangent(x0, y0, x1, y1, x2, y2, x3, y3, t)
{
    const p0 = point(x0, y0);
    const p1 = point(x1, y1);
    const p2 = point(x2, y2);
    const p3 = point(x3, y3);

    return unit(addv(addv(
        mulvs(subv(p1, p0), 3*sqr(1-t)),
        mulvs(subv(p2, p1), 6*(1-t)*t)),
        mulvs(subv(p3, p2), 3*sqr(t))));
}



function pointAlongLine(p0, p1, dist)
{
    return addv(p0, mulvs(unitv(subv(p1, p0)), dist));
}



function pointAlongSegment2(p0, p1, p2, dist, error = 0.001)
{
    const hullLength = 
          distv(p0, p1) 
        + distv(p1, p2);

    if (hullLength == 0)
        return Number.NAN;


    let t = dist / hullLength;

    if (t < 0 || t > 1)
        return Number.NAN;

        
    let halves = splitSeg2(p0, p1, p2, t);
    let l      = halves[0];

    let length = arcLength2(l[0], l[1], l[2], error);


    let loopProtect = 1000;

    while (Math.abs(dist - length) > error
        && loopProtect-- > 0)
    {
        t += (dist - length) / hullLength;

        halves = splitSeg2(p0, p1, p2, t);
        l      = halves[0];

        length = arcLength2(l[0], l[1], l[2], error);
    }

    if (loopProtect == 0)
        consoleError('endless loop in pointAlongSegment2()');


    return t;
}



function pointAlongSegment3(p0, p1, p2, p3, dist, error = 0.001)
{
    const hullLength = 
          distv(p0, p1) 
        + distv(p1, p2)
        + distv(p2, p3);

    if (hullLength == 0)
        return Number.NAN;


    let t = dist / hullLength;

    if (t < 0 || t > 1)
        return Number.NAN;

        
    let halves = splitSeg3(p0, p1, p2, p3, t);
    let l      = halves[0];

    let length = arcLength3(l[0], l[1], l[2], l[3], error);


    let loopProtect = 1000;

    while (Math.abs(dist - length) > error
        && loopProtect-- > 0)
    {
        t += (dist - length) / hullLength;

        halves = splitSeg3(p0, p1, p2, p3, t);
        l      = halves[0];

        length = arcLength3(l[0], l[1], l[2], l[3], error);
    }

    if (loopProtect == 0)
        consoleError('endless loop in pointAlongSegment3()');


    return t;
}



function tangentAlongSegment2(p0, p1, p2, dist, error = 0.001)
{
    const hullLength = 
          distv(p0, p1) 
        + distv(p1, p2);

    if (hullLength == 0)
        return Number.NAN;


    let t = dist / hullLength;

    if (t < 0 || t > 1)
        return Number.NAN;

        
    let halves = splitSeg2(p0, p1, p2, t);
    let l      = halves[0];

    let length = arcLength2(l[0], l[1], l[2], error);


    let loopProtect = 1000;

    while (Math.abs(dist - length) > error
        && loopProtect-- > 0)
    {
        t += (dist - length) / hullLength;

        halves = splitSeg2(p0, p1, p2, t);
        l      = halves[0];

        length = arcLength2(l[0], l[1], l[2], error);
    }

    if (loopProtect == 0)
        consoleError('endless loop in pointAlongSegment2()');


    return t;
}



function tangentAlongSegment3(p0, p1, p2, p3, dist, error = 0.001)
{
    const hullLength = 
          distv(p0, p1) 
        + distv(p1, p2)
        + distv(p2, p3);

    if (hullLength == 0)
        return Number.NAN;


    let t = dist / hullLength;

    if (t < 0 || t > 1)
        return Number.NAN;

        
    let halves = splitSeg3(p0, p1, p2, p3, t);
    let l      = halves[0];

    let length = arcLength3(l[0], l[1], l[2], l[3], error);


    let loopProtect = 1000;

    while (Math.abs(dist - length) > error
        && loopProtect-- > 0)
    {
        t += (dist - length) / hullLength;

        halves = splitSeg3(p0, p1, p2, p3, t);
        l      = halves[0];

        length = arcLength3(l[0], l[1], l[2], l[3], error);
    }

    if (loopProtect == 0)
        consoleError('endless loop in pointAlongSegment3()');


    return t;
}



function splitSeg2(p0, p1, p2, t)
{
    const c0  = lerpv(p0, p1, t);
    const c1  = lerpv(p1, p2, t);

    const c01 = lerpv(c0, c1, t);

    return [ [p0, c0, c01],
             [c01, c1, p2] ];
}



function splitSeg3(p0, p1, p2, p3, t)
{
    const c0   = lerpv(p0, p1, t);
    const c1   = lerpv(p1, p2, t);
    const c2   = lerpv(p2, p3, t);
                
    const c01  = lerpv(c0, c1, t);
    const c12  = lerpv(c1, c2, t);

    const c012 = lerpv(c01, c12, t);

    return [ [p0, c0, c01, c012],
             [c012, c12, c2, p3] ];
}



function arcLength2(p0, p1, p2, error = 0.0000001)
{
    const arcLen =
          distv(p0, p1)
        + distv(p1, p2);

    const chord = distv(p0, p2);
    // console.log('arcLen =', arcLen);
    // console.log('chord =', chord);

    if (arcLen - chord > error)
    {
        const halves = splitSeg2(p0, p1, p2, 0.5);
        const l      = halves[0];
        const r      = halves[1];
            
        return arcLength2(l[0], l[1], l[2], error)
             + arcLength2(r[0], r[1], r[2], error);
    }

    return arcLen;
}



function arcLength3(p0, p1, p2, p3, error = 0.0000001)
{
    const arcLen = 
          distv(p0, p1)
        + distv(p1, p2)
        + distv(p2, p3);

    const chord = distv(p0, p3);

    if ((arcLen - chord) > error)
    {
        const halves = splitSeg3(p0, p1, p2, p3, 0.5);
        const l      = halves[0];
        const r      = halves[1];
            
        return arcLength3(l[0], l[1], l[2], l[3], error)
             + arcLength3(r[0], r[1], r[2], r[3], error);
    }

    return arcLen;
}



function bounds2(p0, p1, p2)
{
    let rect = Rect.NaN;


    rect = expandRect_(rect, p0);
    rect = expandRect_(rect, p2);

    /*	if p1 is between p0 and p2 then 
        p0 and p2 are opposite corners of the bounds  */

    if (   (   p0.x <= p1.x && p1.x <= p2.x
            || p2.x <= p1.x && p1.x <= p0.x)
        && (   p0.y <= p1.y && p1.y <= p2.y
            || p2.y <= p1.y && p1.y <= p0.y))
        return rect;


    const ax = p0.x - 2*p1.x + p2.x;
    const bx = 2 * (p1.x - p0.x);
    
    const ay = p0.y - 2*p1.y + p2.y;
    const by = 2 * (p1.y - p0.y);


    const tx = -bx / nozero(2*ax);
    const ty = -by / nozero(2*ay);


    if (tx >= 0 && tx <= 1) rect = expandRect_(rect, lerpv2(p0, p1, p2, tx));
    if (ty >= 0 && ty <= 1) rect = expandRect_(rect, lerpv2(p0, p1, p2, ty));
    

    return rect;
}



function bounds3(p0, p1, p2, p3)
{
    let rect = Rect.NaN;


    rect = expandRect_(rect, p0);
    rect = expandRect_(rect, p3);


    const ax =   -p0.x + 3*p1.x - 3*p2.x + p3.x;
    const bx =  3*p0.x - 6*p1.x + 3*p2.x;
    const cx = -3*p0.x + 3*p1.x;

    const ay =   -p0.y + 3*p1.y - 3*p2.y + p3.y;
    const by =  3*p0.y - 6*p1.y + 3*p2.y;
    const cy = -3*p0.y + 3*p1.y;


    const roots = []; // there will be ≤4 solutions

    bounds3t(ax, bx, cx, roots);
    bounds3t(ay, by, cy, roots);


    for (const root of roots)
    {
        rect = expandRect_(
            rect, 
            lerpv3(p0, p1, p2, p3, root));
    }


    return rect;
}



function bounds3t(a, b, c, roots)
{
    let a_ = a * 3;
    let b_ = b * 2;


    let D = b_*b_ - 4*a_*c;
    let r;

    if (a_ == 0)
    {
        r = -c/b_;  if (r >= 0 && r <= 1) roots.push(r);
    }
    else
    {
        const _2a = 1/(2*a_);
        b_ *= _2a;
    
        if (D == 0)
        {
            if (b_ >= 0 && b_ <= 1) roots.push(-b_);
        }
        else if (D > 0)
        {
            D = Math.sqrt(D) * _2a;

            r = -b_ + D;  if (r >= 0 && r <= 1) roots.push(r);
            r = -b_ - D;  if (r >= 0 && r <= 1) roots.push(r);
        }
    }
}



function pointAlongCurve(degree, points, distance, error = 0.000001)
{
    let length    = 0;
    let segLength = 0;


    let i;
    for (i = 0; i < points.length - degree - 1; i += degree)
    {
        switch (degree)
        {
        case 1:  segLength = distv     (points[i], points[i+1]);                                  break;
        case 2:  segLength = arcLength2(points[i], points[i+1], points[i+2],              error); break;
        case 3:  segLength = arcLength3(points[i], points[i+1], points[i+2], points[i+3], error); break;
        default: consoleAssert(false);
        }

        if (length + segLength >= distance)
            break;

        length += segLength;
    }


    switch (degree)
    {
    case 1:  return pointAlongLine(points[i], points[i+1], distance - length);
    case 2:  return lerpv2        (points[i], points[i+1], points[i+2],              pointAlongSegment2(points[i], points[i+1], points[i+2],              distance - length));
    case 3:  return lerpv3        (points[i], points[i+1], points[i+2], points[i+3], pointAlongSegment3(points[i], points[i+1], points[i+2], points[i+3], distance - length));
    default: consoleAssert(false); 
    }

    
    return point_NaN;
}



function tangentAlongCurve(degree, points, distance, error = 0.000001)
{
    let length    = 0;
    let segLength = 0;


    let i;
    for (i = 0; i < points.length - degree - 1; i += degree)
    {
        switch (degree)
        {
        case 1:  segLength = distv     (points[i], points[i+1]);                                  break;
        case 2:  segLength = arcLength2(points[i], points[i+1], points[i+2],              error); break;
        case 3:  segLength = arcLength3(points[i], points[i+1], points[i+2], points[i+3], error); break;
        default: consoleAssert(false);
        }

        if (length + segLength >= distance)
            break;

        length += segLength;
    }


    switch (degree)
    {
    case 1:  return subv    (points[i+1], points[i]);
    case 2:  return tangent2(points[i], points[i+1], points[i+2],              pointAlongSegment2(points[i], points[i+1], points[i+2],              distance - length));
    case 3:  return tangent3(points[i], points[i+1], points[i+2], points[i+3], pointAlongSegment3(points[i], points[i+1], points[i+2], points[i+3], distance - length));
    default: consoleAssert(false); 
    }

    
    return point_NaN;
}



function curveLength(degree, points)
{
    let length = 0;

    for (let i = 0; i < points.length - degree; i += degree)
    {
        switch (degree)
        {
            case 1:
                length += distv(
                    points[i  ], 
                    points[i+1]);
                break;

            case 2:
                length += arcLength2(
                    points[i  ], 
                    points[i+1],
                    points[i+2]);
                break;

            case 3:
                length += arcLength3(
                    points[i  ], 
                    points[i+1],
                    points[i+2],
                    points[i+3]);
                break;
        }
    }

    return length;
}



function linear2cubic(linear)
{
    if (linear.length == 0)
        return [];


    const cubic = [linear[0]];
    
    for (let i = 0; i < linear.length-1; i++)
    {
        const p0 = linear[i  ];
        const p1 = linear[i+1];

        cubic.push(
            lerpv(p0, p1, 1/3),
            lerpv(p0, p1, 2/3),
            p1);
    }

    return cubic;
}



function quad2cubic(quad)
{
    if (quad.length == 0)
        return [];


    const cubic = [quad[0]];
    
    for (let i = 0; i < quad.length-2; i += 2)
    {
        const p0 = quad[i  ];
        const p1 = quad[i+1];
        const p2 = quad[i+2];

        cubic.push(
            lerpv(p0, p1, 2/3),
            lerpv(p2, p1, 2/3),
            p2);
    }

    return cubic;
}



function makeArc(p1, p2, p3)
{
    if (areClockwise(p1, p2, p3))
    {
        const pt = p1;
        p1 = p3;
        p3 = pt;
    }

    const pc = circleCenter(p1, p2, p3);

    const sa = anglev(subv(p1, pc));
    let   ea = anglev(subv(p3, pc));

    while (ea > sa) ea -= Tau; // construction is CCW

    return makeArc_(
        pc,
        lengthv(subv(p1, pc)),
        sa,
        ea);
}



function makeArc_(center, radius, startAngle, endAngle)
{
    let diff  = endAngle - startAngle;
    let angle = startAngle;


    const points = [];


    while (Math.abs(diff) > 0)
    {
        const da = 
            diff >= 0 
            ? Math.min(diff,  Tau/4) 
            : Math.max(diff, -Tau/4);

        const handle = radius * arcKappa(da) * kappaCorrection;

        const p1 = addv(center, vector(angle,      radius));
        const p2 = addv(center, vector(angle + da, radius));
    
        const v1 = subv(p1, center);
        const v2 = subv(p2, center);


        points.push(
            p1,
            subv(p1, mulvs(crossv(unitv(v1)), handle)),
            addv(p2, mulvs(crossv(unitv(v2)), handle)));

        angle += da;
        diff  -= da;
    }

    
    points.push(addv(center, vector(endAngle, radius)));


    return points;
}



function arcKappa(angle) 
{
    return 4 * Math.tan(angle/4) / 3; 
}



function areClockwise(p0, p1, p2)
{
    return crossv2(subv(p1, p0), subv(p2, p1)) >= 0;
}
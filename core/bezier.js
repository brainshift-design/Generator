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
        const v = lerpv3(p0, p1, p2, p3, root);

        // console.log('p0 =', p0);
        // console.log('p1 =', p1);
        // console.log('p2 =', p2);
        // console.log('p3 =', p3);
        // console.log('v  =', v );

        rect = expandRect_(
            rect, 
            v);
    }


    // console.log('bounds rect =', clone(rect));
    return rect;
}



function bounds3t(a, b, c, roots)
{
    a *= 3;
    b *= 2;


    let D = b*b - 4*a*c;
    let r;

    if (   Math.abs(a) < 1e-6
        && Math.abs(b) > 1e-6) // avoid division by 0
    {
        r = -c/b;  if (r >= 0 && r <= 1) roots.push(r);
        return;
    }


    if (D >= 0) // real roots exist
    {
        const sqrtD = Math.sqrt(D);

        r = (-b + sqrtD) / (2*a);  if (r >= 0 && r <= 1) roots.push(r);
        r = (-b - sqrtD) / (2*a);  if (r >= 0 && r <= 1) roots.push(r);
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




function makeWave(shape, x, y, width, amplitude, frequency, offset, alignX, alignY)
{
    const startX = x;
    const w      = width / frequency;
    

    offset -= 0.25;

    x += offset * w;
    
    while (x >  -w) x -= w;
    while (x <= -w) x += w;


    if (alignY == 1)
        amplitude *= 2;

        
    let height = amplitude;


    const points = [];


    switch (shape)
    {
        case 0: // square
            break;
            
        case 1: // saw
            break;

        case 2: // back saw
            break;

        case 3: // triangle
            break;

        case 4: // sine
        {
            let p0, p1, p2, p3;

            let i = 0;
            while (x < startX + width)
            {
                if (x + w/2 > startX)
                {
                    p0 = point(x,                              y+height);
                    p1 = point(x     + (x+w/2 - x)   * 0.3615, y+height);
                    p2 = point(x+w/2 + (x - (x+w/2)) * 0.3615, y       );
                    p3 = point(x+w/2,                          y       );

                    clipSinSegment(p0, p1, p2, p3, startX, width);

                    if (i++ == 0) points.push(p0);
                    points.push(p1, p2, p3);
                }

                x += w/2;


                if (x < startX + width)
                {
                    p0 = point(x,                              y       );
                    p1 = point(x     + (x+w/2 - x)   * 0.3615, y       );
                    p2 = point(x+w/2 + (x - (x+w/2)) * 0.3615, y+height);
                    p3 = point(x+w/2,                          y+height);
                    
                    clipSinSegment(p0, p1, p2, p3, startX, width);
                    
                    if (i++ == 0) points.push(p0);
                    points.push(p1, p2, p3);
                }

                x += w/2;
            }


            break;
        }
    }


    points.forEach(p =>
    {
             if (alignX == 1) p.x -= width/2;
        else if (alignX == 2) p.x -= width;
    });

    points.forEach(p =>
    {
             if (alignY == 1) p.y -= height/2;
        else if (alignY == 2) p.y -= height;
    });


    return points;
}



function clipSinSegment(p0, p1, p2, p3, startX, width)
{
    if (   p0.x <  startX
        && p3.x >= startX)
    {
        const t        = findTforX3(p0, p1, p2, p3, startX);
        const segments = splitSeg3(p0, p1, p2, p3, t);
        const seg      = segments[1];

        p0.x = seg[0].x;  p0.y = seg[0].y;
        p1.x = seg[1].x;  p1.y = seg[1].y;
        p2.x = seg[2].x;  p2.y = seg[2].y;
        p3.x = seg[3].x;  p3.y = seg[3].y;
    }
    
    if (   p0.x <  startX + width
        && p3.x >= startX + width)
    {
        const t        = findTforX3(p0, p1, p2, p3, startX + width);
        const segments = splitSeg3(p0, p1, p2, p3, t);
        const seg      = segments[0];

        p0.x = seg[0].x;  p0.y = seg[0].y;
        p1.x = seg[1].x;  p1.y = seg[1].y;
        p2.x = seg[2].x;  p2.y = seg[2].y;
        p3.x = seg[3].x;  p3.y = seg[3].y;
    }
}



function areClockwise(p0, p1, p2)
{
    return crossv2(subv(p1, p0), subv(p2, p1)) >= 0;
}



function createCompleteCurve(degree, pathPoints, closed)
{
    const segPoints = pathPoints.slice(0, Math.floor((pathPoints.length-1) / degree) * degree + 1);
    let   points;
    
    
    if (closed)
    {
        if (   pathPoints.length == segPoints.length
            && equalv(pathPoints[0], pathPoints.at(-1)))
            points = pathPoints;
        else if (pathPoints.length - segPoints.length == degree-1)
            points = [...pathPoints, pathPoints[0]];
        else
        {
            switch (degree)
            {
            case 1: points = [...segPoints,                                                                                         segPoints[0]]; break;
            case 2: points = [...segPoints, lerpv(segPoints.at(-1), segPoints[0], 1/2),                                             segPoints[0]]; break;
            case 3: points = [...segPoints, lerpv(segPoints.at(-1), segPoints[0], 1/3), lerpv(segPoints.at(-1), segPoints[0], 2/3), segPoints[0]]; break;
            }
        }
    }
    else
        points = segPoints;


    return points;
}



function findTforX3(p0, p1, p2, p3, x) 
{
    // Newton-Raphson method: t1 = t0 - f(t0) / f'(t0)


    let precision     = 0.00001;
    let t             = 0.5; // initial guess
    let maxIterations = 20;
    let i             = 0;
  
    while (i < maxIterations) 
    {
        let xAtT =     (1 - t)**3        * p0.x
                 + 3 * (1 - t)**2 * t    * p1.x
                 + 3 * (1 - t)    * t**2 * p2.x
                 +                  t**3 * p3.x;
    
        let dAtT = -3 * (1 - t)**2 * p0.x 
                  + 3 * (1 - t)**2 * p1.x - 6 * t * (1 - t) * p1.x 
                  - 3 *      t **2 * p2.x + 6 * t * (1 - t) * p2.x 
                  + 3 *      t **2 * p3.x;
    
        let tNext = t - (xAtT - x) / dAtT;
    

        if (Math.abs(tNext - t) < precision) 
          return tNext;

          
        t = tNext;
        i++;
    }
  

    return t;
}
  
  
  
  function closestPointOnCurve(degree, points, p)
{
    const closestPoints = [];

    let i;
    for (i = 0; i < points.length - degree; i += degree)
    {
        switch (degree)
        {
        case 1:  closestPoints.push(closestPointOnLine(points[i], points[i+1], p, true));
        case 2:  closestPoints.push(lerpv2(points[i], points[i+1], points[i+2],              closestPointOnSegment2(points[i], points[i+1], points[i+2],              p, 0, 1)));
        case 3:  closestPoints.push(lerpv3(points[i], points[i+1], points[i+2], points[i+3], closestPointOnSegment3(points[i], points[i+1], points[i+2], points[i+3], p, 0, 1)));
        default: consoleAssert(false);
        }
    }


    let closest = point_NaN;

    for (const cp of closestPoints)
    {
        if (   pointIsNaN(closest)
            || distv(cp, p) < distv(closest, p))
            closest = cp;
    }


    return closest;
}



function closestTangentOnCurve(degree, points, p, constrain = 0)
{
    const closestPoints = [];

    let i;
    for (i = 0; i < points.length - degree; i += degree)
    {
        switch (degree)
        {
        case 1:  
            closestPoints.push([
                closestPointOnLine(points[i], points[i+1], p, true, constrain),
                subv(points[i+1], points[i])]);

            break;

        case 2:  
        {
            const t = closestPointOnSegment2(points[i], points[i+1], points[i+2], p, 0, 1, constrain);

            closestPoints.push([
                lerpv2  (points[i], points[i+1], points[i+2], t), 
                tangent2(points[i], points[i+1], points[i+2], t)]); 

            break;
        }
        case 3:  
        {
            const t = closestPointOnSegment3(points[i], points[i+1], points[i+2], points[i+3], p, 0, 1, constrain);

            closestPoints.push([
                lerpv3  (points[i], points[i+1], points[i+2], points[i+3], t),
                tangent3(points[i], points[i+1], points[i+2], points[i+3], t)]); 

            break;
        }
        default: consoleAssert(false);
        }
    }


    let closest = point_NaN;
    let tangent = point_NaN;

    for (let i = 0; i < closestPoints.length; i++)
    {
        const cp = closestPoints[i][0];

        if (   pointIsNaN(closest)
            || distv(cp, p) < distv(closest, p))
        {
            closest = cp;
            tangent = closestPoints[i][1];
        }
    }


    return [closest, tangent];
}



function closestPointOnSegment2(p0, p1, p2, p, start, end, constrain = 0, nSlices = 1000, nIterations = 1000)
{
    if (nIterations <= 0) 
        return (start + end) / 2;
    

    
    const tick = (end - start) / nSlices;

    if (tick <= 0.000001)
        return (start + end) / 2;


    let best = 0;

    let bestDistance = Number.MAX_SAFE_INTEGER;
    let currentDistance;


    let t = start;
    
    while (t <= end) 
    {
        const hp  = lerpv2(p0, p1, p2, t);
        const dp2 = sqrv(subv(hp, p));

        currentDistance = 
              (constrain != 2 ? dp2.x : 0) 
            + (constrain != 1 ? dp2.y : 0);

        if (currentDistance < bestDistance) 
        {
            bestDistance = currentDistance;
            best = t;
        }
        
        t += tick;
    }


    return closestPointOnSegment2(
        p0, p1, p2,
        p, 
        Math.max(best - tick, 0), 
        Math.min(best + tick, 1), 
        constrain,
        nSlices,
        nIterations - 1);
}



function closestPointOnSegment3(p0, p1, p2, p3, p, start, end, constrain = 0, nSlices = 1000, nIterations = 1000)
{
    if (nIterations <= 0)
        return (start + end) / 2;

    
    const tick = (end - start) / nSlices;

    if (tick <= 0.000001)
        return (start + end) / 2;


    let best = 0;

    let bestDistance = Number.MAX_SAFE_INTEGER;
    let currentDistance;


    let t = start;
    
    while (t <= end) 
    {
        const hp  = lerpv3(p0, p1, p2, p3, t);
        const dp2 = sqrv(subv(hp, p));
        
        currentDistance = 
              (constrain != 2 ? dp2.x : 0) 
            + (constrain != 1 ? dp2.y : 0);

        if (currentDistance < bestDistance) 
        {
            bestDistance = currentDistance;
            best = t;
        }
        
        t += tick;
    }


    return closestPointOnSegment3(
        p0, p1, p2, p3,
        p, 
        Math.max(best - tick, 0), 
        Math.min(best + tick, 1), 
        nSlices,
        nIterations - 1);
}
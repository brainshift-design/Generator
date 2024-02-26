const point_NaN = point(Number.NaN, Number.NaN);



function pointIsNaN(p) { return isNaN(p.x) || isNaN(p.y); }



function unit(v)
{
    return v.X != 0 
        || v.Y != 0
        ? mulvs(v, 1 / lengthv(v))
        : point(0, 0);
}



function lerpv(p0, p1, t)
{
    return point(
        lerp(p0.x, p1.x, t),
        lerp(p0.y, p1.y, t));
}



function lerpv2(p0, p1, p2, t)
{
    return point(
        lerp2(p0.x, p1.x, p2.x, t),
        lerp2(p0.y, p1.y, p2.y, t));
}



function lerpv3(p0, p1, p2, p3, t)
{
    return point(
        lerp3(p0.x, p1.x, p2.x, p3.x, t),
        lerp3(p0.y, p1.y, p2.y, p3.y, t));
}



function clipEdge(p, q, t0, t1)
{
    if (p == 0 && q < 0)
    {
        return null;
    }
    else if (p < 0)
    {
        const r = q/p;

             if (r > t1) return null;
        else if (r > t0) t0 = r;
    }
    else if (p > 0)
    {
        const r = q/p;

             if (r < t0) return null;
        else if (r < t1) t1 = r;
    }

    return [t0, t1];
}



function clipLine(x1, y1, x2, y2, left, top, right, bottom)
{
    let   t0 = 0;
    let   t1 = 1;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const cl = clipEdge(-dx, -(left - x1), t0, t1); if (cl != null) { t0 = cl[0]; t1 = cl[1]; } else return null;
    const cr = clipEdge( dx,  right - x1,  t0, t1); if (cr != null) { t0 = cr[0]; t1 = cr[1]; } else return null;
    const ct = clipEdge(-dy,  -(top - y1), t0, t1); if (ct != null) { t0 = ct[0]; t1 = ct[1]; } else return null;
    const cb = clipEdge( dy,  bottom - y1, t0, t1); if (cb != null) { t0 = cb[0]; t1 = cb[1]; } else return null;

    if (t1 < 1)
    {
        x2 = x1 + t1*dx;
        y2 = y1 + t1*dy;
    }

    if (t0 > 0)
    {
        x1 = x1 + t0*dx;
        y1 = y1 + t0*dy;
    }

    return [
        point(x1, y1), 
        point(x2, y2) ];
}



function intersectLines(p1, p2, q1, q2, segment)
{
    if (   equalv(p1, p2) 
        || equalv(q1, q2)) 
        return point_NaN; // undefined line

    const v1 = subv(p2, p1);
    const v2 = subv(q2, q1);

    if (crossv2(v1, v2) == 0) 
        return point_NaN; // parallel lines

    const t1 = crossv2(subv(q1, p1), v2) / crossv2(v1, v2);
    const t2 = crossv2(subv(q1, p1), v1) / crossv2(v1, v2);

    if (   (   0 <= t1 && t1 <= 1
            && 0 <= t2 && t2 <= 1)
        || !segment)
        return addv(p1, mulvs(v1, t1));
        
    return point_NaN;
}



function closestPointOnLine(l0, l1, p, segment, constrain = 0)
{
    if (equalv(p, l0))
        return l0;

    const v    = unitv(crossv(subv(l1, l0)));      // perpendicular unit vector from p towards the line
    const dist = distv(p, lerpv(l0, l1, 1/2)) * 2; // the distance to any of the two points guarantees intersection with the line

    const c    = lerpv(l0, l1, 1/2);
    const dir  = distv(addv(p, v), c) < distv(p, c);


    let d;
    
         if (constrain == 2) d = point(dir ? -dist : dist, 0);
    else if (constrain == 1) d = point(0, dir ? -dist : dist);
    else                     d = mulvs(v, dir ? -dist : dist); 

    return intersectLines(l0, l1, p, subv(p, d), segment);
}



function signedPosOnLine(p0, p1, p)
{
    let cp = closestPointOnLine(p0, p1, p, false);

    const xform = mulm3m3(
        xmove(-p0),
        xrotate(-anglev2(p0, p1)));

    p0 = transform(p0, xform);
    p1 = transform(p1, xform);
    cp = transform(cp, xform);

    return (cp.X - p0.X) / nozero(p1.X - p0.X);
}



function rectInside(rect1, rect2)
{
    return rect1.l >= rect2.l
        && rect1.r <= rect2.r
        && rect1.t >= rect2.t
        && rect1.b <= rect2.b; 
}



function rectsIntersect(rect1, rect2)
{
    return !(
           rect1.l >= rect2.r
        || rect1.r <= rect2.l
        || rect1.t >= rect2.b
        || rect1.b <= rect2.t); 
}



function clipRect(rect, clip)
{
    if (!rectsIntersect(rect, clip))
        return Rect.NaN;

    return new AbsRect(
        Math.max(rect.l, clip.l),
        Math.max(rect.t, clip.t),
        Math.min(rect.r, clip.r),
        Math.min(rect.b, clip.b));
}



function validateRect(rect)
{
    return new Rect(
        rect.x + Math.min(rect.w, 0),
        rect.y + Math.min(rect.h, 0),
        Math.abs(rect.w),
        Math.abs(rect.h));
}



function validateRect_(x, y, w, h)
{
    return [
        x + Math.min(w, 0),
        y + Math.min(h, 0),
        Math.abs(w),
        Math.abs(h) ];
}



function transform(p, xform)
{
    return mulv2m3(p, xform);
}



function xmove(v)
{
    return [[1, 0, v.x],
            [0, 1, v.y],
            [0, 0, 1  ]];
}



function xrotate(angle)
{
    return [[ Math.cos(angle), Math.sin(angle), 0],
            [-Math.sin(angle), Math.cos(angle), 0],
            [ 0,               0,               1]];
}



function offsetRect(elem)
{
    return new Rect(
        elem.offsetLeft,
        elem.offsetTop,
        elem.offsetWidth,
        elem.offsetHeight);
}



function boundingRect(elem)
{
    const bounds = elem.getBoundingClientRect();

    return new Rect(
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height);
}



function circleCenter(p0, p1, p2)
{
    const v0  = subv(p1, p0);
    const v1  = subv(p2, p1);
    
    const pm0 = divvs(addv(p0, p1), 2);
    const pm1 = divvs(addv(p1, p2), 2);
    
    return intersectLines(
        pm0, addv(pm0, crossv(v0)), 
        pm1, subv(pm1, crossv(v1)), 
        false);
}



function halfArcAngle(p1, p2, p3)
{
    // returns the angle of the first half of the arc p1-p2

    const pc = circleCenter(p1, p2, p3);

    let a = angleDiff(
        anglev(subv(p1, pc)),
        anglev(subv(p2, pc)));

    // console.log('anglev(subv(p1, pc) =', anglev(subv(p1, pc)));    
    // console.log('anglev(subv(p2, pc) =', anglev(subv(p2, pc)));        
    // while (a < 0)
    //     a += Tau;

    return a;
}



function makeWave(shape, x, y, width, amplitude, frequency, offset, alignX, alignY)
{
    const startX = x;
    const w      = width / frequency;
    

    x += offset;
    
    
    while (x >  -w) x -= w;
    while (x <= -w) x += w;


    if (alignY == 1)
        amplitude *= 2;

        
    let height = amplitude;


    const points = [];


    if (Math.abs(w) > 0.0000001)
    {
        switch (shape)
        {
            case 0: makeSquareWave  (x, y, width, height, startX, w, points); break;
            case 1: makeSawWave     (x, y, width, height, startX, w, points); break;
            case 2: makeBackSawWave (x, y, width, height, startX, w, points); break;
            case 3: makeTriangleWave(x, y, width, height, startX, w, points); break;
            case 4: makeSineWave    (x, y, width, height, startX, w, points); break;
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
    }


    return points;
}



function makeSquareWave(x, y, width, height, startX, w, points)
{
    let p0, p1;

    
    while (x < startX + width)
    {
        if (x + w/2 > startX)
        {
            p0 = point(x,     y);
            p1 = point(x+w/2, y);

            clipLineSegment(p0, p1, startX, width);

            points.push(p0, p1);
        }

        x += w/2;


        if (x < startX + width)
        {
            p0 = point(x,     y+height);
            p1 = point(x+w/2, y+height);
            
            clipLineSegment(p0, p1, startX, width);
            
            points.push(p0, p1);
        }

        x += w/2;
    }
}



function makeSawWave(x, y, width, height, startX, w, points)
{
    let p0, p1;

    
    while (x < startX + width)
    {
        if (x + w > startX)
        {
            p0 = point(x,   y       );
            p1 = point(x+w, y+height);

            clipLineSegment(p0, p1, startX, width);

            points.push(p0, p1);
        }

        x += w;
    }
}



function makeBackSawWave(x, y, width, height, startX, w, points)
{
    let p0, p1;

    
    while (x < startX + width)
    {
        if (x + w > startX)
        {
            p0 = point(x,   y+height);
            p1 = point(x+w, y       );

            clipLineSegment(p0, p1, startX, width);

            points.push(p0, p1);
        }

        x += w;
    }
}



function makeTriangleWave(x, y, width, height, startX, w, points)
{
    let p0, p1;

    let i = 0;
    while (x < startX + width)
    {
        if (x + w/2 > startX)
        {
            p0 = point(x,     y+height);
            p1 = point(x+w/2, y       );

            clipLineSegment(p0, p1, startX, width);

            if (i++ == 0) points.push(p0);
            points.push(p1);
        }

        x += w/2;


        if (x < startX + width)
        {
            p0 = point(x,     y       );
            p1 = point(x+w/2, y+height);

            clipLineSegment(p0, p1, startX, width);

            if (i++ == 0) points.push(p0);
            points.push(p1);
        }

        x += w/2;
    }
}



function makeSineWave(x, y, width, height, startX, w, points)
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
}



function clipLineSegment(p0, p1, startX, width)
{
    if (   p0.x <  startX
        && p1.x >= startX)
    {
        const t        = (startX - p0.x) / nozero(p1.x - p0.x);
        const segments = splitLineSeg(p0, p1, t);
        const seg      = segments[1];

        p0.x = seg[0].x;  p0.y = seg[0].y;
        p1.x = seg[1].x;  p1.y = seg[1].y;
    }
    
    if (   p0.x <  startX + width
        && p1.x >= startX + width)
    {
        const t        = (startX + width - p0.x) / nozero(p1.x - p0.x);
        const segments = splitLineSeg(p0, p1, t);
        const seg      = segments[0];

        p0.x = seg[0].x;  p0.y = seg[0].y;
        p1.x = seg[1].x;  p1.y = seg[1].y;
    }
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
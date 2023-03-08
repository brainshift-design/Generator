const point_NaN = point(Number.NaN, Number.NaN);



function point(x, y) { return {x: x, y: y}; }

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
    const t0 = 0;
    const t1 = 1;

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

    if ((  0 <= t1 && t1 <= 1
        && 0 <= t2 && t2 <= 1)
        || !segment)
        return addv(p1, mulvs(v1, t1));
        
    return point_NaN;
}



function closestPointOnLine(l0, l1, p, segment)
{
    if (equalv(p, l0))
        return l0;
        
    const d = mulvs(
        unitv(crossv(subv(l1, l0))), // perpendicular unit vector from p towards the line
        distance(p, l0));            // the distance to any of the two points guarantees intersection with the line

    return intersectLines(l0, l1, p, subv(p, d), segment);
}



function signedPosOnLine(p0, p1, p)
{
    let cp = closestPointOnLine(p0, p1, p, false);

    const xform = mulm3m3(
        xmove(-p0),
        xrotate(-anglev(p0, p1)));

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
    return [[Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle),  Math.cos(angle), 0],
            [0,                0,               1]];
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
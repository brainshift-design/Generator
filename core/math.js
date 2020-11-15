const Tau = Math.PI * 2;
const phi = (Math.sqrt(5) - 1) / 2; // 0.618


function sqr (x) { return x*x;   };
function cube(x) { return x*x*x; };


function distance(p1, p2)
{
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;

    return Math.sqrt(dx*dx + dy*dy);
}

function distance_(x1, y1, x2, y2)
{
    var dx = x2 - x1;
    var dy = y2 - y1;

    return Math.sqrt(dx*dx + dy*dy);
}


function vector(angle, dist)
{
    return { 
        x: dist * Math.cos(angle), 
        y: dist * Math.sin(angle) };
}


function equalv(v1, v2)
{
    return v1.x == v2.x
        && v1.y == v2.y;
}

function lengthv(v)
{
    return Math.sqrt(v.x*v.x + v.y*v.y);
}

function unitv(v)
{
    return { x: v.x == 0 ? 0 : v.x / lengthv(v),
             y: v.y == 0 ? 0 : v.y / lengthv(v) };
}

function addv(v1, v2)
{
    return { x: v1.x + v2.x,
             y: v1.y + v2.y };
}	


function subv(v1, v2)
{
    return { x: v1.x - v2.x,
             y: v1.y - v2.y };
}	


function mulv(v1, v2)
{
    return { x: v1.x * v2.x,
             y: v1.y * v2.y };
}	

function mulvs(v, s)
{
    return { x: v.x * s,
             y: v.y * s };
}	


function divvs(v, s)
{
    return { x: v.x / s,
             y: v.y / s };
}	


function crossv(v)
{
    // returns a cross product of v and the unit vector pointing up the Z axis

    return { x:  v.y, 
             y: -v.x };
}


function crossv2(v1, v2)
{
    // returns the magnitude of v1×v2 = ‖v1‖‖v2‖sinθ "perpendicular dot product",
    // equivalent to dot(v1, cross(v2)) (same as in 3D with a Z component of 0)
    // also the area of the parallelogram between the two vectors
    // also determinant of 2×2 matrix built from the two vectors
    // positive if turn from v1 to v2 is clockwise

    return (v1.x * v2.y 
          - v1.y * v2.x);
}	


function anglev(v1, v2)
{
    return anglev_(v1.x, v1.y, v2.x, v2.y);
}


function anglev_(x1, y1, x2, y2)
{
    var dx = x2 - x1;
    var dy = y2 - y1;

    var angle = Math.atan2(dy, dx);
    if (angle < 0) angle += Tau;

    return angle;
}


function clipEdge(p, q, t0, t1)
{
    if (p == 0 && q < 0)
    {
        return null;
    }
    else if (p < 0)
    {
        var r = q/p;

             if (r > t1) return null;
        else if (r > t0) t0 = r;
    }
    else if (p > 0)
    {
        var r = q/p;

             if (r < t0) return null;
        else if (r < t1) t1 = r;
    }

    return [t0, t1];
}



function clipLine(x1, y1, x2, y2, left, top, right, bottom)
{
    var t0 = 0;
    var t1 = 1;

    var dx = x2 - x1;
    var dy = y2 - y1;

    var cl = clipEdge(-dx, -(left - x1), t0, t1); if (cl != null) { t0 = cl[0]; t1 = cl[1]; } else return null;
    var cr = clipEdge( dx, right - x1,   t0, t1); if (cr != null) { t0 = cr[0]; t1 = cr[1]; } else return null;
    var ct = clipEdge(-dy, -(top - y1),  t0, t1); if (ct != null) { t0 = ct[0]; t1 = ct[1]; } else return null;
    var cb = clipEdge( dy, bottom - y1,  t0, t1); if (cb != null) { t0 = cb[0]; t1 = cb[1]; } else return null;

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
        {x:x1, y:y1}, 
        {x:x2, y:y2} ];
}



function intersect(p1, p2, q1, q2, segment)
{
    if (   equalv(p1, p2) 
        || equalv(q1, q2)) 
        return {x:NaN, y:NaN}; // undefined line

    var v1 = subv(p2, p1);
    var v2 = subv(q2, q1);

    if (crossv2(v1, v2) == 0) 
        return {x:NaN, y:NaN}; // parallel lines

    var t1 = crossv2(subv(q1, p1), v2) / crossv2(v1, v2);
    var t2 = crossv2(subv(q1, p1), v1) / crossv2(v1, v2);

    if ((  0 <= t1 && t1 <= 1
        && 0 <= t2 && t2 <= 1)
        || !segment)
        return addv(p1, mulvs(v1, t1));
        
    return {x:NaN, y:NaN};
}



function closestPointOnLine(l0, l1, p, segment)
{
    if (equalv(p, l0))
        return l0;
        
    var d = mulvs(
        unitv(crossv(subv(l1, l0))), // perpendicular unit vector from p towards the line
        distance(p, l0));            // the distance to any of the two points guarantees intersection with the line

    return intersect(l0, l1, p, subv(p, d), segment);
}



function signedPosOnLine(p0, p1, p)
{
    var cp = closestPointOnLine(p0, p1, p, false);

    var xform = mulm3m3(
        xmove(-p0),
        xrotate(-anglev(p0, p1)));

    p0 = transform(p0, xform);
    p1 = transform(p1, xform);
    cp = transform(cp, xform);

    return (cp.X - p0.X) / nozero(p1.X - p0.X);
}


function mulv2m3(v, m)
{
    var r = [0, 0, 0];

    for (var i = 0; i < 3; i++)
    {
        // calculate the dot product of the ith row of m and v
        for (var j = 0; j < 3; j++)
            r[i] += m[i][j] * v[j];
    }

    return {x: r[0], y: r[1]};
}


function mulm3m3(m1, m2)
{
    var m = [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]];

    for (var i = 0; i < 3; i++)
    {
        for (var j = 0; j < 3; j++)
        {
            /*	calculate the dot product of ith row 
                of this and jth column of m  */
            for (var k = 0; k < 3; k++)
                m[i][j] += m1[i][k] * m2[k][j];
        }
    }

    return m;
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


class Rect
{
    x;
    y;
    w;
    h;

    get width()  { return this.w;            }
    get height() { return this.h;            }

    get left()   { return this.x;            }
    get center() { return this.x + this.w/2; }
    get right()  { return this.x + this.w;   }

    get top()    { return this.y;            }
    get middle() { return this.y + this.h/2  }
    get bottom() { return this.y + this.h;   }

    constructor(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    static NaN  = new Rect(Number.NaN, Number.NaN, Number.NaN, Number.NaN);
    static Zero = new Rect(0, 0, 0, 0);

    get isNaN()
    {
        return isNaN(this.x)
            || isNaN(this.y)
            || isNaN(this.w)
            || isNaN(this.h);
    }
}


function rectsIntersect(rect1, rect2)
{
    return !(
           rect1.left   >= rect2.right
        || rect1.right  <= rect2.left
        || rect1.top    >= rect2.bottom
        || rect1.bottom <= rect2.top); 
}

const Tau = Math.PI * 2;
const phi = (Math.sqrt(5) - 1) / 2; // 0.618
const Phi = (Math.sqrt(5) + 1) / 2; // 1.618



function equal(a, b)
{
    return Math.abs(b - a) < Eps;
}



function floorTo(x, dec)
{
    const div = Math.round(Math.pow(10, dec));
    return Math.floor((x + Number.EPSILON) * div) / div;    
}



function roundTo(x, dec)
{
    const div = Math.round(Math.pow(10, dec));
    return Math.round((x + Number.EPSILON) * div) / div;    
}



function sqr (x) { return x*x;   };
function cube(x) { return x*x*x; };



function nextPow2(x)
{
    x = toInt(x);

    x--;

    x |= x >> 1;
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;
    x |= x >> 32;

    return ++x;
}



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
    return point( 
        dist * Math.cos(angle), 
        dist * Math.sin(angle));
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
    return point(
        v.x == 0 ? 0 : v.x / lengthv(v),
        v.y == 0 ? 0 : v.y / lengthv(v));
}



function addv(v1, v2)
{
    return point(
        v1.x + v2.x,
        v1.y + v2.y);
}	



function subv(v1, v2)
{
    return point(
        v1.x - v2.x,
        v1.y - v2.y);
}	



function mulv(v1, v2)
{
    return point(
        v1.x * v2.x,
        v1.y * v2.y);
}	



function mulvs(v, s)
{
    return point(
        v.x * s,
        v.y * s);
}	



function divvs(v, s)
{
    return point(
        v.x / s,
        v.y / s);
}	



function crossv(v)
{
    // returns a cross product of v and the unit vector pointing up the Z axis

    return point(v.y, -v.x);
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
        let r = q/p;

             if (r > t1) return null;
        else if (r > t0) t0 = r;
    }
    else if (p > 0)
    {
        let r = q/p;

             if (r < t0) return null;
        else if (r < t1) t1 = r;
    }

    return [t0, t1];
}



function clipLine(x1, y1, x2, y2, left, top, right, bottom)
{
    let t0 = 0;
    let t1 = 1;

    let dx = x2 - x1;
    let dy = y2 - y1;

    let cl = clipEdge(-dx, -(left - x1), t0, t1); if (cl != null) { t0 = cl[0]; t1 = cl[1]; } else return null;
    let cr = clipEdge( dx, right - x1,   t0, t1); if (cr != null) { t0 = cr[0]; t1 = cr[1]; } else return null;
    let ct = clipEdge(-dy, -(top - y1),  t0, t1); if (ct != null) { t0 = ct[0]; t1 = ct[1]; } else return null;
    let cb = clipEdge( dy, bottom - y1,  t0, t1); if (cb != null) { t0 = cb[0]; t1 = cb[1]; } else return null;

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



function intersect(p1, p2, q1, q2, segment)
{
    if (   equalv(p1, p2) 
        || equalv(q1, q2)) 
        return point_NaN; // undefined line

    let v1 = subv(p2, p1);
    let v2 = subv(q2, q1);

    if (crossv2(v1, v2) == 0) 
        return point_NaN; // parallel lines

    let t1 = crossv2(subv(q1, p1), v2) / crossv2(v1, v2);
    let t2 = crossv2(subv(q1, p1), v1) / crossv2(v1, v2);

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
        
    let d = mulvs(
        unitv(crossv(subv(l1, l0))), // perpendicular unit vector from p towards the line
        distance(p, l0));            // the distance to any of the two points guarantees intersection with the line

    return intersect(l0, l1, p, subv(p, d), segment);
}



function signedPosOnLine(p0, p1, p)
{
    let cp = closestPointOnLine(p0, p1, p, false);

    let xform = mulm3m3(
        xmove(negv(p0)),
        xrotate(-anglev(p0, p1)));
        
    p0 = transform(p0, xform);
    p1 = transform(p1, xform);
    cp = transform(cp, xform);

    return (cp.x - p0.x) / nozero(p1.x - p0.x);
}



function mulv3m3(v, m)
{
    let r = [0, 0, 0];

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            r[i] += v[j] * m[i][j];

    return r;
}



function mulv2m3(v, m)
{
    let v3 = [v.x, v.y, 1];
    let r  = mulv3m3(v3, m);

    return point(r[0], r[1]);
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



function divm3s(m, s)
{
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            m[i][j] /= s;

    return m;
}



function cofactor(m)
{
    return [[  m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]),  m[1][0] * m[2][1] - m[2][0] * m[1][1] ],
            [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]),  m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])],
            [  m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]),  m[0][0] * m[1][1] - m[1][0] * m[0][1] ]]; 
}



function adjugate(m)
{
    return cofactor(transpose(m));
}



function determinant(m)
{
    return   m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
           - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2])
           + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]);
}



function inverse(m)
{
    return divm3s(adjugate(m), determinant(m));
}



function transpose(m)
{
    return [[m[0][0], m[1][0], m[2][0]],
            [m[0][1], m[1][1], m[2][1]],
            [m[0][2], m[1][2], m[2][2]]];
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



function gcd(a, b)
{
    var temp;
    while (1)
    {
        temp = a % b;

        if (temp == 0)
          return b;

        a = b;
        b = temp;
    }
}



// function ipow(n, e)
// {
//     var res = 1;

//     for (;;)
//     {
//         if (e & 1 != 0)
//             res *= n;

//         e >>= 1;

//         if (e == 0)
//             break;

//         n *= n;
//     }

//     return res;
// }



const MaxDigits = 100000;
 
function multRes(x, res, resSize)
{
    var carry = 0n;
    
    // multiply individual digits of res[] by n
    for (var i = 0; i < resSize; i++) 
    {
        var prod = res[i] * x + carry;
    
        res[i] = prod % 10n; // store last digit of prod in res[]
        carry  = prod / 10n; // put rest in carry
    }
    
    // put carry in res and
    // increase result size
    while (carry)
    {
        res[resSize] = carry % 10n;
        carry        = carry / 10n;
        resSize++;
    }

    return resSize;
}



function randomPrime(max = Number.MAX_SAFE_INTEGER/2)
{
    var num = Math.floor(Math.random() * max);
    return nextPrime(num);
}



function nextPrime(x) 
{
    while (!isPrime(++x));
    return x;
}



function isPrime(n, k = millerRabinIterations) // Miller-Rabin
{
    if (n <= 1) return false; 
    if (n <= 3) return true; // prime
    
    if (n % 2 == 0) 
        return false; // composite
    
    
    var d = n - 1;     // find d      
    while (d % 2 == 0) // so that x = 2^d * r + 1 
        d /= 2;        // for r >= 1
    
    
    for (var i = 0; i < k; i++)    
        if (!millerTest(d, n))
            return false; // composite
    
    
    return true; // maybe prime        
}    



function millerTest(d, n)
{
    return bigMillerTest(
        BigInt(d),
        BigInt(n));
}        



function uintFromBuffer(buffer, size)
{
    return uintFromBufferAt(buffer, 0, size);
}



function uintFromBufferAt(buffer, start, size)
{
    var val = 0;
    var mul = 1;

    for (var i = start+size-1; i >= start; i--) // little-endian
    {
        val += mul * buffer[i];
        mul <<= 8;
    }

    return val;
}



function uintToBuffer(val, buffer, bufferSize)
{
    uintToBufferAt(val, buffer, 0, bufferSize);
}



function uintToBufferAt(val, buffer, start, bufferSize)
{
    var size = Math.ceil(bigBitCount(val) / 8);
    
    size = Math.min(size, buffer.length - start);

    start += bufferSize - size;

    for (var i = start+size-1; i >= start; i--) // little-endian
    {
        buffer[i] = val & 0xFF; 
        val >>= 8;
    }
}



function lerp(a, b, t)
{
    return a + (b - a) * t;
}



function normalAngle(angle)
{
    while (angle <  0  ) angle += Tau;
    while (angle >= Tau) angle -= Tau;

    return angle; // [0, Tau|
}



function angleDiff(a1, a2)
{
    let diff = a2 - a1;

    while (diff <= -Tau/2) diff += Tau;
    while (diff >   Tau/2) diff -= Tau;

    return diff; // |-Tau/2, Tau/2]
}
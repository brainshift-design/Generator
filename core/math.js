const phi = (Math.sqrt(5) - 1) / 2; // 0.618
const Phi = (Math.sqrt(5) + 1) / 2; // 1.618



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



function ceilTo(x, dec)
{
    const div = Math.ceil(Math.pow(10, dec));
    return Math.ceil((x + Number.EPSILON) * div) / div;    
}



function distance_(x1, y1, x2, y2)
{
    const dx = x2 - x1;
    const dy = y2 - y1;

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



function saltv(v, salt = 0.0000000001)
{
    return addv(v, point(
        -salt + Math.random() * salt*2, 
        -salt + Math.random() * salt*2));
}



function negv(v)
{
    return point(-v.x, -v.y);
}



function crossv(v)
{
    // returns a cross product of v and the unit vector pointing up the Z axis

    return point(v.y, -v.x);
}



function anglev(v)
{
    let angle = Math.atan2(v.y, v.x);
    if (angle < 0) angle += Tau;

    return angle;
}



function angle_(x, y)
{
    let angle = Math.atan2(y, x);
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
        distv(p, l0));            // the distance to any of the two points guarantees intersection with the line

    return intersect(l0, l1, p, subv(p, d), segment);
}



function signedPosOnLine(p0, p1, p)
{
    let cp = closestPointOnLine(p0, p1, p, false);

    let xform = mulm3m3(
        xmove(negv(p0)),
        xrotate(-anglev2(p0, p1)));
        
    p0 = transform(p0, xform);
    p1 = transform(p1, xform);
    cp = transform(cp, xform);

    return (cp.x - p0.x) / nozero(p1.x - p0.x);
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



// function ipow(n, e)
// {
//     let res = 1;

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
    let carry = 0n;
    
    // multiply individual digits of res[] by n
    for (let i = 0; i < resSize; i++) 
    {
        const prod = res[i] * x + carry;
    
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
    const num = Math.floor(Math.random() * max);
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
    
    
    let d = n - 1;     // find d      
    while (d % 2 == 0) // so that x = 2^d * r + 1 
        d /= 2;        // for r >= 1
    
    
    for (let i = 0; i < k; i++)    
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
    let val = 0;
    let mul = 1;

    for (let i = start+size-1; i >= start; i--) // little-endian
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
    let size = Math.ceil(bigBitCount(val) / 8);
    
    size = Math.min(size, buffer.length - start);

    start += bufferSize - size;

    for (let i = start+size-1; i >= start; i--) // little-endian
    {
        buffer[i] = val & 0xFF; 
        val >>= 8;
    }
}



function lerpCos(a, b, t)
{
    return a < b
         ? a + (b - a) * (-Math.cos(t*Tau/2)+1)/2
         : a + (b - a) * (-Math.cos(t*Tau/2)+1)/2;
}



function lerp(a, b, t)
{
    return a + (b - a) * t;
}



function lerp2(p0, p1, p2, t)
{
    const c0 = lerp(p0, p1, t);
    const c1 = lerp(p1, p2, t);

    return lerp(c0, c1, t);
}



function tangent2(p0, p1, p2, t)
{
    return addv(mulvs(p0, -2*(1-t)), addv(mulvs(p1, 2*(1-2*t)), mulvs(p2, 2*t)));
}



function tangent3(p0, p1, p2, p3, t)
{
    return addv(
        mulvs(subv(p1, p0), 3 * Math.pow(1-t, 2)),
        addv(
           mulvs(subv(p2, p1), 6 * (1-t) * t),
           mulvs(subv(p3, p2), 3 * Math.pow(t, 2))));
}



function lerp3(p0, p1, p2, p3, t)
{
    const c0  = lerp(p0, p1, t);
    const c1  = lerp(p1, p2, t);
    const c2  = lerp(p2, p3, t);

    const c01 = lerp(c0, c1, t);
    const c12 = lerp(c1, c2, t);

    return lerp(c01, c12, t);
}



function normalAngle(angle)
{
    while (angle <  0  ) angle += Tau;
    while (angle >= Tau) angle -= Tau;

    return angle; // [0, Tau|
}



function dot3(m, v) 
{
    const result = [];

    for (let i = 0; i < m.length; i++) 
    {
        let sum = 0;

        for (let j = 0; j < v.length; j++) 
            sum += m[i][j] * v[j];

        result.push(sum);
    }
   
    return result;
}



function smoothstep(x)
{
    if (   x < 0 
        || x > 1) 
        return x;

    return 3*x*x - 2*x*x*x;
}



function getMean(values)
{
    return values.length > 0
         ? values.reduce((acc, cur) => acc + cur, 0) / values.length
         : Number.NaN;
}



function getTrimmedMean(values, trimStart, trimEnd = trimStart)
{
    if (   trimStart <  0
        || trimStart >= 0.5
        || trimEnd   <  0
        || trimEnd   >= 0.5)
        throw new Error('trimStart = ' + trimStart + ', trimEnd = ' + trimEnd + ', trim must be between 0 and 0.5');

    
    const sorted         = values.slice().sort((a, b) => a - b);

    const trimCountStart = Math.floor(sorted.length * trimStart);
    const trimCountEnd   = Math.floor(sorted.length * trimEnd  );

    const trimmed   = sorted.slice(trimCountStart, sorted.length - trimCountEnd);
    const sum       = trimmed.reduce((acc, val) => acc + val, 0);

    return trimmed.length > 0
         ? sum / values.length
         : Number.NaN;
}



function getMedian(values)
{
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    return sorted.length % 2 == 0
         ? (sorted[middle-1] + sorted[middle]) / 2
         : sorted[middle];
}
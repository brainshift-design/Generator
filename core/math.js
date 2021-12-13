const Tau = Math.PI * 2;
const phi = (Math.sqrt(5) - 1) / 2; // 0.618
const Phi = (Math.sqrt(5) + 1) / 2; // 1.618


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
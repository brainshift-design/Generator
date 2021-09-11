var bigBuffer = new Uint8Array(2048);



// function bigPower(a, n, p)
// {
//     var res = 1n;

//     a %= p; // update a if a >= p
 
//     while (n > 0n)
//     {
//         // if n is odd, multiply a by result
//         if (n & 1n)
//             res = (res*a) % p;
 
//         // n must be even now    
//         n >>= 1n;
//         a = (a*a) % p;
//     }    

//     return res;
// }    



function bigRandom(max = 0)
{
    var size = 
        max > 0
        ? Math.max(1, Math.floor(bigBitCount(max)/8))
        : bigBuffer.length;
    
    if (size > bigBuffer.length)
        bigBuffer = new Uint8Array(nextPow2(size));
        
    for (var i = 0; i < size; i++)
        bigBuffer[i] = toInt(Math.random() * 0x100);

    var rnd = bigFromBufferAt(bigBuffer, 0, size);

    if (max > 0)
        rnd = rnd % max;
        
    return rnd;
}



function bigPowMod(n, e, m) // n^e % mod
{
    var c = 1n;

    while (e > 0n)
    {
        if ((e & 1n) != 0n)
        {
            c *= n;
            c %= m;
        }

        e  >>= 1n;
        
        n *= n;
        n %= m;
    }
    
    return c;
}



function bigNextPrime(n) 
{
    while (!bigIsPrime(++n));
    return n;
}



function bigIsPrime(x, k = millerRabinIterations) // Miller-Rabin
{
    if (x <= 1n) return false; 
    if (x <= 3n) return true;
    
    if (x % 2n == 0n) 
        return false;
        
        
    var d = x - 1n;
    var s = 0n; 
                
    while (d % 2n == 0n) 
    {
        d /= 2n;         
        s++;
    }
        

    for (var i = 0; i < k; i++)    
    {
        var a = 2n + bigRandom(x - 1n);//bigMult(n - 3n, Math.random()); // -3 = -4 + 1 because random() doesn't include 1.0

        if (!bigIsWitness(a, s, d, x))
            return false;        
    }
        

    return true; 
}    

    

function bigIsWitness(a, s, d, n)
{
    var x = bigPowMod(a, d, n);
        
    if (x == 1n)
        return true;

    for (var j = 0n; j < s-1n; j++)
    {
        if (x == n-1n)
            return true;
        
        x = bigPowMod(x, 2n, n);
    }

    return x == n-1n;
}



// multiply BigInt by float 0 <= f <=1
// function bigMult(n, f)
// {
//     var mult = 100000000000000000000000000; // this is the float "precision"
    
//     return n*BigInt(mult) 
//          * BigInt(Math.floor(f*mult))
//          / sqr(BigInt(mult));
// }            



function bigFromBuffer(buffer)
{
    return bigFromBufferAt(buffer, 0, buffer.length);
}



function bigFromBufferAt(buffer, start, size)
{
    size = Math.min(size, buffer.length - start);
    
    var val = 0n;
    var mul = 1n;

    for (var i = start+size-1; i >= start; i--) // little-endian
    {
        val += mul * BigInt(buffer[i]);
        mul <<= 8n;
    }

    return val;
}



function bigToBuffer(n, buffer, bufferSize)
{
    bigToBufferAt(n, buffer, 0, bufferSize);
}



function bigToBufferAt(n, buffer, start, bufferSize)
{
    var size = Math.ceil(bigBitCount(n) / 8);
    
    size = Math.min(size, buffer.length - start);

    start += bufferSize - size;

    for (var i = start+size-1; i >= start; i--) // little-endian
    {
        buffer[i] = Number(n & 0xFFn); 
        n >>= 8n;
    }
}



function bigBitCount(n)
{
    return n.toString(2).length;
}



// function bigModInvert(n, m)
// {
//     for (var i = 1n; i < BigInt(m); i++)
//         if ((((n % m) * (i % m)) % m) == n)
//             return i;
// }



function bigModInvert(n, m)
{
    var gcd = bigGcdExtended(n, m);

    if (gcd[0] != 1n) return undefined; // inverse doesn't exist
    else              return (gcd[1] % m + m) % m;
}



function bigGcdExtended(n, m)
{
    if (n == 0n)
        return [m, 0n, 1n];

    var gcd = bigGcdExtended(m % n, n);

    var x = gcd[1];
    var y = gcd[2];

    return [
        gcd[0], 
        y - (m/n)*x,
        x ];
}



// function bigModInvert(u, v)
// {
//    var inv, u1, u3, v1, v3, t1, t3, q;
//    var iter;


//    /* Step X1. Initialise */
   
//    u1 = 1n;
//    u3 = u;
//    v1 = 0n;
//    v3 = v;
   

//    /* Remember odd/even iterations */
   
//    iter = 1n;

   
//    /* Step X2. Loop while v3 != 0 */
  
//    while (v3 != 0n)
//    {
//        /* Step X3. Divide and "Subtract" */
//        q  = u3 / v3;
//        t3 = u3 % v3;
//        t1 = u1 + q * v1;

//        /* Swap */
//        u1 = v1; v1 = t1; 
//        u3 = v3; v3 = t3;

//        iter = -iter;
//    }


//    /* Make sure u3 = gcd(u,v) == 1 */
 
//    if (u3 != 1n)
//        return 0n;   /* Error: No inverse exists */


//     /* Ensure a positive result */
//     if (iter < 0n)
//         inv = v - u1;
//     else
//         inv = u1;
//     return inv;
// }
var bigBuffer = new Uint8Array(2048);



function bigRandom(max = 0)
{
    const size = 
        max > 0
        ? Math.max(1, Math.floor(bigBitCount(max)/8))
        : bigBuffer.length;
    
    if (size > bigBuffer.length)
        bigBuffer = new Uint8Array(nextPow2(size));
        
    for (let i = 0; i < size; i++)
        bigBuffer[i] = toInt(Math.random() * 0x100);

    let rnd = bigFromBufferAt(bigBuffer, 0, size);

    if (max > 0)
        rnd = rnd % max;
        
    return rnd;
}



function bigPowMod(n, e, m) // n^e % mod
{
    let c = 1n;

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
        
        
    let d = x - 1n;
    let s = 0n; 
                
    while (d % 2n == 0n) 
    {
        d /= 2n;         
        s++;
    }
        

    for (let i = 0; i < k; i++)    
    {
        const a = 2n + bigRandom(x - 1n);//bigMult(n - 3n, Math.random()); // -3 = -4 + 1 because random() doesn't include 1.0

        if (!bigIsWitness(a, s, d, x))
            return false;        
    }
        

    return true; 
}    

    

function bigIsWitness(a, s, d, n)
{
    let x = bigPowMod(a, d, n);
        
    if (x == 1n)
        return true;

    for (let j = 0n; j < s-1n; j++)
    {
        if (x == n-1n)
            return true;
        
        x = bigPowMod(x, 2n, n);
    }

    return x == n-1n;
}



function bigFromBuffer(buffer)
{
    return bigFromBufferAt(buffer, 0, buffer.length);
}



function bigFromBufferAt(buffer, start, size)
{
    size = Math.min(size, buffer.length - start);
    
    let val = 0n;
    let mul = 1n;

    for (let i = start+size-1; i >= start; i--) // little-endian
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
    let size = Math.ceil(bigBitCount(n) / 8);
    
    size = Math.min(size, buffer.length - start);

    start += bufferSize - size;

    for (let i = start+size-1; i >= start; i--) // little-endian
    {
        buffer[i] = Number(n & 0xFFn); 
        n >>= 8n;
    }
}



function bigBitCount(n)
{
    return n.toString(2).length;
}



function bigModInvert(n, m)
{
    const gcd = bigGcdExtended(n, m);

    if (gcd[0] != 1n) return undefined; // inverse doesn't exist
    else              return (gcd[1] % m + m) % m;
}



function bigGcdExtended(n, m)
{
    if (n == 0n)
        return [m, 0n, 1n];

    const gcd = bigGcdExtended(m % n, n);

    const x   = gcd[1];
    const y   = gcd[2];

    return [
        gcd[0], 
        y - (m/n)*x,
        x ];
}
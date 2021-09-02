function createPublicPrivateKeys()
{
    // two random primes

    var p = nthPrime(100 + floatToInt(10 * Math.random()));
    var q = p;

    while (q == p)
        q = nthPrime(100 + floatToInt(10 * Math.random()));


    var n   = p*q;
    var phi = (p-1)*(q-1);
    
    
    var e = 2; // must be an integer, not be factor of n, and 1 < e < Ф(n)
    
    while (e < phi)
    {
        if (gcd(e, phi) == 1) break;
        else                  e++;
    }        

    
    console.log('p: ' + p);
    console.log('q: ' + q);
    console.log('n: ' + n);
    console.log('e: ' + e);
    

    return {
        public:  createPublicKey (n,   e), 
        private: createPrivateKey(phi, e) };
}                    



function createPublicKey(n, e)
{
    return {n:n, e:e};    
}    



function createPrivateKey(phi, e)
{
    var k = 2; // a constant value
    var d = (k*phi + 1) / e;

    return d;
}



function encrypt(data, publicKey)
{
    var n = BigInt(publicKey.n);
    var e = BigInt(publicKey.e);

    var enc = [];

    for (var i = 0; i < data.length; i++)
        enc.push(Number(bigPow(BigInt(data[i]), e) % n));

    return enc;
}



function decrypt(data, publicKey, privateKey)
{
    var n   = BigInt(publicKey.n);
    var prv = BigInt(privateKey);

    var dec = [];

    for (var i = 0; i < data.length; i++)
        dec.push(Number(bigPow(BigInt(data[i]), prv) % n));

    return dec;
}
const cryptoModulusSize     = 2048; // 1024, 2048
const millerRabinIterations = 56;   // 40,   56

const cryptoBlockSize  = cryptoModulusSize/8;
const cryptoBufferSize = cryptoBlockSize/2;



class PublicKey
{
    e = 0n; // public exponent
    n = 0n; // modulus

    constructor(e, n)
    {
        this.e = e;
        this.n = n;
    }
}



class PrivateKey
{
    e = 0n; // public exponent
    d = 0n; // private exponent
    n = 0n; // modulus
    p = 0n; // starting prime p
    q = 0n; // starting prime q

    constructor(e)
    {
        this.e = e;
        
        // set p,q so that gcd(e, p-1) = gcd(e, q-1) = 1
        
        this.p = randomLargePrime(this.e);
        
        do { this.q = randomLargePrime(this.e); } 
        while (this.q == this.p);
        
        this.n = this.p * this.q;
        
        var phi = (this.p-1n) * (this.q-1n);
        
        var k = 2n; // a constant value
        
        this.d = (k*phi + 1n) / this.e;
    }    
}    



function randomLargePrime(e)
{
    var buffer = new Uint8Array(cryptoBufferSize);

    for (var i = 0; i < cryptoBufferSize; i++)
        buffer[i] = Math.random() * 0x100;

    buffer[0] |= 0xC0; // set the top two bits to 1 to ensure a relatively large number

    
    var num = bigFromBuffer(buffer, cryptoBufferSize);
    
    num = bigNextPrime(num);

    while (num % e != 1n)
        num = bigNextPrime(num);


    return num;
}



function createPublicPrivateKeys()
{
    // pick a global e // 3, 17, 65537

    var prv = new PrivateKey(3n);
    var pub = new PublicKey(prv.e, prv.n);
    
    return {
        public:  pub,
        private: prv };
    

    // two random primes    

    // var p = bigNthPrime(100 + floatToInt(100 * Math.random()));
    // var q = p;

    // while (q == p)
    //     q = bigNthPrime(100 + floatToInt(100 * Math.random()));


    // var n   = p*q;
    // var phi = (p-1n)*(q-1n);
    
    
    // var e = 2n; // must be an integer, not be factor of n, and 1 < e < Ф(n)
    
    // while (e < phi)
    // {
    //     if (gcd(e, phi) == 1) break;    
    //     else                  e++;
    // }        

    
    // return {
    //      public:  createPublicKey (e, n),     
    //      private: createPrivateKey(e, phi) };
}                        



// function createPublicKey(e, n)
// {
//     return {e:e, n:n};    
// }    



// function createPrivateKey(phi, e, n)
// {
//     var k = 2n; // a constant value
//     var d = (k*phi + 1n) / e;

//     return {d:d, n:n};
// }



function encrypt(data, publicKey)
{
    var enc = [];

    for (var i = 0; i < data.length; i++)
    {
        var x = BigInt(data[i]);
        var p = bigPow(x, publicKey.e);

        enc.push(Number(p % publicKey.n));
    }

    return enc;
}



function decrypt(data, privateKey)
{
    var dec = [];

    for (var i = 0; i < data.length; i++)
    {
        var x = BigInt(data[i]);
        var p = bigPow(x, privateKey.d);
        
        dec.push(Number(p % privateKey.n));
    }

    return dec;
}
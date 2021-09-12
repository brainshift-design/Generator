const cryptoModulusSize     = 1024;
const millerRabinIterations = 40;

const cryptoBufferSize      = cryptoModulusSize/8;
const cryptoPrimeBufferSize = cryptoBufferSize/2;
     
const cryptoBuffer          = new Uint8Array(cryptoPrimeBufferSize);


function bigCryptoRandom()
{
    for (var i = 0; i < cryptoPrimeBufferSize; i++)
        cryptoBuffer[i] = toInt(Math.random() * 0x100);

    cryptoBuffer[0]                       |= 0xC0; // set the top bit to ensure a relatively large number
    cryptoBuffer[cryptoPrimeBufferSize-1] |= 0x01; // set low bit to ensure the number is odd

    return bigFromBuffer(cryptoBuffer);
}



function bigNextCryptoPrime(n) 
{
    while (!bigIsPrime(n))
        n += 2n;
    
    return n;
}



function bigCryptoPrime(e)
{
    var p;

    do
    {
        var rnd = bigCryptoRandom();
        p       = bigNextCryptoPrime(rnd);
    }
    while (gcd(p-1n, e) != 1n); // set p,q so that gcd(e, p-1) = gcd(e, q-1) = 1
        
    return p;
}



function createCryptoKeys()
{
    var e = 65537n; // 0x10001


    var p = bigCryptoPrime(e);
    
    var q;
    do { q = bigCryptoPrime(e); } 
    while (q == p);

    
    if (p < q)
        [p,q] = [q,p];

        
    var n   = p * q;
    var phi = (p-1n) * (q-1n);

    var d = bigModInvert(e, phi);


    return {
        public:  {e:e, n:n},
        private: {d:d, n:n, p:p, q:q} };
}                        



function encryptBlock(n, publicKey)
{
    return bigPowMod(
        n, 
        publicKey.e,
        publicKey.n);
}        



function decryptBlock(n, privateKey)
{
    return bigPowMod(
        n, 
        privateKey.d,
        privateKey.n);
}        



function encrypt(data, publicKey)
{
    var buffer = new Uint8Array(cryptoBufferSize);
    
    // prep array should be a multiple of cryptoBufferSize
    var prep   = new Uint8Array(Math.ceil((4+data.length) / cryptoBufferSize) * cryptoBufferSize); 
    var cipher = new Uint8Array(prep.length);


    uintToBuffer(data.length, prep, 4); // add uint data size to front of prep

    var start = prep.length - data.length;
    for (var i = 0; i < data.length; i++)
        prep[start+i] = data[i];


    var length = prep.length;
    var nBlock = 0;

    while (length > 0)
    {
        var blockStart = nBlock * cryptoBufferSize;
        var blockSize  = Math.min(length, cryptoBufferSize);
        
        var block = bigFromBufferAt(prep, blockStart, cryptoBufferSize);
        var enc   = encryptBlock(block, publicKey);
        bigToBufferAt(enc, cipher, blockStart, cryptoBufferSize);
        
        nBlock++;
        length -= blockSize;
    }
    
    
    return cipher;
}



function decrypt(cipher, privateKey)
{
    var prep   = new Uint8Array(cipher.length);
    var buffer = new Uint8Array(cryptoBufferSize);
    
    
    var length = cipher.length;
    var nBlock = 0;
    
    while (length > 0)
    {
        var blockStart = nBlock * cryptoBufferSize;
        var blockSize  = Math.min(length, cryptoBufferSize);

        var block = bigFromBufferAt(cipher, blockStart, cryptoBufferSize);
        var dec   = decryptBlock(block, privateKey);
        bigToBufferAt(dec, prep, blockStart, cryptoBufferSize); 

        nBlock++;
        length -= blockSize;
    }


    var size = uintFromBuffer(prep, 4); // first 4 bytes are the data size
    var data = new Uint8Array(size); 

    var start = prep.length - size;
    for (var i = 0; i < size; i++)
        data[i] = prep[start + i];


    return data;
}
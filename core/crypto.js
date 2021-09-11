const cryptoModulusSize     = 2048;
const millerRabinIterations = 40;

const cryptoByteSize        = cryptoModulusSize/8;
const cryptoPrimeBufferSize = cryptoByteSize/2;
     
const cryptoBuffer          = new Uint8Array(cryptoPrimeBufferSize);


function bigCryptoRandom()
{
    for (var i = 0; i < cryptoPrimeBufferSize; i++)
        cryptoBuffer[i] = toInt(Math.random() * 0x100);

    cryptoBuffer[0]                  |= 0xC0; // set the top bit to ensure a relatively large number
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


    // var p = 54121n, q = 53617n;

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



function getCryptoBlock(bytes, buffer, nBlock, blockSize)
{
    // blocks smaller than cryptoBlockSize 
    // must be front-padded with zeros

    var emptySize = cryptoByteSize - blockSize;

    for (var i = 0;         i < emptySize;      i++) buffer[i] = 0;
    for (var i = emptySize; i < cryptoByteSize; i++) buffer[i] = bytes[nBlock * cryptoByteSize + i - emptySize];

    return bigFromBufferAt(buffer, 0, cryptoByteSize);
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
    //add data size as first uint before encrypting

    var cipher = new Uint8Array(cryptoByteSize); // encoded data may be larger than plain data
    var buffer = new Uint8Array(cryptoByteSize);

    var length = data.length;
    var nBlock = 0;

    while (length > 0)
    {
        var blockSize = Math.min(length, cryptoByteSize);

        var block = getCryptoBlock(data, buffer, nBlock, blockSize);
        var enc   = encryptBlock(block, publicKey);

        bigToBuffer(enc, cipher, cryptoByteSize);

        nBlock++;
        length -= blockSize;
    }

    return cipher;
}



function decrypt(cipher, privateKey)
{
    var data   = new Uint8Array(cipher.length);
    var buffer = new Uint8Array(cryptoByteSize);

    var length = cipher.length;
    var nBlock  = 0;

    while (length > 0)
    {
        var blockSize = Math.min(length, cryptoByteSize);

        var block = getCryptoBlock(cipher, buffer, nBlock, blockSize);
        var dec   = decryptBlock(block, privateKey);

        bigToBuffer(dec, data, cryptoByteSize); 

        nBlock++;
        length -= blockSize;
    }

    return data;
}
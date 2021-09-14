const cryptoModulusSize     = 64;
const millerRabinIterations = 40;

const cryptoBufferSize      = cryptoModulusSize/8;
const cryptoPrimeBufferSize = cryptoBufferSize /2;
     
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
    // set p so that gcd(e, p-1) = 1
    
    var p;

    do
    {
        var rnd = bigCryptoRandom();
        p       = bigNextCryptoPrime(rnd);
    }
    while (gcd(p-1n, e) != 1n); 
        
    return p;
}



function createCryptoKeys()
{
    var e = 65537n; // 0x10001


    // var p = bigCryptoPrime(e);
    
    // var q;
    // do { q = bigCryptoPrime(e); } 
    // while (q == p);

    
    // if (p < q)
    //     [p,q] = [q,p];

    
    // console.log('p: ' + p);
    // console.log('q: ' + q);


    var p = 4131437551n,
        q = 3567532051n;
    

    var n   = p * q;
    var phi = (p-1n) * (q-1n);

    var d = bigModInvert(e, phi);


    return {
        public:  {n:n, e:e },
        private: {n:n, d:d, p:p, q:q} };
}                        



function encryptBlock(n, key, sign  ) { return bigPowMod(n, (sign   ? key.d : key.e), key.n); }        
function decryptBlock(n, key, verify) { return bigPowMod(n, (verify ? key.e : key.d), key.n); }        



function encrypt(data, key) { return encryptData(data, key, false); }
function decrypt(data, key) { return decryptData(data, key, false); }

function sign   (data, key) { return encryptData(data, key, true); } // yes I know real sign/verify uses a hash,
function verify (data, key) { return decryptData(data, key, true); } // but I prefer it this way for what I need



function encryptData(data, key, sign)
{
    // prep array should be a multiple of cryptoBufferSize
    var prep   = new Uint8Array(Math.ceil((data.length) / cryptoBufferSize) * cryptoBufferSize); 
    var cipher = new Uint8Array(prep.length);


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
        var enc   = encryptBlock(block, key, sign);
        bigToBufferAt(enc, cipher, blockStart, cryptoBufferSize);
        
        nBlock++;
        length -= blockSize;
    }
    
    
    return cipher;
}



function decryptData(cipher, key, verify)
{
    var data = new Uint8Array(cipher.length);
    
    
    var length = cipher.length;
    var nBlock = 0;
    
    while (length > 0)
    {
        var blockStart = nBlock * cryptoBufferSize;
        var blockSize  = Math.min(length, cryptoBufferSize);

        var block = bigFromBufferAt(cipher, blockStart, cryptoBufferSize);
        var dec   = decryptBlock(block, key, verify);
        bigToBufferAt(dec, data, blockStart, cryptoBufferSize); 

        nBlock++;
        length -= blockSize;
    }    


    return data;    
}
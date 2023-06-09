const cryptoModulusSize     = 64; // to keep the keys short
const millerRabinIterations = 40;

const cryptoBufferSize      = cryptoModulusSize/8;
const cryptoPrimeBufferSize = cryptoBufferSize /2;
     
const cryptoBuffer          = new Uint8Array(cryptoPrimeBufferSize);


function bigCryptoRandom()
{
    for (let i = 0; i < cryptoPrimeBufferSize; i++)
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
    
    let p;

    do
    {
        const rnd = bigCryptoRandom();
        p         = bigNextCryptoPrime(rnd);
    }
    while (gcd(p-1n, e) != 1n); 
        
    return p;
}



function createCryptoPrimePair(e)
{
    let p = bigCryptoPrime(e);
    
    let q;
    do { q = bigCryptoPrime(e); } 
    while (q == p);

    if (p < q)
        [p,q] = [q,p];

    return [p, q];
}



function createCryptoKeys(e = 65537n) 
{
    const  p   = 4177474087n,
           q   = 3438374081n; // for a 64-bit modulus
    
    const  n   = p * q;
    const _phi = (p-1n) * (q-1n);

    const  d   = bigModInvert(e, _phi);

    return {
        public:  {n:n, e:e },
        private: {n:n, d:d, p:p, q:q} };
}                        



function encryptDataBlock(n, key, sign  ) { return bigPowMod(n, (sign   ? key.d : key.e), key.n); }        
function decryptDataBlock(n, key, verify) { return bigPowMod(n, (verify ? key.e : key.d), key.n); }        



function encrypt(data, key) { return encryptData(data, key, false); }
function decrypt(data, key) { return decryptData(data, key, false); }

function sign   (data, key) { return encryptData(data, key, true); } // yes I know real sign/verify uses a hash,
function verify (data, key) { return decryptData(data, key, true); } // but I prefer it this way for what I need



function encryptData(data, key, sign)
{
    console.log('data =', data);
    console.log('key =',  key );
    console.log('sign =', sign);

    // prep array should be a multiple of cryptoBufferSize
    const prep   = new Uint8Array(Math.ceil((data.length) / cryptoBufferSize) * cryptoBufferSize); 
    const cipher = new Uint8Array(prep.length);


    const start = prep.length - data.length;
    for (let i = 0; i < data.length; i++)
        prep[start+i] = data[i];


    let length = prep.length;
    let nBlock = 0;

    while (length > 0)
    {
        const blockStart = nBlock * cryptoBufferSize;
        const blockSize  = Math.min(length, cryptoBufferSize);
        
        const block = bigFromBufferAt(prep, blockStart, cryptoBufferSize);
        const enc   = encryptDataBlock(block, key, sign);
        
        bigToBufferAt(enc, cipher, blockStart, cryptoBufferSize);
        
        nBlock++;
        length -= blockSize;
    }
    
    
    return cipher;
}



function decryptData(cipher, key, verify)
{
    const data = new Uint8Array(cipher.length);
    
    
    let length = cipher.length;
    let nBlock = 0;
    
    while (length > 0)
    {
        var blockStart = nBlock * cryptoBufferSize;
        var blockSize  = Math.min(length, cryptoBufferSize);

        var block = bigFromBufferAt(cipher, blockStart, cryptoBufferSize);
        var dec   = decryptDataBlock(block, key, verify);
        bigToBufferAt(dec, data, blockStart, cryptoBufferSize); 

        nBlock++;
        length -= blockSize;
    }    


    return data;    
}
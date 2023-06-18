const cryptoModulusSize     = 2048; // to keep the keys short
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
    // for a 64-bit modulus
    // const p   = 4177474087n,
    // const q   = 3438374081n;
    
    // for a 2048-bit modulus
    const p = 175174222516298387167194272697585437036810021236416760552899966284752011252198594013507417602600201436392264584002280023410776413073587129726141185393623449028440388452751264699475754683756720892485898644561628374159554994706803903659838117562670498436083060507993966358733361521299548446230454315603662036469n;
    const q = 137903165485589693700981982313430857945541993940503493680067557312840527561097051166704349879274851836049344355243285831485925505832584105624064061259858226754867264793670708366732221684041373398786004227019387898423254675498301526584324375120659877872268262270523914099357199684086439264688977237417227910807n;
    
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